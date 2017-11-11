import {BaseModel} from "../classes/base/base-model";
import {ExampleDataInterface} from "../../../shared/interfaces/example-data.interface";

export class ExampleModel extends BaseModel implements ExampleDataInterface {

    constructor(example: ExampleDataInterface) {
        super();

        this.id = example.id || null;
        this.name = example.name || null;
        this.description = example.description || null;
    }

    protected _properties = ['id', 'name', 'description'];

    public id: string;
    public name: string;
    public description: string;

    public toSentence(): string {
        return 'Hallo ' + this.name;
    }

    public toJSON(): ExampleDataInterface {
        return {
            id: this.id,
            name: this.name,
            description: this.description
        };
    }
}