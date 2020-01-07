const Router = require('koa-router');
const books = require('./books');

const api = new Router();

api.use('/books', books.routes());

// 라우터를 내보냅니다.
module.exports = api;