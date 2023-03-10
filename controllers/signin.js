// const handleSignin=(db,bcrypt)=>(req,res)=> {
//   const{email,password}=req.body;
//   if(!email ||  !password){
//     return res.status(400).json('incorect form submission');
//   }
  
//     db.select('email','hash').from('login')
//     .where('email','=', email)
//     .then(data=>{
//       // compare if the above received data matches with the hashed password created by bycrypt
//       const isValid = bcrypt.compareSync(password, data[0].hash);
//       if (isValid)
//       {
//        return db.select('*').from('users')
//         .where('email','=',email)
//         .then(user=>{
//           res.json(user[0])
//         })
//         .catch(err=>res.status(400).json('unable to get user'))
//       }
//       else{
//         res.status(400).json('wrong credentials')
//       }
//     })
//     .catch(err=>res.status(400).json('wrong credentials'))
// }
// // const signinAuthentication = (db,bycrypt) => (req,res) =>{
// //   const{authorization} = req.headers; 


// module.exports={
//     handleSignin:handleSignin}

const jwt = require('jsonwebtoken');




const signToken = (username) => {
  const jwtPayload = { username };
  return jwt.sign(jwtPayload, 'JWT_SECRET_KEY');
};

const createSession = (user) => {
  const { email, id } = user;
  const token = signToken(email);
  
      return { success: 'true', userId: id, token, user }
    
    
};

const handleSignin = (db, bcrypt, req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject('incorrect form submission');
  }
  return db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user => user[0])
          .catch(err => Promise.reject('unable to get user'))
      } else {
        return Promise.reject('wrong credentials');
      }
    })
    .catch(err => err)
}

const getAuthTokenId = (req, res) => {
  const { authorization } = req.headers;
  
}

const signinAuthentication = (db, bcrypt) => (req, res) => {
  const { authorization } = req.headers;
  return authorization ? getAuthTokenId(req, res)
    : handleSignin(db, bcrypt, req, res)
    .then(data =>
      data.id && data.email ? createSession(data) : Promise.reject(data))
    .then(session => res.json(session))
    .catch(err => res.status(400).json(err));
}

module.exports = {
  signinAuthentication: signinAuthentication,
 
}