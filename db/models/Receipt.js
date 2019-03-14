module.exports = (sequelize, DataTypes) => {
    const Receipt = sequelize.define('Receipt', {
        id_group_message: { type: DataTypes.INTEGER, unique: true, allowNull: false },
        id_user_message_read: { type: DataTypes.INTEGER, unique: true, allowNull: false },
    });

    Receipt.associate = (models) => {
        Receipt.belongsTo(models.UserReceipt, { constraints: false });
    };

    return Receipt;
}