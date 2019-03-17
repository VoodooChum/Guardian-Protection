module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        id_user_creator: { type: DataTypes.INTEGER, unique: true, allowNull: false },
        name: { type: DataTypes.STRING, unique: true, allowNull: false },
        passcode: { type: DataTypes.STRING, unique: true, allowNull: false }
    });

    Message.associate = (models) => {
        Message.belongsTo(models.User, { constraints: false });
    };

    return Message;
}