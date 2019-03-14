module.exports = (sequelize, DataTypes) => {
    const GroupMessage = sequelize.define('GroupMessage', {
        id_group: { type: DataTypes.INTEGER, unique: true, allowNull: false },
        id_message: { type: DataTypes.INTEGER, unique: true, allowNull: false },
    });

    return GroupMessage;
}