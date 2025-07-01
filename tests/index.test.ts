import { describe, it, expect, vi, beforeEach, afterAll, test } from "vitest";
import request  from 'supertest'
import app from '../src/app-setup.ts'



//! I need to allow the startup to be able to test out of the box.

test('Should load test.env', ()=>{
    expect(process.env.TEST_VAR).toBe('TESTING');
})


test('Should not fail for /signup', async() => {
    const result = await request(app).post('/api/signup').send({ username: 'Dwati', email: 'Dwati@email.com', password: '12345678' });
    
    expect(result.body).toEqual({message: 'Success', data: { username: 'Dwati', email: 'Dwati@email.com', password: '12345678' }});
});

test('Should not fail for /login', async() => {
    const result = await request(app).post('/api/signin').send({ email: 'Dwati@email.com', password: '12345678' });
    
    expect(result.body).toEqual({message: 'Success', data: { email: 'Dwati@email.com', password: '12345678' }});
});


test('Should fail for /signup', async() => {
    const result = await request(app).post('/api/signup').send({ username: 'abc', email: 'agugutata', password: '123' });
    
    expect(result.body.message[0]).toBe("Invalid email");
    expect(result.body.message[1]).toBe("Password must be at least 6 characters long");
});