import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(95)<500'],
        http_req_failed: ['rate<0.01'],
        http_reqs: ['count>20'],
        http_reqs: ['rate<8'],
    }
};

export default function() {
    const res1 = http.get('https://test.k6.io');
    check(res1, {
        'Status is 200': (value) => value.status === 200,
        'Is on the startpage': (value) => value.body.includes('Collection of simple web-pages suitable for load testing.', true)
    });

    sleep(2);
    
    const res2 = http.get('https://test.k6.io/contacts.php');
    check(res2, {
        'Status is 200': (value) => value.status === 200,
        'Is on the startpage': (value) => value.body.includes('Collection of simple web-pages suitable for load testing.', true)
    });
};