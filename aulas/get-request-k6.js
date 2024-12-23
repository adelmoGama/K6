import http from 'k6/http';
import { check, group } from 'k6';

export default function() {
    let res = http.get('https://test-api.k6.io/public/crocodiles/');
    
    const crocodile = res.json();
    const crocodileId = crocodile[0].id;
    const crocodileName = crocodile[0].name;

    group('Headers', function() {
        check(res, {
            'Status is 200': (value) => value.status === 200,
            'Content-Type': (value) => value.headers['Content-Type'] === 'application/json',
        });
    });

    group('Data', function() {
        res = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileId}/`);
        check(res, {
            'Status is 200': (value) => value.status ===200,
            'Crocodile name': (value) => value.json().name === crocodileName,
        });
    });
};