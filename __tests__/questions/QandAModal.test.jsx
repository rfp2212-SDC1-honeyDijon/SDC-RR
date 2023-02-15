import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import QandAModal from '../../client/src/components/Questions/QandAModal.jsx';
import fetcherMock from '../../client/src/fetchers';
import exampleProducts from '../example_data/products/product';
import exampleQuestions from '../example_data/questions/questions';

jest.mock('../../client/src/fetchers');
jest.spyOn(window, 'alert').mockImplementation(() => {});
beforeEach(jest.clearAllMocks);

test('renders Q modal', () => {
  const proxyProductName = exampleProducts[40356].name;
  render(<div id="modal" />);
  render(<QandAModal productName={proxyProductName} type="question" show />);
  const subtitleRegex = new RegExp(`about the ${proxyProductName} here`, 'i');

  expect(screen.getByText(/ask your question/i)).toBeInTheDocument();
  expect(screen.getByText(subtitleRegex)).toBeInTheDocument();
});

test('text renders when user types', async () => {
  render(<div id="modal" />);
  render(<QandAModal type="question" show />);

  await userEvent.type(screen.getByRole('textbox', { name: /question/i }), 'Why, Jack?');
  await userEvent.type(screen.getByRole('textbox', { name: /nickname/i }), 'rosemary22');
  await userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'rose@mary.com');

  expect(screen.getByRole('textbox', { name: /question/i })).toHaveValue('Why, Jack?');
  expect(screen.getByRole('textbox', { name: /nickname/i })).toHaveValue('rosemary22');
  expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue('rose@mary.com');
});

test('posts question on submit', async () => {
  fetcherMock.postQuestion.mockResolvedValueOnce();
  render(<div id="modal" />);
  render(<QandAModal type="question" product_id={12345} setShowModal={jest.fn()} show />);

  await userEvent.type(screen.getByRole('textbox', { name: /question/i }), 'Why, Jack?');
  await userEvent.type(screen.getByRole('textbox', { name: /nickname/i }), 'rosemary22');
  await userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'rose@mary.com');
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(fetcherMock.postQuestion).toHaveBeenCalledTimes(1);
});

test('doesn\'t post on submit when body isn\'t filled', async () => {
  fetcherMock.postQuestion.mockResolvedValue();
  render(<div id="modal" />);
  render(<QandAModal type="question" setShowModal={jest.fn()} show />);

  await userEvent.type(screen.getByRole('textbox', { name: /nickname/i }), 'rosemary22');
  await userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'rose@mary.com');
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(fetcherMock.postQuestion).not.toHaveBeenCalled();
});

test('doesn\'t post on submit when name isn\'t filled', async () => {
  fetcherMock.postQuestion.mockResolvedValue();
  render(<div id="modal" />);
  render(<QandAModal type="question" setShowModal={jest.fn()} show />);

  await userEvent.type(screen.getByRole('textbox', { name: /question/i }), 'Why, Jack?');
  await userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'rose@mary.com');
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(fetcherMock.postQuestion).not.toHaveBeenCalled();
});

test('doesn\'t post on submit when email isn\'t filled', async () => {
  fetcherMock.postQuestion.mockResolvedValue();
  render(<div id="modal" />);
  render(<QandAModal type="question" setShowModal={jest.fn()} show />);

  await userEvent.type(screen.getByRole('textbox', { name: /question/i }), 'Why, Jack?');
  await userEvent.type(screen.getByRole('textbox', { name: /nickname/i }), 'rosemary22');
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(fetcherMock.postQuestion).not.toHaveBeenCalled();
});

test('renders A modal', () => {
  const proxyProductName = exampleProducts[40356].name;
  const proxyQuestionBody = exampleQuestions[40356].results[0].question_body;
  render(<div id="modal" />);
  render(<QandAModal
    productName={proxyProductName}
    questionBody={proxyQuestionBody}
    type="answer"
    show
  />);
  const subtitleRegex = new RegExp(`${proxyProductName}: ${proxyQuestionBody}`, 'i');

  expect(screen.getByText(/submit your answer/i)).toBeInTheDocument();
  expect(screen.getByText(subtitleRegex)).toBeInTheDocument();
});

test('text renders when user types', async () => {
  render(<div id="modal" />);
  render(<QandAModal type="answer" show />);

  await userEvent.type(screen.getByRole('textbox', { name: /answer/i }), 'IDK');
  await userEvent.type(screen.getByRole('textbox', { name: /nickname/i }), 'jackson11!');
  await userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'json@eleven.com');

  expect(screen.getByRole('textbox', { name: /answer/i })).toHaveValue('IDK');
  expect(screen.getByRole('textbox', { name: /nickname/i })).toHaveValue('jackson11!');
  expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue('json@eleven.com');
});

test('posts answer on submit', async () => {
  fetcherMock.postAnswer.mockResolvedValueOnce();
  render(<div id="modal" />);
  render(<QandAModal type="answer" question_id={123456} setShowModal={jest.fn()} show />);

  await userEvent.type(screen.getByRole('textbox', { name: /answer/i }), 'IDK');
  await userEvent.type(screen.getByRole('textbox', { name: /nickname/i }), 'jackson11!');
  await userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'json@eleven.com');
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(fetcherMock.postAnswer).toHaveBeenCalledTimes(1);
});
