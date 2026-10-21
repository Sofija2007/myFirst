import { isNotEmpty, isNumber, isString } from "../../utils";

export default class LocationDto{
    constructor({ name, parent_id }) {
        this.name = name;
        this.parent_id = parent_id;
    }

    #checkObject() {
        return(
            isString(this.name) && isNotEmpty(this.name) &&
            (isNumber(this.parent_id) ? isNotEmpty(this.parent_id):true)
        );
    }

    get object() {
        if(!this.#checkObject())
            throw new Error('Try another data for this object!');

        return{
            name: this.name,
            parent_id: this.parent_id,
        };
    }
}