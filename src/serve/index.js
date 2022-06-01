const Koa = require('koa')
const fs = require('fs')
const path = require('path');
const join = require('path').join;
const execSync = require("child_process").execSync;
const app = new Koa()
// 1、引入koa-router模块
const Router = require('koa-router')
// 2、实例化，创建路由
const router = new Router() //配置无路由前缀的路由
const usersRouter = new Router({ //配置路由前缀为getMap的路由
    prefix: '/getMap'
})
 
// 获取post提交的数据，解析请求体
const bodyparser = require('koa-bodyparser') // 引入koa-bodyparser
app.use(bodyparser())
 
 
// 虚拟数据
const res = 'null'
 
// 3.挂载路由
router.get('/', (ctx) => {
    ctx.response.body = "get!";
})

usersRouter.post('/getMap', (ctx) => { 
    // 根据trace处理成map返回
    const rawtracesPath = path.join(__dirname, "./rawtraces.txt");
    fs.writeFileSync(rawtracesPath, ctx.request.body.data)
    console.log("开始爬取开源合约，填充map...")
    execSync('python3 ./getMap.py "https://etherscan.io/address/ADDRESSFLAG#code"', (err, stdout, stderr) => {
        if(err) {
            ctx.response.body = "err";
        }
    });
    console.log("爬取完毕!")
    const resultAddressMap = fs.readFileSync(path.join(__dirname, "./address_map.txt"), 'utf-8');
    const resultFunctionMap = fs.readFileSync(path.join(__dirname, "./function_map.txt"), 'utf-8');
    ctx.response.body = {
        'resultAddressMap': resultAddressMap,
        'resultFunctionMap': resultFunctionMap
    };
})
 
// 4.注册路由中间件
// 启动路由
app.use(router.routes())
app.use(usersRouter.routes())
// 可设置可不设置，但是推荐设置。allowedMethods作用：
//（1）响应options请求，返回支持的请求方法
//（2）返回405表示不允许访问，返回501表示方法还没实现
app.use(usersRouter.allowedMethods())
 
app.listen(3000,()=>{
    console.log('starting at port 3000'); 
});