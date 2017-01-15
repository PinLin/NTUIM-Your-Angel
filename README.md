# 台大資管系 IM-Your-Angel 查詢小主人
系內活動網站外包，譴責宏宏。

## Requirements
* `node.js`，推薦使用 [nvm](https://github.com/creationix/nvm) 來安裝。
* (optional)  [pm2](https://github.com/Unitech/pm2) 
    npm install -g pm2
* [express](https://github.com/expressjs/express)
    npm install express

## Usage
```
node app.js
```
or
```
pm2 start app.js --watch
```
服務預設將於 Port 58787 提供。
