import http from 'k6/http';
import { sleep, check } from 'k6';
import type { Options } from 'k6/options';

export const options: Options = {
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<400'] // 95% of requests should be below 400ms
    },
    stages: [
        {
            duration: '10s',
            target: 20
        },
        {
            duration: '10s',
            target: 40
        },
        {
            duration: '10s',
            target: 80
        },
        {
            duration: '10s',
            target: 160
        }
    ]
};

export default function () {
    const res = http.get(__ENV.URL);
    check(res, {
        'is status 200': (r) => r.status === 200
    });
    sleep(1);
}
