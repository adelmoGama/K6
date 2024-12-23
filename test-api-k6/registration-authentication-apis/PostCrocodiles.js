import http from 'k6/http';
import { check, group } from 'k6';

const BASE_URL = 'https://test-api.k6.io/user/register/';
const CROCODILE_ID = '2';

export const options = {
    vus: 1,
    duration: '5s',
    thresholds: {
        http_req_failed: ['rate<0.05'],
    }
};

export default function() {
    group('Register new user', function() {
        const newUser = {
            username: "Teste"+Date.now(),
            password: "123",
        };

console.log(JSON.stringify(newUser));

        // const createNewUser = http.post(
        //     'https://test-api.k6.io/user/register/',
        //     JSON.stringify(newUser),
        //     {
        //         headers: {
        //             'Content-Type': 'Application/json',
        //         }
        //     }
        // );

        // check(createNewUser, {
        //     'StatusCode is 201': (value) => value.status === 200,
        // });
    });

    // group('Login user', function() {
    // });
};