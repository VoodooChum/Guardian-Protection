module.exports = (sequelize, DataTypes) => {
    const UserGroup = sequelize.define('UserGroup', {
        id_user: { type: DataTypes.INTEGER, unique: true, allowNull: false },
        id_group: { type: DataTypes.INTEGER, unique: true, allowNull: false },
    });

    return UserGroup;
}