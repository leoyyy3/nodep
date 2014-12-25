//引入连接陪着的模块
var settings = require("../settings");
//得到db对象
var Db = require("mongodb").Db;
//得到连接对象
var Connection = require("mongodb").Connection;
//得到服务对象
var Server = require("mongodb").server;
//创建连接对象并暴漏给接口
module.exports = new Db(settings.db,new Server(settings.host,Connection.DEFAULT_PORT,{}));