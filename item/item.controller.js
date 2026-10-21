import ItemService from "./item.service";
// import { isNotEmptyArray, isStarting } from "../utils";

export class ItemController{
    constructor( ){
        this.service = new ItemService();
    }

    async getItem(ctx) {
        const { id } = ctx.params;

        const res = await this.service.getOne(id);

        ctx.status = 200;
        ctx.body ={
            data: res,
        };
    }

    async getItems(ctx) {
        const { ids } = ctx.query;

        const res = await this.service.getAll({ ids });

        ctx.status = 200;
        ctx.body ={
            data: res,
        };
    }

    async deleteItem(ctx) {
        const { id } = ctx.params;

        await this.service.softDelete(id);

        ctx.status = 200;
        ctx.body = {
            status: 200,
            message: 'OK',
        };
    }

    async updateItem(ctx) {
        const {id} = ctx.params;
        const data = ctx.request.body;

        const res = await this.service.update(id, data);

        ctx.status = 200;
        ctx.body ={
            data: res,
        };
    }

    async createItem(ctx) {
        const data = ctx.request.body;

        const res = await this .service.create(data);

        ctx.status = 200;
        ctx.body ={
            data: res,
        };
    }
}







// export const getItems = async ctx => {
//     const service = new ItemService();
//     const { id, name, locations, status, category, isNotLocated } = ctx.params;

//     const items = await service.getAll({
//         ids: isNotEmptyArray(id) ? id : [ id ],
//         name: isStarting(name) ? name : undefined,
//         locations: isNotEmptyArray(location) ? location : [ location ],
//     });
// };

// export const deleteItem = async ctx => {};

// export const updateItem = async ctx => {};

// export const createItem = async ctx => {};