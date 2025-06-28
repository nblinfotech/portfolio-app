module.exports = (sequelize, DataTypes) => {
    return sequelize.define('AccountDetail', {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ID_USER_LOGIN_DETAIL: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        CREDIT: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        DEBIT: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        RUNNING_BALANCE: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 10000
        },
        ID_ORDER_DETAIL: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        CREATED_BY: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        CREATED_ON: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'ACCOUNT_DETAIL',
        timestamps: false
    });
};
