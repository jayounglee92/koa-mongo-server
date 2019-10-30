
require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
const api = require('./api');

const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');

mongoose.Promise = global.Promise; // Node 의 네이티브 Promise 사용
// mongodb 연결
console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(
    (response) => {
        console.log('Successfully connected to mongodb');
    }
).catch(e => {
    console.error(e);
});

const port = process.env.PORT || 4000; // PORT 값이 설정되어있지 않다면 4000 을 사용합니다.

app.use(bodyParser()); // 바디파서 적용, 라우터 적용코드보다 상단에 있어야합니다.

// 미들웨어를 어플리케이션에 등록
// ctx : 웹요청과 응답에 대한 정보를 지니고 있음
// next : 다음 미들웨어를 실행시키는 함수

/*
router.get('/', (ctx, next) => { // '/'경로로 들어오면 '홈'이라는 내용으로 응답하도록 라우터 설정
    ctx.body = '홈';
});

router.get('/about', (ctx, next) => {
    ctx.body = '소개';
});

router.get('/about/:name', (ctx, next) => {
    const { name } = ctx.params; // 라우트 경로에서 :파라미터명 으로 정의된 값이 ctx.params 안에 설정됩니다.
    ctx.body = name + '의 소개';
});

router.get('/post', (ctx, name) => {
    const { id } = ctx.request.query; // 주소 뒤에 ?id=10 이런식으로 작성된 쿼리는 ctx.request.query 에 파싱됩니다.
    if(id) {
        ctx.body = '포스트 #' + id;
    } else {
        ctx.body = '포스트 아이디가 없습니다.';
    }
});
*/

router.use('/api', api.routes()); // api라우트를 /api 경로 하위 라우트로 설정
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    console.log('server is listening to port ' + port);
});