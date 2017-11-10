import {BaseModel} from "../classes/base/base-model";
import {ExampleDataInterface} from "../../../shared/interfaces/example-data.interface";

export class ExampleModel extends BaseModel {
    protected _properties = ['id', 'name', 'description'];
    protected _modelData: ExampleDataInterface;

    public toJSON(): ExampleDataInterface {
        return JSON.parse(JSON.stringify(this._modelData));
    }
}