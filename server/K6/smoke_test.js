import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export const options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '1m',
  thresholds: {
    http_req_duration: ['p(99)< 50'], // 99% of requests must complete below 50ms
  },
};

const BASE_URL = 'http://localhost:3000/api';

export default () => {
  const reviews = http.get(`${BASE_URL}/reviews/meta?product_id=40460`);
  check(reviews, {'get reviews status was 200': (res) => res.status === 200});
  sleep(1);
};
