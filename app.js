const express = require("express");
const app = express();
const mysql = require("mysql");

//数据库连接
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "nodetest"
})
db.connect(err => {
    if (err) throw err;
    console.log("数据库连接成功");
});

//测试方法
app.get("/", (req, res) => {
    console.log(req.url);
    res.send("THIS IS HOME PAGE!");
})

//创建数据库
app.get("/createdb", (req, res) => {
    let dbname = "nodetest";
    let sql = `CREATE DATEBASE  ${dbname}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        let d = JSON.stringify(result);
        console.log(result);
        res.send("数据库创建成功!");
    })
})


//创建数据表
app.get("/createtable", (req, res) => {
    let key = "id int AUTO_INCREMENT,title VARCHAR(255),body VARCHAR(255),PRIMARY KEY(id)";
    let sql = `CREATE TABLE posts(${key})`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send("数据表创建成功!");
    })
})


//插入内容
app.get("/addpost", (req, res) => {
    let post = {
        title: "我是标题",
        body: "我是内容"
    };
    let sql = "INSERT INTO posts SET ?";
    db.query(sql, post, (err, result) => {
        if (err) throw err;
        res.send("数据插入成功!");
    })
})

//数据库查询
app.get("/getposts", (req, res) => {
    let sql = "SELECT * FROM posts";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    })
})

//单条数据查询
app.get("/getpost/:id", (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    })
})

//更新数据
app.get("/updatepost/:id", (req, res) => {
    let obj = "我是新来的"
    let sql = `UPDATE posts SET title= '${obj}' WHERE id = '${req.params.id}'`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send("数据更新成功！");
    })
})

//数据删除
app.get("/deletepost/:id", (req, res) => {
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send("删除成功！");
    })
})


//端口
const prot = 8000;
//端口监听
app.listen(prot, () => {
    console.log(`正在监听端口:${prot}`);
})