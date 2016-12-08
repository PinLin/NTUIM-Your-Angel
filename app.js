//可調整的設定
var servicePort = 58787;

//引入模組
var express = require("express");
var app = express();
var fs = require("fs");

//靜態資源目錄
app.use("/static",express.static(__dirname));

//讀取json檔
var files = "";
fs.readFile("./namelist.json", "utf-8", function(err, data){
     if (err) {
          console.error(err);
     } else {
        files = JSON.parse(data);
        console.log("Read JSON File Successfully.");
     }
});
//首頁
app.get("/",function(req,res){
	res.sendFile(__dirname + "/index.html");
});

//接收到get請求
app.get("/calc/:email",function(req,res){
    var result = files[req.params.email];
    console.log("Look for " + req.params.email + "'s Master: " + result);
    if (result != undefined) {
        //正常輸出
        res.send("<!DOCTYPE html>" +
                 "<html>" +
                 "  <script>" +
                 "      function helloYou() {" +
                 "          alert('" + result + "');" +
                 "          location.href='/';" +
                 "      }" +
                 "  </script>" +
                 "  <body onload='helloYou()'/>" +
                 "</html>" 
                );
    }
    else {
        //輸入錯名字
        res.sendFile(__dirname + "/error.html");
    }
});

//Not Found
app.use(function(req,res){
	res.sendFile(__dirname + "/error.html");
});

//開啟伺服器
app.listen(servicePort,function(err){
	console.log("Server Path: " + __dirname);
	console.log("Listening on Port " + servicePort);
});
