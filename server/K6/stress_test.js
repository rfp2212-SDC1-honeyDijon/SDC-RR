import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  stages: [
    { duration: '1m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 1 minute.
    { duration: '2m', target: 100 }, // stay at 100 users for 2 minutes
    { duration: '1m', target: 300 }, // ramp-up to 300 users
    { duration: '2m', target: 300 }, // stay at 300 users over 2 minutes
    { duration: '1m', target: 500 },
    { duration: '2m', target: 500 },
    { duration: '1m', target: 700 },
    { duration: '1m', target: 700 },
    { duration: '1m', target: 1000 },
    { duration: '1m', target: 1000 },
    { duration: '3m', target: 0 },// ramp-down to 0 users
  ],
  thresholds: {
    'http_req_duration': ['p(99)< 1000'], // 99% of requests must complete below 1000ms
    'http_req_failed': [{ threshold: 'rate <= 0.01'}]
  },
};

const BASE_URL = 'http://localhost:3000/api';

export default () => {
  let id = Math.floor(Math.random() * 5774952) + 1;
  http.batch([
    ['GET', `${BASE_URL}/reviews?product_id=${id}`],
    ['GET', `${BASE_URL}/reviews/meta?product_id=${id}`]
  ]);
  // http.get(`${BASE_URL}/reviews?product_id=${id}`)
  // http.get(`${BASE_URL}/reviews/meta?product_id=${id}`)
  sleep(1);
};
export function handleSummary(data) {
  return {
    "redis_twoRequests_1000users.html": htmlReport(data)
  }
}