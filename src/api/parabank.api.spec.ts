import { test, expect, request } from '@playwright/test';
import { generateUniqueUser } from '../utils/user.util';

test.describe('ParaBank API checks', () => {
  test('homepage is reachable (GET)', async ({ request: apiRequest }) => {
    const resp = await apiRequest.get('/');
    expect(resp.status()).toBe(200);
    const txt = await resp.text();
    expect(txt).toContain('ParaBank');
  });

  test('registration page is available (GET)', async ({ request: apiRequest }) => {
    const user = generateUniqueUser('api');
    let attempts = 0;
    let body = '';

    const res = await apiRequest.get('/parabank/register.htm');
    const text = await res.text();
    expect(res.ok(), 'register page ok').toBeTruthy();
    // page content should include the registration form and a hint
    expect(text).toMatch(/Signing up is easy|First Name|Username/);
  });
});
