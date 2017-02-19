//可調整的設定
var servicePort = 58787;

//引入模組
var express = require("express");
var fs = require("fs");

//簡化模組名稱
var app = express();

//靜態資源目錄
app.use("/static", express.static(__dirname));

//讀取json檔
var files = "";
fs.readFile("./namelist.json", "utf-8", function(err, data) {
     if (err) {
          console.error(err);
     }
     else {
        files = JSON.parse(data);
        console.log("Read JSON File Successfully.");
     }
});

//首頁
app.all("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

//接收到get請求
app.route("/calc")
    .get(function(req, res) {
    var result = files[req.query.name];
    console.log("Someone Wants to Look for " + req.query.name + "'s Master: " + result);
    if (result != undefined) {
        //正常輸出
        res.send("<!DOCTYPE html>" +
                 "<html>" +
                 "    <body>" +
                 "        <script>" +
                 "            function helloYou() {" +
                 "                alert('" + result + "');" +
                 "                location.href='/';" +
                 "            }" +
                 "            helloYou();" + 
                 "        </script>" +
                 "    </body>" + 
                 "</html>" 
                );
    }
    else {
        //輸入錯名字
        res.sendFile(__dirname + "/error.html");
    }
})
    .post(function(req, res) {
    res.sendFile(__dirname + "/error.html");
});

//Not Found
app.use(function(req, res) {
	res.sendFile(__dirname + "/error.html");
});

//開啟伺服器
app.listen(servicePort, function(err) {
	console.log("Server Path: " + __dirname);
	console.log("Listening on Port " + servicePort);
});
