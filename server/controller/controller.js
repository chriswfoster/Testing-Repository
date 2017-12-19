module.exports = {
  getActiveUsers: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .get_active_users()
      .then(users => res.status(200).json(users))
      .catch(console.log);
  },

  postQuestion: (req, res, next)=> {
    const dbInstance= req.app.get('db');
    console.log(req.body.code);
    dbInstance
      .post_question([req.body.code])
      .then(question=> res.status(200).json(question))
      .catch(console.log);
  }
};
