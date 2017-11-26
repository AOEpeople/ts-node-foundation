import * as Promise from "bluebird";
import {BasePersistence} from "../classes/base/base-persistence";
import {ModelInterface} from "../interfaces/model.interface";

export class PersistenceMemory extends BasePersistence {

    private _storage: any[] = [];

    protected _create(model: ModelInterface): Promise<boolean> {
        let exists,
            resolveResult = true,
            modelData = model.toJSON();


        modelData.id = modelData.id || this._getHashString(JSON.stringify(model.toJSON()));

        exists = this._storage.some((storageItem): boolean => {
            return storageItem.id === modelData.id;
        });

        if (exists) {
            resolveResult = false;
        } else {
            this._storage.push(model.toJSON());
        }

        return new Promise((resolve: any) => resolve(resolveResult));
    }

    protected _fetchAll(): Promise<Array<any>> {
        return new Promise((resolve: any): Promise<any> => resolve(this._storage));
    }

    protected _fetch(id: string): Promise<any> {
        return new Promise((resolve: any) => resolve(this._storage.filter((model) => model.id === id)[0]));
    }

    protected _update(id: string, model: ModelInterface): Promise<boolean> {
        let itemWasUpdated = this._storage.some((storageItem: any, index: number): boolean => {

            if (storageItem.id !== id) {
                return false;
            }

            Object
                .keys(storageItem)
                .forEach((propertyName: string) => {
                    if (propertyName === 'id') {
                        return false;
                    }

                    storageItem[propertyName] = model.get(propertyName);
                });

            this._storage[index] = model.toJSON();
            return true;
        });

        return new Promise((resolve) => resolve(itemWasUpdated));
    }

    protected _remove(id: string): Promise<boolean> {
        return new Promise((resolve: any) => {
            resolve(this
                ._storage
                .some((model, index) => {
                    if (model.id !== id) {
                        return false;
                    }

                    this._storage.splice(index, 1);

                    return true;

                }));
        });
    }
}