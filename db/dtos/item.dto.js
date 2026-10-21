import { isEmpty, isNotEmpty, isNumber, isString } from "../../utils";

export default class ItemDto{
    constructor({ name, category_id, location_id, properties, status, current_location_id}) {
        this.name = name;
        this.properties = properties;
        this.status = status;
        this.category_id = category_id;
        this.location_id = location_id;
        this.current_location_id = current_location_id;
    }

    #checkObject() {
        return(
            isString(this.name) && isNotEmpty(this.name) &&
            isString(this.properties) && isNotEmpty(this.properties) &&
            isString(this.status) && isNotEmpty(this.status) &&
            (isNumber(this.category_id) ? isNotEmpty(this.category_id):true) &&           
            (isNumber(this.location_id) ? isNotEmpty(this.location_id):true) &&
            (isNumber(this.current_location_id) ? isNotEmpty(this.current_location_id):true)
        );
    }

    get object() {
        if(!this.#checkObject())
            throw new Error('Try another data for this object!');

        return{
            name: this.name,
            category_id: this.category_id,
            properties: this.properties,
            status: this.status,
            category_id: this.category_id,
            location_id: this.location_id,
            current_location_id: this.current_location_id
        };
    }
}