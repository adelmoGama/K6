import http from 'k6/http';
import { check, sleep } from 'k6';
import exec from 'k6/execution';

export const options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(95)<500'],
        http_req_failed: ['rate<0.1'],
        http_reqs: ['count>20'],
        http_reqs: ['rate<8'],
        checks: ['rate>=0.98'],
    }
};

export default function() {
    const res1 = http.get('https://test.k6.io' + (exec.scenario.iterationInTest === 1 ? '/fol' : ''));
    check(res1, {
        'Status is 200': (value) => value.status === 200,
        'Is on the startpage': (value) => value.body.includes('Collection of simple web-pages suitable for load testing.', true)
    });
    sleep(2);
};