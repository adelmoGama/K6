import http from 'k6/http';
import { sleep } from 'k6';
import exec from 'k6/execution';
import { Counter, Trend } from 'k6/metrics';

export const options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(95)<500'],
        http_req_failed: ['rate<0.1'],
        http_reqs: ['count>20'],
        http_reqs: ['rate<8'],
        checks: ['rate>=0.98'],
        myCounter: ['count>10'],
        response_time_news_page: ['p(95)<150'],
    }
};

let myCounter = new Counter('myCounter');
let newsPageResponseTrend = new Trend('response_time_news_page');

export default function() {
    let res = http.get('https://test.k6.io' + (exec.scenario.iterationInTest === 1 ? '/fol' : ''));
    myCounter.add(1);
    sleep(1);

    res = http.get('https://test.k6.io/news.php');
    newsPageResponseTrend.add(res.timings.duration);
    sleep(1);
};