import {ModelInterface} from "../../interfaces/model.interface";

export abstract class BaseModel implements ModelInterface {
    
    protected abstract _properties: string[];

    public setAll(modelData: any) {
        if (!!modelData) {
            this
                ._properties
                .forEach((propertyName: string) => {
                    this[propertyName] = modelData[propertyName] || null;
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
        if (property.length > 0 && this[property] !== undefined) {
            this[property] = value;
        }
    }

    public get(property: string): any {
        return this[property];
    }

    public abstract toJSON()
}