import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import itemRouter from './item/item.router.js'


const koa=new Koa();

// koa.use((ctx) => {
//     ctx.body ='Hello world';
// });
//koa.use(Bodyparser());

// const router = new Router({
//     prefix:'/items',
// });

// // router.get('/', getItem);

// const controller = new ItemController();

// router.get('/', controller.getItems.bind(controller));
// router.get('/:id', controller.getItem.bind(controller));
// router.patch('/:id', controller.updateItem.bind(controller));
// router.delete('/:id', controller.deleteItem.bind(controller));
// router.post('/', controller.createItem.bind(controller));

// app.use(router.routes());
// app.use(router.allowedMethods());

koa.use(itemRouter.routes());
koa.use(itemRouter.allowedMethods());

koa.listen(3000);