  const handeProfileGet=(req, res,db) => {
    const { id } = req.params;
  //  get id from req.params and compare it to database data if it matches return the user
    db.select("*")
      .from("users")
      .where({ id })
      .then((user) => {
        if (user.length) {
          res.json(user[0]);
        } else {
          res.status(400).json("Not found");
        }
      })
      .catch((err) => res.status(400).json("error getting user"));
  }
  module.exports={
handeProfileGet
  }