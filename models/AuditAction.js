module.exports = (sequelize, DataTypes) => {
    return sequelize.define('AuditAction', {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ID_USER_LOGIN_DETAIL: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        USER_ACTION: {
            type: DataTypes.STRING,
            allowNull: false
        },
        START_DATE_TIME: {
            type: DataTypes.DATE,
            allowNull: false
        },
        END_DATE_TIME: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'AUDIT_ACTION',
        timestamps: false
    });
};
