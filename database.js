const express = require("express");
const app = express();
const mysql = require("mysql");

//创建连接
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "nodesql"
});

conn.connect(err => {
    if (err) throw err;
    console.log("数据库连接成功");
});


//创建数据库方法
function createDB(db) {
    let sql = `create database  ${db}`;
    conn.query(sql, (err, result) => {
        if (err) throw err;
        console.log(`数据库连接成功：---${result}`);
    })

}

function add() {
    console.log("ok")
}

function del() {
    console.log("del");
}

function update() {
    console.log("update");
}


module.exports = {
    createDB,
    add,
    del,
    update
}