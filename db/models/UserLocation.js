module.exports = (sequelize, DataTypes) => {
    const UserLocation = sequelize.define('UserLocation', {
        time: { type: DataTypes.DATE, unique: false, allowNull: true },
    });

    UserLocation.associate = (models) => {
        UserLocation.belongsTo(models.RouteLocation, { constraints: false });
    };

    return UserLocation;
}