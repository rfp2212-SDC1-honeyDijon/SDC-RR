/* eslint-disable no-await-in-loop */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Question from '../../client/src/components/Questions/Question.jsx';
import exampleQuestions from '../example_data/questions/questions';
import fetcherMock from '../../client/src/fetchers';

jest.mock('../../client/src/fetchers');
beforeEach(jest.clearAllMocks);

// proxyQuestion must have at least 4 answers
const proxyQuestion = exampleQuestions.q_329075;
const proxyUnanswered = exampleQuestions[40356].results[3];

test('renders properly', () => {
  render(<Question question={proxyQuestion} filterText="" />);
  expect(screen.getByText(/q:/i)).toBeInTheDocument();
});

test('clicking Yes sends helpfulQuestion PUT request', async () => {
  fetcherMock.markHelpfulQuestion.mockResolvedValue();
  render(<Question question={proxyUnanswered} filterText="" />);

  await userEvent.click(screen.getByText(/yes/i));

  expect(fetcherMock.markHelpfulQuestion).toHaveBeenCalledTimes(1);
});

test('clicking Yes replaces its text with Marked!', async () => {
  render(<Question question={proxyUnanswered} filterText="" />);

  await userEvent.click(screen.getByText(/yes/i));

  expect(screen.getByText(/marked!/i)).toBeInTheDocument();
  expect(screen.queryByText(/yes/i)).not.toBeInTheDocument();
});

test('clicking Marked! has no effect', async () => {
  fetcherMock.markHelpfulQuestion.mockResolvedValue();
  render(<Question question={proxyUnanswered} filterText="" />);

  await userEvent.click(screen.getByText(/yes/i));
  await userEvent.click(screen.getByText(/marked!/i));

  expect(fetcherMock.markHelpfulQuestion).toHaveBeenCalledTimes(1);
});

test('clicking LOAD MORE ANSWERS renders 2 more answers if available', async () => {
  render(<Question question={proxyQuestion} filterText="" />);

  await userEvent.click(screen.getByText(/load more answers/i));

  const answers = screen.getAllByText(/by /i);
  expect(answers.length).toBe(4);
});

test('clicking LOAD MORE ANSWERS renders 1 more answer if less than 4 answers exist', async () => {
  let proxyCopy = null;
  if (Object.keys(proxyQuestion.answers).length >= 4) {
    proxyCopy = { ...proxyQuestion };
    proxyCopy.answers = Object.fromEntries(Object.entries(proxyQuestion.answers).slice(0, 3));
  }
  render(<Question question={proxyCopy ?? proxyQuestion} filterText="" />);

  await userEvent.click(screen.getByText(/load more answers/i));

  const answers = screen.getAllByText(/by /i);
  expect(answers.length).toBe(3);
});

test('clicking add answer button-link will render an answer modal', async () => {
  render(<div id="modal" />);
  render(<Question question={proxyQuestion} filterText="" />);

  await userEvent.click(screen.getByText(/add answer/i));

  expect(screen.getByText(/submit your answer/i)).toBeInTheDocument();
});

// there isn't a good way to test this, since we remove styling and the
// modal-bg thus has no dimensions and doesn't cover everything
// test('clicking outside the answer modal closes it');

test('clicking cancel closes the answer modal', async () => {
  render(<div id="modal" />);
  render(<Question question={proxyQuestion} filterText="" />);

  await userEvent.click(screen.getByText(/add answer/i));
  await userEvent.click(screen.getByText(/cancel/i));

  expect(screen.queryByText(/submit your answer/i)).not.toBeInTheDocument();
});

test('renders answers in order of helpfulness', async () => {
  render(<Question question={proxyQuestion} filterText="" />);
  const numAnswers = Object.keys(proxyQuestion.answers).length;
  const numClicks = Math.ceil(numAnswers / 2) - 1;
  for (let i = 0; i < numClicks; i += 1) {
    await userEvent.click(screen.getByText(/load more answers/i));
  }
  const helpfulTexts = await screen.findAllByTestId('a-helpfulness');
  const helpfulIndices = helpfulTexts.map((element) => Number.parseInt(element.textContent, 10));
  const sorted = [...helpfulIndices].sort((a, b) => {
    if (a > b) return -1;
    if (a < b) return 1;
    return 0;
  });

  expect(helpfulIndices).toEqual(sorted);
});
