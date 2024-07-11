import { test, expect } from '@playwright/test';

const BASE_URL = 'https://api.demoblaze.com';

test.describe('API Tests', () => {

    test('Sign Up New User', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/signup`, {
      data: {
        username: 'JuanFrancisCisnerosG',
        password: '123456',
      },
    });
    expect(response.status()).toBe(200);
    await response.json().then((json) => {
      //blank response
      expect(json).toEqual("");
    });
    
  });


  test('Sign Up User Exists', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/signup`, {
      data: {
        username: 'Juan',
        password: '123456',
      },
    });
    expect(response.status()).toBe(200);
    await response.json().then((json) => {
      expect(json).toEqual({ "errorMessage": 'This user already exist.' });
    });
    
  });


  test('Login', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/login`, {
      data: {
        username: 'JuanFraCisneros',
        password: '123456',
      },
    });
    expect(response.status()).toBe(200);
    const response_body = await response.json();
    const tokenPrefix = "Auth_token: ";
    expect(response_body.startsWith(tokenPrefix)).toBeTruthy();
    
  });

    test('Bad Login', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/login`, {
      data: {
        username: 'JuanFraCisneros',
        password: '1234567',
      },
    });
    expect(response.status()).toBe(200);
    await response.json().then((json) => {
      expect(json).toEqual({ "errorMessage": 'Wrong password.' });
    });
  
  });
});