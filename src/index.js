const Koa = require('koa');
const app = new Koa();

// 미들웨어를 어플리케이션에 등록
// ctx : 웹요청과 응답에 대한 정보를 지니고 있음
// next : 다음 미들웨어를 실행시키는 함수
app.use(async(ctx, next) => {
    console.log(1);
    const started = new Date();
    // next() 실행이 끝나면 then 실행
    /*
    next().then(() => {
        console.log(new Date() - started + 'ms');
    });
    */
    
    await next();
    console.log(new Date() - started + 'ms');
});

app.use((ctx, next) => {
    console.log(2);
    next();
});

app.use(ctx => {
    ctx.body = 'Hello Koa';
});

app.listen(4000, () => {
    console.log('server is listening to port 4000');
});