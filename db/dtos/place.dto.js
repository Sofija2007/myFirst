import { isNotEmpty, isNumber, isString } from "../../utils";

export default class PlaceDto{
    constructor({ number, room_id }) {
        this.number = number;
        this.room_id = room_id;
    }

    #checkObject() {
        return(
            isString(this.number) && isNotEmpty(this.number) &&
            (isNumber(this.room_id) ? isNotEmpty(this.room_id):true)
        );
    }

    get object() {
        if(!this.#checkObject())
            throw new Error('Try another data for this object!');

        return{
            number: this.number,
            room_id: this.room_id,
        };
    }
}