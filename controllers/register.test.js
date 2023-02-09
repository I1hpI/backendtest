const {makeFetch}= require('node-fetch');
// const http = require ('http');

// const { registerUser } = require("./userController");

//const { server } = require("../index"); // Link to your server file
const request = require("supertest");

// const {db}= require('./signin.js');
// const register= require('./controllers/register');
const {app} = require('../server');

const server = http.createServer(app)
//     (req, res) => {
//     res.setHeader('content-type', 'application/json');
//     res.end(JSON.stringify({ greeting: 'Hello!' }));
// });

const fetch = makeFetch(server);
afterAll(async () => {
    async () => {
        await server.close(() => {
            process.exit(1);
        });
    }
})
describe('Register user',()=>
{  it("Should save user to database", async () => {
    jest.setTimeout(10000)
    // const res = await request("localhost:3000").post("/register").send ({

    //           email: "a@gmail.com",
    //             password: 'anuj',
    //             name: "anuj"})
    // const res = await request("localhost:3000").post("/register").send(
    //     JSON.stringify({

    //         email: "a@gmail.com",
    //         password: 'anuj',
    //         name: "anuj"})
        // )
    const res = await fetch('http://localhost:3000/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body:  JSON.stringify({

                    email: "a@gmail.com",
                    password: 'anuj',
                    name: "anuj"})
                ,
    });
  console.log('hii',res.body);
    
    
    // expect(res.body[0].name).toBe(user.name);
    // expect(res.body[0].id).toBeTruthy();
    // expect(res.body[0].created_at).toBeTruthy();
    // expect(res.body[0].updated_at).toBeTruthy()
}) 

})