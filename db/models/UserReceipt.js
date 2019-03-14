module.exports = (sequelize, DataTypes) => {
    const UserReceipt = sequelize.define('UserReceipt', {
        read: { type: DataTypes.BOOLEAN, unique: true, allowNull: false },
        id_user: { type: DataTypes.INTEGER, unique: true, allowNull: false },
    });

    UserReceipt.associate = (models) => {
        UserReceipt.belongsTo(models.User, { constraints: false });
    };

    return UserReceipt;
}