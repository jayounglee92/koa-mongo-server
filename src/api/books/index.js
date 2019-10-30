const Router = require('koa-router');

const books = new Router();
const booksCtrl = require('./books.controller');
/*
books.get('/', (ctx, next) => {
    ctx.body = 'GET' + ctx.request.path;
});
*/
/*
const handler = (ctx, next) => {
    ctx.body = `${ctx.request.method} ${ctx.request.path}`;
};
*/
books.get('/', booksCtrl.list);
books.post('/', booksCtrl.create);
books.delete('/', booksCtrl.delete);
books.put('/', booksCtrl.replace);
books.patch('/', booksCtrl.update);

module.exports = books;