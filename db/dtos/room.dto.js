import { isNotEmpty, isNumber, isString } from "../../utils";

export default class RoomDto{
    constructor({ room_number, floor_id }) {
        this.room_number = room_number;
        this.floor_id = floor_id;
    }

    #checkObject() {
        return(
            isString(this.room_number) && isNotEmpty(this.room_number) &&
            (isNumber(this.floor_id) ? isNotEmpty(this.floor_id):true)
        );
    }

    get object() {
        if(!this.#checkObject())
            throw new Error('Try another data for this object!');

        return{
            room_number: this.room_number,
            floor_id: this.floor_id,
        };
    }
}