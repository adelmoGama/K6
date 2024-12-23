import http from 'k6/http';

export default function() {
    const credentials = {
        username: "AdelmoGama",
        password: "123"
    };

    const params = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    let getToken = http.post(
        'https://test-api.k6.io/auth/token/login/',
        JSON.stringify({
            username: credentials.username,
            password: credentials.password
        }),
        params
    );
    
    const tokenAccess = getToken.json().access;

    const res = http.get('https://test-api.k6.io/my/crocodiles/',
    {
        headers: {
            Authorization: 'Bearer ' + tokenAccess
        }
    });
};