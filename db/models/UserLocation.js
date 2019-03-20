module.exports = (sequelize, DataTypes) => {
    const UserLocation = sequelize.define('UserLocation', {
        id_user: { type: DataTypes.INTEGER, unique: true, allowNull: false },
        id_location: { type: DataTypes.INTEGER, unique: true, allowNull: false },
        time: { type: DataTypes.DATE, unique: false, allowNull: true },
    });

    UserLocation.associate = (models) => {
        UserLocation.belongsTo(models.RouteLocation, { constraints: false });
    };

    return UserLocation;
}