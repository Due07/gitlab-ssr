const koaRouter = require('koa-router');
const router = new koaRouter();

const koaStatic = require('koa-static');

const fs = require('fs');

router.get('/middleware/weights/:file', async (ctx, next) => {
    const fileName = ctx.request.params.file;
    // 指定目录下所有文件名称
    const fileList = fs.readdirSync('./middleware/weights');
    if (fileList.includes(fileName)) {
        await next();
    } else {
        ctx.body = {
            code: 400,
            message: '没有此文件～',
            status: 'error',
            date: new Date(),
        };
    }
}, koaStatic('./'));

module.exports = router;