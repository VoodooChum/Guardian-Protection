module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name_first: { type: DataTypes.STRING, unique: false, allowNull: false },
        name_last: { type: DataTypes.STRING, unique: false, allowNull: false },
        safeword: { type: DataTypes.STRING, unique: false, allowNull: false },
        radius: { type: DataTypes.INTEGER, unique: false, allowNull: true },
        update_interval: { type: DataTypes.INTEGER, unique: false, allowNull: true },
        url_profile_pic: { type: DataTypes.STRING, unique: false, allowNull: false },
        email: { type: DataTypes.STRING, unique: true },
        token_push: { type: DataTypes.STRING, unique: false, allowNull: true },
    });

    User.associate = (models) => {
        User.belongsToMany(models.Group, { through: models.UserGroup });
        User.belongsToMany(models.Location, { through: models.UserLocation });
        User.hasMany(models.Group, { constraints: false });
        User.hasMany(models.UserLocation, { constraints: false });
    };


    return User;
}