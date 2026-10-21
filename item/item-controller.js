// const users = [
//     {
//         id:12,
//         name:"Sofa",
//     }
// ];

// export const getItem = async (ctx) => {
//     // const obj = {
//     //     id:12,
//     //     name:"Sofa",
//     // };
//     ctx.status=200;
//     ctx.body= users[0];
// };

// export const deleteItem = async (ctx) => {
//     const id = ctx.params.id;
//     const deletedItem = users.findIndex((u) => u.id === id);
//     users[itemIndex] = null;

//     if(itemIndex === -1)
//     if(!~itemIndex){
//         ctx.status = 403;
//         ctx.body ='item is not deleted';
//     }

//     ctx.status=200;
//     ctx.body= 'success deleted';
// };

// export const updateItem = async (ctx) => {
//     const id = ctx.request.body?.id;
//     const name = ctx.request.body?.name;
//     let user;

//     if(name !== null){
//         const user = user.find((u) => u.id === id);
//         user.name = name;
//     }


//     ctx.status=200;
//     ctx.body= user;
// };

// export const createItem = async (ctx) => {
//     const item = ctx.ctx.request.body;
//     users.push(item);

//     ctx.status=200;
//     ctx.body= "success deleted";
// };


