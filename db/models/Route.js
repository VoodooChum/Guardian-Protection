module.exports = (sequelize, DataTypes) => {
    const Route = sequelize.define('Route');

    Route.associate = (models) => {
        Route.belongsToMany(models.User, { through: models.Schedule });
        Route.hasMany(models.RouteLocation, { constraints: false })
    };

    return Route;
}