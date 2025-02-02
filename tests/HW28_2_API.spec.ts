import { USERS } from "../test-data/states/creds/users";
import { test, expect, Locator } from '@playwright/test';

test.describe('API with auth in beforeAll', () => {
let sidValueGlobal;
    test.beforeAll(async ({ request }) => {
        const response = await request.post('/api/auth/signin', {
            data: {
                email: USERS.email,
                password: USERS.password
            }
        });

        const sidCookie = await response.headers () ['set-cookie'];
        const sidValue = sidCookie.split(';')[0].split('=')[1];
        sidValueGlobal= sidValue;
        console.log(sidValue);
        
        expect(response.status()).toBe(200);
    });

    test('Successful adding BMW X5 to user', async ({ request }) => {
        const response = await request.post('/api/cars', {
            data: {
                carBrandId: 2,
                carModelId: 8,
                mileage: 122
            },
            headers: {
                'Cookie': `sid=${sidValueGlobal}`
            }
        });

        expect(response.status()).toBe(201);

        const body = await response.json();
        console.log(body);
    
});
test('Negative, add car with - 100 mileage ( 400 error)', async ({ request }) => {
    const response = await request.post('/api/cars', {
        data: {
            carBrandId: 2,
            carModelId: 8,
            mileage: -100,
        },
        headers: {
            'Cookie': `sid=${sidValueGlobal}`
        }
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    console.log(body);


});
test('Negative, Add a non-existing car model (404 error)', async ({ request }) => {
    const response = await request.post('/api/cars', {
        data: {
            carBrandId: 2,
            carModelId: 98,
            mileage: 100,
        },
        headers: {
            'Cookie': `sid=${sidValueGlobal}`
        }
    });

    expect(response.status()).toBe(404);

    const body = await response.json();
    console.log(body);


});
});