import http from 'k6/http';
import { check, group } from 'k6';

const BASE_URL = 'https://test-api.k6.io/auth/token/login/';

export const options = {
    stages: [
        { duration: '10s', target: 2 },
        { duration: '30s', target: 10 },
        { duration: '10s', target: 0 },
      ],
    thresholds: {
        http_req_duration: ['p(95)<5000'],
        http_req_failed: ['rate<0.02'],
    }
};

export default function() {
    group('Login users', function() {
        const credentials = {
            username: "Teste2541e",
            password: "123",
        };

        const params = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const login = http.post(
            BASE_URL,
            JSON.stringify({
                username: credentials.username,
                password: credentials.password
            }),
            params
        );

        check(login, {
            'StatusCode is 200': (value) => value.status === 200,
        });
    });
};