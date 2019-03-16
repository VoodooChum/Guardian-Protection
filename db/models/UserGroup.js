module.exports = (sequelize, DataTypes) => {
    const UserGroup = sequelize.define('UserGroup', {
        id_user: { type: DataTypes.INTEGER, unique: false},
        id_group: { type: DataTypes.INTEGER, unique: false},
    });

    return UserGroup;
}