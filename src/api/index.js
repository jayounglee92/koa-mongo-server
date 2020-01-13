const Router = require('koa-router');
const books = require('./auth');

const api = new Router();

api.use('/auth', books.routes());

// 라우터를 내보냅니다.
module.exports = api;