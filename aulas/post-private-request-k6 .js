import http from 'k6/http';
import { check } from 'k6';

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

    const newCrocodile = {
        name: "Crocodile New 4527",
        sex: "M",
        date_of_birth: "1750-03-14",
    };

    const createNewCroc = http.post(
        'https://test-api.k6.io/my/crocodiles/',
        JSON.stringify(newCrocodile),
        {
            headers: {
                Authorization: 'Bearer ' + tokenAccess,
                'Content-Type': 'application/json',
            }
        }
    );

    const newCrocodileId = createNewCroc.json().id;

    const findByIdNewCroc = http.get(
        `https://test-api.k6.io/my/crocodiles/${newCrocodileId}`,
        {
            headers: {
                Authorization: 'Bearer ' + tokenAccess,
                'Content-Type': 'application/json',
            }
        }
    );

    check(findByIdNewCroc, {
        'Status is 200': (value) => value.status === 200,
        'Name is Crocodile New 4527': (value) => value.json().name === 'Crocodile New 4527',
    });
};