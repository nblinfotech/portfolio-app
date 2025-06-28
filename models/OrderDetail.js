module.exports = (sequelize, DataTypes) => {
    return sequelize.define('OrderDetail', {
        ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        ID_SECURITY_DETAIL: DataTypes.INTEGER,
        ORDER_REF_NO: DataTypes.STRING,
        ORDER_STATUS: DataTypes.STRING,
        TRANSACTION_TYPE: DataTypes.STRING,
        ORDER_VALUE: DataTypes.FLOAT,
        CREATED_BY: DataTypes.INTEGER
    }, {
        tableName: 'ORDER_DETAIL',
        timestamps: false
    });
};
