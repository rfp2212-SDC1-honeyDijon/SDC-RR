/* eslint-disable no-await-in-loop */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import QuestionsList from '../../client/src/components/Questions/QuestionsList.jsx';
import exampleQuestions from '../example_data/questions/questions';

const proxyQList = exampleQuestions[40356].results;

test('renders 2 questions with answers on load', () => {
  render(<QuestionsList questions={proxyQList} filterText="" />);
  const questions = screen.getAllByRole('button', { name: /q:/i });
  expect(questions.length).toBe(2);
});

test('renders 2 more questions on MORE button click', async () => {
  render(<QuestionsList questions={proxyQList} filterText="" />);
  const button = screen.getByRole('button', { name: /more answered questions/i });

  await userEvent.click(button);
  const questions = await screen.findAllByRole('button', { name: /q:/i });

  expect(questions.length).toBe(4);
});

test('hides MORE button when there are no more questions to load', async () => {
  render(<QuestionsList questions={proxyQList} filterText="" />);
  const button = screen.getByRole('button', { name: /more answered questions/i });
  const numClicks = Math.ceil(proxyQList.length / 2) - 1;

  for (let i = 0; i < numClicks; i += 1) {
    await userEvent.click(button);
  }

  expect(button).not.toBeInTheDocument();
});

test('MORE button should not appear if there are less than 2 questions to start', async () => {
  let proxyCopy = null;
  if (proxyQList.length > 1) {
    proxyCopy = proxyQList.slice(0, 1);
  }
  render(<QuestionsList questions={proxyCopy ?? proxyQList} filterText="" />);

  expect(screen.queryByRole('button', { name: /more answered questions/i })).not.toBeInTheDocument();
});

// TODO: this test should belong to Questions.test.jsx after I refactor
// Questions.jsx to act as a controller for questionslist
test('should only render questions with answers', async () => {
  const questionsWithAnswers = proxyQList
    .filter((question) => Object.keys(question.answers).length);
  render(<QuestionsList questions={questionsWithAnswers} filterText="" />);
  const button = screen.getByRole('button', { name: /more answered questions/i });
  const numClicks = Math.ceil(proxyQList.length / 2) - 1;

  for (let i = 0; i < numClicks; i += 1) {
    await userEvent.click(button);
  }
  const questions = await screen.findAllByRole('button', { name: /q:/i });
  const answers = await screen.findAllByRole('heading', { name: /a:/i });

  expect(button).not.toBeInTheDocument();
  expect(questions.length).toEqual(answers.length);
});

test('clicking add a question button renders a question modal', async () => {
  render(<div id="modal" />);
  render(<QuestionsList questions={proxyQList} filterText="" />);
  await userEvent.click(screen.getByText(/add a question \+/i));

  expect(screen.getByText(/ask your question/i)).toBeInTheDocument();
});

// there isn't a good way to test this, since we remove styling and the
// modal-bg thus has no dimensions and doesn't cover everything
// test('clicking outside the question modal closes it');
test('clicking cancel closes the question modal', async () => {
  render(<div id="modal" />);
  render(<QuestionsList questions={proxyQList} filterText="" />);

  await userEvent.click(screen.getByText(/add a question \+/i));
  await userEvent.click(screen.getByText(/cancel/i));

  expect(screen.queryByText(/ask your question/i)).not.toBeInTheDocument();
});

test('renders questions in order of helpfulness', async () => {
  render(<QuestionsList questions={proxyQList} filterText="" />);
  const button = screen.getByRole('button', { name: /more answered questions/i });
  const numClicks = Math.ceil(proxyQList.length / 2) - 1;
  for (let i = 0; i < numClicks; i += 1) {
    await userEvent.click(button);
  }
  const helpfulTexts = await screen.findAllByTestId('q-helpfulness');
  const helpfulIndices = helpfulTexts.map((element) => Number.parseInt(element.textContent, 10));
  const sorted = [...helpfulIndices].sort((a, b) => {
    if (a > b) return -1;
    if (a < b) return 1;
    return 0;
  });

  expect(helpfulIndices).toEqual(sorted);
});
