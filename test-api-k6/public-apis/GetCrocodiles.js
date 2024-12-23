import http from 'k6/http';
import { check, group } from 'k6';

const BASE_URL = 'https://test-api.k6.io/public/crocodiles/';
const CROCODILE_ID = '2';

export const options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        http_req_failed: ['rate<0.05'],
    }
};

export default function() {
    group('Find all crocodiles', function() {
        const findAllCrocodiles = http.get(
            BASE_URL,
        );
    
        check(findAllCrocodiles, {
            'StatusCode is 200': (value) => value.status === 200,
        });
    });

    group('Find crocodiles by ID', function() {
        const res = http.get(BASE_URL + CROCODILE_ID);
        
        check(res, {
        'Status is 200': (value) => value.status === 200,
        });
    });
};