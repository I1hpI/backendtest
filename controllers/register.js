const handleRegister = (req,res,db,bcrypt) => {
    const { email, password, name } = req.body;
   
   if(!email || !name || !password){
     return res.status(400).json('incorect form submission');
   }
  //  hashing the password 
    const hash = bcrypt.hashSync(password);
    // creating transaction to insert the hash and email into the login table
    // using transcation inorder for the below steps be a part of same transaction
    db.transaction(trx => {
      trx
        .insert({
          hash: hash,
          email: email
        })
        .into("login")
        .returning("email")
        .then((loginEmail) => {
          return trx("users")
            .returning("*")
            .insert({
              email: loginEmail[0].email,
              name: name,
              joined: new Date(),
            })
            .then((user) => {
              res.json(user[0]);
            });
        })
        .then(trx.commit)
        .then(trx.rollback)
    }).catch((err) => res.status(400).json("unable to register"));
  }

  module.exports={
     handleRegister:handleRegister
  };