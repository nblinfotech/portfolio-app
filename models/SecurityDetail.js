module.exports = (sequelize, DataTypes) => {
    return sequelize.define('SecurityDetail', {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        SECURITY_NAME: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        VALUE: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        tableName: 'SECURITY_DETAIL',
        timestamps: false
    });
};
