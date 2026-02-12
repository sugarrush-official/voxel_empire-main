
const http = require('http');

const data = JSON.stringify({
    wallet: '0x9999999999999999999999999999999999999999',
    points: 999,
    potion: 'strawberry'
});

const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/join',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    let responseBody = '';
    res.on('data', (chunk) => responseBody += chunk);
    res.on('end', () => {
        console.log('STATUS:', res.statusCode);
        console.log('BODY:', responseBody);
    });
});

req.on('error', (e) => console.error('ERROR:', e.message));
req.write(data);
req.end();
