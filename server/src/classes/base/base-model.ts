import {ModelInterface} from "../../interfaces/model.interface";

export abstract class BaseModel implements ModelInterface {

    private _modelData: any = {};

    protected abstract _properties: string[];

    public setAll(modelData: any) {
        if (!!modelData) {
            this
                ._properties
                .forEach((propertyName: string) => {
                    this._modelData[propertyName] = modelData[propertyName] || null;
                });
        }
    }

    public update(updatedModelDataItem: any) {
        if (!!updatedModelDataItem) {
            Object
                .keys(updatedModelDataItem)
                .forEach((updatedModelDataItemPropertyName: string) => {
                    this.set(updatedModelDataItemPropertyName, updatedModelDataItem[updatedModelDataItemPropertyName]);
                });
        }
    }

    public set(property: string, value: any) {
        if (property.length > 0 && this._modelData[property] !== undefined) {
            this._modelData[property] = value;
        }
    }

    public get(property: string): any {
        return this._modelData[property];
    }

    public toJSON() {
        return JSON.parse(JSON.stringify(this._modelData));
    }
}