module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('UserGroup', {
        id_user_creator: { type: DataTypes.INTEGER, unique: true, allowNull: false },
        name: { type: DataTypes.STRING, unique: true, allowNull: false },
        passcode: { type: DataTypes.STRING, unique: true, allowNull: false}
    });

    Group.associate = (models) => {
        Group.belongsToMany(models.User, { through: models.UserGroup });
        Group.belongsTo(models.User, { constraints: false });
    };

    return Group;
}