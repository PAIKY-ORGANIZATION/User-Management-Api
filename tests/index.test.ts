import { expect, test, beforeAll } from "vitest";
import request  from 'supertest'
import app from '../src/express-app/app-setup'
import { prisma } from "../src/express-app/lib/db";



beforeAll(async () => {
    await  prisma.user.deleteMany({})

});




test('Should load test.env', ()=>{
    expect(process.env.TEST_VAR).toBe('TESTING');
})


//prettier-ignore
test('Should not fail for /signup', async() => {
    const result = await request(app).post('/api/signup').send({ username: 'Dwati', email: 'Dwati@email.com', password: '12345678' });
    //
    expect(result.body).toEqual({
        message: 'Success',
        data: {id: expect.any(String) , username: 'Dwati', email: 'Dwati@email.com', password: expect.any(String)}
    });
});

//prettier-ignore
test('Should not fail for /login', async() => {
    const result = await request(app).post('/api/login').send({ email: 'Dwati@email.com', password: '12345678' });
    
    expect(result.body).toEqual({
        message: 'Success',
        data: {token: expect.any(String)}
    });
});



test('Should not fail for authentication', ()=> {

})


//prettier-ignore
test('Should throw validation error on signup', async() => {
    //* About zod schemas from "user-manager-sdk":
    //¡ If you are importing the zod schemas from  "user-manager-sdk" and you are running this code along the LINKED version of ""user-manager-sdk", this will no be  detected as a ZodError. Instead it will be an internal server error.
    // ¡ Run this code with  \ npm i "user-manager-sdk" \ to download from NPM instead of npm link "user-manager-sdk" for this section to work or declare the zod in this server

    
    const result = await request(app).post('/api/signup').send({ username: 'abc', email: 'agugutata', password: '123' });
    

    console.error(result.body)


    expect(result.body.message[0]).toBe("Invalid email");
    expect(result.body.message[1]).toBe("Password must be at least 6 characters long");
});