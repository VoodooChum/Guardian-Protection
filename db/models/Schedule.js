module.exports = (sequelize, DataTypes) => {
    const Schedule = sequelize.define('Schedule', {
        id_route: { type: DataTypes.STRING, unique: true, allowNull: true },
        id_user: { type: DataTypes.INTEGER, unique: true, allowNull: true },
        input_time: { type: DataTypes.DATE, unique: false, allowNull: true },
    });

    Schedule.associate = (models) => {
        Schedule.belongsTo(models.User, { constraints: false });
        Schedule.hasMany(models.Route, { constraints: false });
    };

    return Schedule;
}