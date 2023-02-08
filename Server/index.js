const express = require("express");
const { sequelize } = require("./dbConfig");
const { User } = require("./Models/User");
const { Order } = require("./Models/Order");
const { Cart } = require("./Models/Cart");
const { Cart_Assignment } = require("./Models/Cart_Assignment");
const { Book } = require("./Models/Book");
const { Subject } = require("./Models/Subject");
const { Lecturer } = require("./Models/Lecturer");
const { Lecturer_info } = require("./Models/Lecturer_info");
const { Lesson } = require("./Models/Lesson");

const app = express();
sequelize.sync({ alter: false, force: false });
app.listen(3001);
