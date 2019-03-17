const db = require('../models');

const errorHandler = (req, res, err) => {
    console.error(err);
    if (err.message === 'Validation error') {
        return res.send(401, 'already exists');
    } if (err.message === 'Cannot read property \'_modelAttribute\' of undefined') {
        return res.send(201, 'No events found');
    }
    return res.send(500, 'Something went wrong on our part'); 
}; 

const requestHandler = {

    /**
     * createUser: a test function to test if we can successfully query/create a user in
     * our database via postman
     * @param {object} req: the incoming request message 
     * @param {object} res: the outcoming response message
     */

    createUser(req, res){
        const newUser = req.body;
        db.User.create(newUser)
            .then((returnedUser) => { 
                res.send('created!')
                console.log('created');
            })
            .catch(err => errorHandler(req, res, err));
    },

    /*
  signup
  on POST /signup
  expects:
    req.body: JSON => { "username", "password" }
  if username in db: 401
  else on creation: login, send 200, {username, id}
  */
    signup(req, res, next) {
        const newUser = {};
        Object.assign(newUser, req.body.props);
        Object.assign(newUser, req.body.user);
        newUser.radius = 30;
        newUser.update_interval = 24;
        db.User.create(newUser) 
            .then((returnedUser) => {
                req.login({ username: returnedUser.username, id: returnedUser.id }, (err) => {
                    if (err) return next(err);
                    console.log('loggedin') 
                    return res.json(201, {
                        username: returnedUser.username,
                        id: returnedUser.id,
                    });
                });
                console.log('created');
            })
            .catch(err => errorHandler(req, res, err));
    },

    /**
     * login: logs a user in that has an existing account 
     * @param {object} req: the incoming request message
     * @param {object} res: the outcoming response message
     */

    login(req, res, next) {
    db.User.findOne({ where: { email: req.body.username } }) 
      .then((foundUser) => {
        console.log(foundUser); 
        res.send(foundUser);
      }).catch((err) => console.log(err))
  }, 
/**
    * createGroup: creates a new group for an exisitng user
    * @param {object} req: the incoming request message
    * @param {object} res: the outcoming response message
    */
    createGroup(req, res, next){
        let newGroup = {};
        Object.assign(newGroup, req.body.userData);
        Object.assign(newGroup, req.body.group);

        newGroup.id_user_creator = newGroup.id;
        delete newGroup.id;
        db.Group.create(newGroup) 
            .then((group)=>{
                console.log(group, 'created');
        })
    }
    upload(req, res, next){
        res.status(200).send('u connected chief');
    }
}

module.exports = requestHandler;
