module.exports = (sequelize, DataTypes) => {
    const Schedule = sequelize.define('Schedule', {
        id_location: { type: DataTypes.INTEGER, unique: true, allowNull: true },
        id_user: { type: DataTypes.INTEGER, unique: true, allowNull: true },
        input_time: { type: DataTypes.DATE, unique: false, allowNull: true },
    });

    Schedule.associate = (models) => {
        Schedule.belongsTo(models.User, { constraints: false });
        Schedule.belongsTo(models.Location, { constraints: false });
    };

    return Schedule;
}