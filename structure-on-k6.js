import http from 'k6/http';
import { check, group } from 'k6';

export const options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        'http_req_duration{expected_response:true}': ['p(95)<500'],
        http_req_failed: ['rate<0.01'],
        http_reqs: ['count>20'],
        http_reqs: ['rate<8'],
        'group_duration{group:::Main Page}': ['p(95)<500'],
        'group_duration{group:::Main Page::Assets}': ['p(95)<500'],
    }
};

export default function() {
    group('Main Page', function() {
        const res = http.get('https://test.k6.io');
        check(res, {
        'Status is 200': (value) => value.status === 200,
        'Is on the startpage': (value) => value.body.includes('Collection of simple web-pages suitable for load testing.', true)
        });

        group('Assets', function() {
            http.get('https://test.k6.io/static/css/site.css');
            http.get('https://test.k6.io/static/js/prisms.js');
        });
    });

    group('Contacts Page', function() {
        const res = http.get('https://test.k6.io/contacts.php');
        check(res, {
        'Status is 200': (value) => value.status === 200,
        'Is on the startpage': (value) => value.body.includes('Collection of simple web-pages suitable for load testing.', true)
        });
    });

    group('News Page', function() {
        const res = http.get('https://test.k6.io/news.php');
        check(res, {
        'Status is 200': (value) => value.status === 200,
        });
    });
};