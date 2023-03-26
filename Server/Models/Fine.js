const DataTypes = require("sequelize");
const { Order } = require("./Order");
const { sequelize } = require("../dbConfig");

const Fine = sequelize.define(
  "Fines",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    OrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Orders",
        key: "id",
      },
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    timestamps: false,
  }
);

Order.hasOne(Fine, { foreignKey: "OrderId" });
Fine.belongsTo(Order);

module.exports = { Fine };
