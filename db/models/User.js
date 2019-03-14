module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name_first: { type: DataTypes.STRING, unique: true, allowNull: false },
        name_last: { type: DataTypes.STRING, unique: true, allowNull: false },
        safeword: { type: DataTypes.STRING, unique: true, allowNull: false },
        radius: { type: DataTypes.INTEGER, unique: true, allowNull: false },
        update_interval: { type: DataTypes.INTEGER, unique: true, allowNull: false },
        url_profile_pic: { type: DataTypes.STRING, unique: true, allowNull: false },
        email: { type: DataTypes.STRING, unique: true },
    });

    User.associate = (models) => {
        User.belongsToMany(models.Group, { through: models.UserGroup });
        User.hasMany(models.Group, { constraints: false });
    };

    return User;
}