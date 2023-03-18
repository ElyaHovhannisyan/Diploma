const DataTypes = require("sequelize");
const { sequelize } = require("../dbConfig");
const { Author } = require("./Author");
const { Book } = require("./Book");

const BookDetail = sequelize.define(
  "BookDetails",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    AuthorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Authors",
        key: "id",
      },
    },
    BookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Books",
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

Author.hasMany(BookDetail, { foreignKey: "AuthorId" });
BookDetail.belongsTo(Author);
Book.hasMany(BookDetail, { foreignKey: "BookId" });
BookDetail.belongsTo(Book);

module.exports = { BookDetail };
