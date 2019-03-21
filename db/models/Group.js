module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('Group', {
        id_user_creator: { type: DataTypes.INTEGER, unique: false, allowNull: false },
        name: { type: DataTypes.STRING, unique: true, allowNull: false },
        passcode: { type: DataTypes.STRING, unique: false, allowNull: false},
        id_chat: { type: DataTypes.STRING, unique: true, allowNull: false }
    });

    Group.associate = (models) => {
        Group.belongsToMany(models.User, { through: models.UserGroup });
        Group.belongsToMany(models.Message, { through: models.GroupMessage });
        Group.belongsTo(models.User, { constraints: false });
        Group.hasMany(models.Message)
    };

    return Group;
}