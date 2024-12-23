import http from 'k6/http';
import { check, group } from 'k6';

export default function() {
    const credentials = {
        username: "AdelmoGama",
        password: "123"
    };

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    let res = http.post(
        'https://test-api.k6.io/auth/token/login/',
        JSON.stringify({
            username: credentials.username,
            password: credentials.password
        }),
        params
    );
    
    const token = res.json().access;
    
    console.log(token);

    group('Headers', function() {
        check(res, {
            'Status is 200': (value) => value.status === 200,
            'Content-Type': (value) => value.headers['Content-Type'] === 'application/json',
        });
    });
};