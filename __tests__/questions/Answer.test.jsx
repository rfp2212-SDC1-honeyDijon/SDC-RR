import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Answer from '../../client/src/components/Questions/Answer.jsx';
import exampleAnswers from '../example_data/questions/answers';
import fetcherMock from '../../client/src/fetchers';

jest.mock('../../client/src/fetchers');
beforeEach(jest.clearAllMocks);

// const proxyAnswer = exampleQuestions[40356].results[0].answers[3073949];
const proxyAnswer = exampleAnswers[329059].results[1];

test('renders properly', () => {
  render(<Answer answer={proxyAnswer} />);
  expect(screen.getByText(/by /i)).toBeInTheDocument();
});

test('clicking Yes sends helpfulAnswer PUT request', async () => {
  fetcherMock.markHelpfulAnswer.mockResolvedValue();
  render(<Answer answer={proxyAnswer} />);

  await userEvent.click(screen.getByText(/yes/i));

  expect(fetcherMock.markHelpfulAnswer).toHaveBeenCalledTimes(1);
});

test('clicking Yes replaces its text with Marked!', async () => {
  fetcherMock.markHelpfulAnswer.mockResolvedValue();
  render(<Answer answer={proxyAnswer} />);

  await userEvent.click(screen.getByText(/yes/i));

  expect(screen.getByText(/marked!/i)).toBeInTheDocument();
  expect(screen.queryByText(/yes/i)).not.toBeInTheDocument();
});

test('clicking Marked! has no effect', async () => {
  fetcherMock.markHelpfulAnswer.mockResolvedValue();
  render(<Answer answer={proxyAnswer} />);

  await userEvent.click(screen.getByText(/yes/i));
  await userEvent.click(screen.getByText(/marked!/i));

  expect(fetcherMock.markHelpfulAnswer).toHaveBeenCalledTimes(1);
});

test('clicking Report replaces its text with Reported', async () => {
  fetcherMock.reportAnswer.mockResolvedValue();
  render(<Answer answer={proxyAnswer} />);

  await userEvent.click(screen.getByText(/report/i));

  expect(screen.getByText(/reported/i)).toBeInTheDocument();
  expect(screen.queryByText(/report$/i)).not.toBeInTheDocument();
});

test('clicking Reported has no effect', async () => {
  fetcherMock.reportAnswer.mockResolvedValue();
  render(<Answer answer={proxyAnswer} />);

  await userEvent.click(screen.getByText(/report/i));
  await userEvent.click(screen.getByText(/reported/i));

  expect(fetcherMock.reportAnswer).toHaveBeenCalledTimes(1);
});
