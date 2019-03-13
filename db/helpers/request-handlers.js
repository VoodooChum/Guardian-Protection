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
    }

}

module.exports = requestHandler;
