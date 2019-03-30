require('dotenv').config();
const db = require('../models');
const client = require("twilio")(
    process.env.ACCOUNT_SID,
    process.env.AUTH_TOKEN
);
const { Op }= require('sequelize');

const Chatkit = require("@pusher/chatkit-server");

const chatkit = new Chatkit.default({
    instanceLocator: process.env.PUSHER_INSTANCE_LOCATION,
    key: process.env.PUSHER_SECRET_KEY
});

const errorHandler = (req, res, err) => {
    console.error(err);
    if (err.message === 'Validation error') {
        return res.send(401, 'already exists');
    } if (err.message === 'Cannot read property \'_modelAttribute\' of undefined') {
        return res.send(201, 'No events found');
    }
    return res.send(500, 'Something went wrong on our part');
};

const createSchedule = (userId, locationId) => {
    return db.Schedule.create({
        UserId: userId,
        id_location: locationId,
        LocationId: locationId,
        is_user: userId
    })
}

const findSchedulesByUserIdAndToday = async (userId) => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);
    try{
        return db.Schedule.findAll({
            where: {
                UserId: userId,
                createdAt: {
                    [Op.lt]: new Date(),
                    [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
                }
            },
        }); 
    } catch(e){
        console.log(e);
        return null;
    }
}


