import http from 'k6/http';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        'http_req_duration{ status:200 }': ['p(95)<1000'],
        'http_req_duration{ status:201 }': ['p(95)<1000'],
    }
};

export default function() {
    http.get('https://run.mocky.io/v3/b7dc0283-aad3-4f08-93f1-452d0e44f973');
    http.get('https://run.mocky.io/v3/bb0ac4b6-6ee9-4c4d-a9f4-4ad6d10a147c?mocky-delay=2000ms');
};