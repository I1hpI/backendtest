const express = require("express");
const cors = require("cors");
const knex = require("knex");
const bcrypt=require('bcrypt-nodejs');
const register= require('./controllers/register');
const signin = require('./controllers/signin');
const profile= require('./controllers/profile');
const image= require('./controllers/image');

// connecting server to database 
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "test",
    database: "smart-brain",
  },
});
// const db = knex({
//   client: "pg",
//   connection: {
//     host: "satao.db.elephantsql.com",
//     port:5432,
//     user: "nmtrcnbh",
//     password: "GC6X-PPMnuFihh3ncA-_3hV9_ImFRL3n",
//     database: "nmtrcnbh",
//   },
// });

// db.select('*').from('users').then(data=>{
//     console.log(data);
// });

const app = express();

const database = {
  users: [
    {
      id: "23",
      name: "john",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "234",
      name: "sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: "",
      hash: "",
      email: "john@gmail.com",
    },
  ],
};
app.use(express.json());
app.use(cors());

// here we are passing the req, res, db, bcrypt into their own controller component 
app.get("/", (req, res) => {res.send('success');});
app.post("/signin", signin.signinAuthentication(db,bcrypt));
app.post("/register", (req,res)=>{register.handleRegister(req,res,db,bcrypt)});
app.get("/profile/:id",(req,res)=> {profile.handleProfileGet(req,res,db)});
app.put("/image", (req,res)=>{image.handleImage(req,res,db)});
app.post("/imageurl", (req,res)=>{image.handleApiCall(req,res)});
app.listen(3000, () => {console.log("app is running");});

// / -->res=this is workin
// /signin --> POST =success/fail
// /register -->POSt =user
// /profile /:userId-->GET =user
// /image -->PUT-->user
module.exports={db,app}