const requestHandler = {

    /**
     * createUser: a test function to test if we can successfully query/create a user in
     * our database via postman
     * @param {object} req: the incoming request message 
     * @param {object} res: the outcoming response message
     */

    createUser(req, res) {
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
        console.log(req);
    db.User.findOne({ where: { email: req.body.username } }) 
      .then((foundUser) => {
        // console.log(foundUser); 
        res.send(foundUser);
      }).catch((err) => console.log(err))
  }, 


    /**
    * createGroup: creates a new group for an exisitng user
    * @param {object} req: the incoming request message
    * @param {object} res: the outcoming response message
    */
    createGroup(req, res, next) {
        let newGroup = {};
        Object.assign(newGroup, req.body.userData);
        Object.assign(newGroup, req.body.group);
        let sendToPusher = newGroup.name;
        // Creating a user on Pusher - returns a 400 if user already exists but does not harm tbe process
        chatkit.createUser({
            id: newGroup.email,
            name: newGroup.name_first,
            avatarURL: newGroup.url_profile_pic
        })
            .then((user) => {
                console.log('User created successfully', user);
            }).catch((err) => {
                console.log(err);
            });
        chatkit
            .createRoom({
                creatorId: newGroup.email,
                name: newGroup.name,
                private: false,
            })
            .then((room) => {
                console.log("Room created successfully", room);
                newGroup.id_chat = room.id;
                console.log(newGroup);
                newGroup.id_user_creator = newGroup.id;
                delete newGroup.id;
                return newGroup;
            }).then((createdGroup) => {
                return db.Group.create(createdGroup)
            }).then((group) => {
                // console.log(group);
                let groupMember = {
                    'id_user': group.id_user_creator,
                    'id_group': group.id,
                    "UserId": group.id_user_creator,
                    "GroupId": group.id,
                    "id_chat": group.id_chat
                }
                return db.UserGroup.create(groupMember);
            }).catch(err => errorHandler(req, res, err));
    },

    savePushToken(req, res) {
        console.log(`Save token: ${req.body.token} for User: ${req.body.user}`);
        db.User.update(
            { token_push: req.body.token },
            { returning: true, where: { email: req.body.user } }
        ).then(() => console.log('Push Token Saved')).catch(err => errorHandler(req, res, err));
    },

    /**
     * joinGroup: allows an exisitng user to join a group
     * @param {object} req: the incoming request message
     * @param {object} res: the outcoming response message
     */
    joinGroup(req, res, next) {
        let group = req.body.group;
        let user = req.body.user;
        db.Group.findOne({ where: { name: group.groupName, passcode: group.passcode } })
            .then((group) => {
                chatkit.createUser({
                    id: user.email,
                    name: user.name_first,
                    avatarURL: user.url_profile_pic
                })
                    .then((user) => {
                        console.log('User created successfully', user);
                    }).catch((err) => {
                        console.log(err);
                    });

                chatkit.addUsersToRoom({
                    roomId: group.id_chat,
                    userIds: [user.email],
                }).then(() => console.log('added'))
                    .catch(err => console.error(err));

                res.send(group)
                console.log(group)
                let groupMember = {
                    'id_user': user.id,
                    'id_group': group.id,
                    "UserId": user.id,
                    "GroupId": group.id
                }
                return db.UserGroup.create(groupMember);
            }).then(() => console.log('added to group')).catch(err => errorHandler(req, res, err));
    },
    /**
     * @function upload
     * @param {object} req 
     * @param {object} res 
     * @param {function} next
     * this function takes the body of the req param, that should
     * be an object with id_user and url_video as properties and saves
     * them to the database, and sends back the status code and the url 
     */
    async upload(req, res, next) {
        console.log(req.body);
        if (req.body.id_user && req.body.url_video) {
            res.header("Content-Type", "application/json");
            client.messages
                .create({
                    from: process.env.TWILIO_NUMBER,
                    to: 15042107601,
                    body: `Guardian App Alert ${req.body.url_video}`
                })
                .then(() => {
                    res.send(JSON.stringify({ success: true }));
                })
                .catch(err => {
                    console.log(err);
                    res.send(JSON.stringify({ success: false }));
                });

            const newPanic = {};
            Object.assign(newPanic, req.body.id_user);
            Object.assign(newPanic, req.body.url_video);
            db.Panic.create(req.body).then((createdPanic) => {
                res.status(201).send(createdPanic.url_video);
            }).catch((e) => {
                res.status(401).send(e.message);
            })
        } else {
            res.status(400).send('bad request');
        }
    },

    /**
    * @function getMyGroups
    * @param {object} req
    * @param {object} res
    * this function sends the user the groups he/she is currently in to the user's
    * guardian dashboard.
    */

    async getMyGroups(req, res) {
        let myId = req.params.id;
        db.UserGroup.findAll({ where: { id_user: myId } })
            .then(async (groups) => {
                // console.log(groups);
                let myGroups = groups.map((group) => {
                    return group.id_group;
                })
                let allGroups = await db.Group.findAll({ where: { id: myGroups } });
                res.json(allGroups);
                return allGroups;
            }).then(() => console.log('groups sent'))
            .catch(err => errorHandler(req, res, err));
    },

    /**
    * @function groupMembers
    * @param {object} req
    * @param {object} res
        * this function sends the group members of a particular group he/she is  in 
    */

    async groupMembers(req, res) {
        let currentGroup = req.params.groupName;
        // console.log(currentGroup);
        let foundGroup = await db.Group.findOne({ where: { name: currentGroup } }).catch(err => errorHandler(req, res, err));
        let userGroup = await db.UserGroup.findAll({ where: { GroupId: foundGroup.id } }).catch(err => errorHandler(req, res, err));
        let userIds = userGroup.map((groupMember) => groupMember.id_user)
        let groupMembers = await db.User.findAll({ where: { id: userIds } })
        groupMembers;
        res.send(groupMembers);
    },
    async createLocation(req, res) {
        if (req.body.latitude && req.body.userId && req.body.longitude) {
            console.log(req.body.latitude, req.body.longitude);
            const query = {
                longitude: req.body.longitude,
                latitude: req.body.latitude
            };
            try {
                const values = await db.Location.findOne({ where: query });
                console.log(values);
                // res.send('test');
                if (values) {
                    try {
                        const createUserLocation = await db.UserLocation.create({
                            LocationId: values.dataValues.id,
                            UserId: req.body.userId
                        });
                    } catch (e) {
                        res.status(500).send('error in db for UserLocation');
                        return;
                    }
                } else {
                    try {
                        const createdLocation = await db.Location.create(query);
                        try {
                            const createUserLocation = await db.UserLocation.create({
                                LocationId: createdLocation.dataValues.id,
                                UserId: req.body.userId
                            });
                        } catch (e) {
                            console.log(e);
                            res.status(500).send('Error in creating user location 2');
                            return;
                        }
                    } catch (e) {
                        res.status(500).send('error in db for Location');
                        return;
                    }
                }
                res.status(201).send('created location');
            } catch (e) {
                console.log(e);
                res.status(500).send('Database error');
                return;
            }
        } else {
            res.status(400).send('Bad request');
        }
    },
    /**
     * 
     */
    async getLocation(req, res) {
        const { id } = req.params
        const numberId = parseInt(id);
        if (typeof numberId === 'number') {
            try {
                const locations = await db.UserLocation.findAll({ where: { UserId: numberId } });
                if (locations) {
                    const latestLocationUser = locations[locations.length - 1];
                    const lastLocationOfUser = await db.Location.findOne({ where: { id: latestLocationUser.dataValues.LocationId } });
                    res.status(200).send(lastLocationOfUser.dataValues);
                } else {
                    res.status(404).send('This user has no locations');
                }
            } catch (e) {
                console.log(e);
                res.status(500).send('DB Error');
            }
        } else {
            res.send(400);
        }
    },
    async getChatId(req, res) {
        let groupName = req.params.groupName;
        let foundGroup = await db.Group.findOne({ where: { name: groupName } })
        foundGroup;
        res.send(foundGroup);
    },
    
    async getScheduleForToday(req, res){
        const parsedId = parseInt(req.params.id);
        console.log(parsedId);
        if(parsedId){
            try {
                const schedules = await findSchedulesByUserIdAndToday(parsedId);
                console.log(schedules)
                try{
                    const locationIds = [];
                    schedules.forEach((event) => {
                        locationIds.push({id: event.id_location});
                    })
                    const locationsForSchedules = await db.Location.findAll({
                        where: {
                            [Op.or]: locationIds
                        }
                    });
                    res.status(200).send(locationsForSchedules);
                } catch(e){
                    res.sendStatus(404);
                }
                if(schedules){
                    res.status(200).send(schedules);
                } else {
                    res.sendStatus(404);
                }
            } catch(e){
                console.log(e);
                res.sendStatus(500);        
            }
        } else {
            res.sendStatus(400);
        }
    },
    async createSchedule(req, res){
        console.log(req.body);
        if(req.body.latitude && req.body.longitude && req.body.userId){
            try{
                const {latitude, longitude, userId} = req.body;
                const location = await db.Location.findOrCreate({
                    where:{
                        latitude,
                        longitude
                    }
                });
                const { dataValues } = location[0];
                console.log(dataValues);
                try{
                    const createEvent = await createSchedule(userId, dataValues.id);
                    res.status(201).send(createEvent.dataValues);
                } catch(e){
                    console.log(e.message);
                    res.sendStatus(500);
                }
            } catch(e){
                console.log(e.message);
                res.sendStatus(500);
            }
        } else {
            res.sendStatus(400);
        }
    },
    
    togglePanicStatus(req, res){
        let myId = req.params.id 
        db.User.update({is_panic: req.body.is_panic}, {returning: true, where: {id: myId}}) 
        // db.User.findOne({where: {id: myId}}) 
            .then(data => res.send(data))
            .catch(err =>
                errorHandler(req, res, err)
            )
    },

    async checkPanicStatus(req, res){
        const { id } = req.params
        const numberId = parseInt(id);
        if (typeof numberId === 'number') {
            try {
                const groupMember = await db.User.findOne({ where: { id: numberId } });
                if (groupMember) {
                    res.status(200).send(groupMember.is_panic);
                } else {
                    res.status(404).send('This user has is not Panicking');
                }
            } catch (e) {
                console.log(e);
                res.status(500).send('DB Error');
            }
        } else {
            res.send(400);
        }
    }

}

module.exports = requestHandler;