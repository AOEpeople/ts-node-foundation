import {BaseModel} from "../classes/base/base-model";
import {ExampleDataInterface} from "../../../shared/interfaces/example-data.interface";

export class ExampleModel extends BaseModel implements ExampleDataInterface {

    protected _properties = ['id', 'name', 'description'];

    public id: string;
    public name: string;
    public description: string;

    public toJSON(): ExampleDataInterface {
        return {
            id: this.id,
            name: this.name,
            description: this.description
        };
    }
}