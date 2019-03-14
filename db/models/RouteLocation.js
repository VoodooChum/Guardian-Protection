module.exports = (sequelize, DataTypes) => {
    const RouteLocation = sequelize.define('RouteLocation', {
        id_user_location: { type: DataTypes.INTEGER, unique: true, allowNull: false },
        id_route: { type: DataTypes.INTEGER, unique: true, allowNull: false },
        time: { type: DataTypes.DATE, unique: false, allowNull: true },
    });

    RouteLocation.associate = (models) => {
        RouteLocation.hasMany(models.Route, { constraints: false });
    };

    return RouteLocation;
}