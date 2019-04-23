module.exports = (sequelize, DataTypes) => {
    const Panic = sequelize.define('Panic', {
        url_video: { type: DataTypes.STRING, unique: true, allowNull: true },
        id_user: { type: DataTypes.INTEGER, unique: false, allowNull: true },
        time: { type: DataTypes.DATE, unique: false, allowNull: true },
    });

    Panic.associate = (models) => {
        Panic.belongsTo(models.User, { constraints: false });
    };

    return Panic;
}