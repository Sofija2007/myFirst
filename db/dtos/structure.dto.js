import {isString, isNotEmpty} from '../../utils.js';

export default class StructureDto{
    constructor({ name, address }) {
        this.name = name;
        this.adress = address;
    }

    #checkObject() {
        return(
            isString(this.name) &&
            isNotEmpty(this.name) &&
            isString(this.address) &&
            isNotEmpty(this.address)
        );
    }

    get object() {
        if (!this.#checkObject())
            throw new Error('Try another data for this object!');
        return {
            name: this.name,
            address: this.address,
        };
    }
}