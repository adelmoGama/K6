import http from 'k6/http';
import { check } from 'k6';

export default function() {
    const res1 = http.get('https://test.k6.io');
    check(res1, {
        'Status is 200': (value) => value.status === 200,
        'Is on the startpage': (value) => value.body.includes('Collection of simple web-pages suitable for load testing.', true)
    });
    
    const res2 = http.get('https://test.k6.io/contacts.php');
    check(res2, {
        'Is on the startpage': (value) => value.body.includes('Collection of simple web-pages suitable for load testing.', true)
    });
};