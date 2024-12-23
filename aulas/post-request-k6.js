import http from 'k6/http';
import { check, group } from 'k6';

export default function() {
    const body = JSON.stringify({
        username: "Teste-" + Date.now(),
        password: "123"
    });

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    let res = http.post('https://test-api.k6.io/user/register/', body, params);
    
    const response = res.json();
    console.log(response);

    group('Headers', function() {
        check(res, {
            'Status is 201': (value) => value.status === 201,
            'Content-Type': (value) => value.headers['Content-Type'] === 'application/json',
        });
    });
};