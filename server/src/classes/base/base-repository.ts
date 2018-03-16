import * as Promise from "bluebird";
import {BaseModel} from "./base-model";
import {RepositoryInterface} from "../../interfaces/repository.interface";
import {PersistenceInterface} from "../../interfaces/persistence.interface";
import {ModelInterface} from "../../interfaces/model.interface";

export abstract class BaseRepository implements RepositoryInterface {

    protected abstract _persistence: PersistenceInterface;

    protected abstract _getModel(modelData): ModelInterface;

    public create(modelData: any): Promise<boolean> {
        return this._persistence.create(this._getModel(modelData));
    }

    public fetchAll(): Promise<Array<ModelInterface>> {
        return this._persistence.fetchAll()
            .then((modelDataItems) => {
                    return modelDataItems.map((modelDataItem) => {
                        return this._getModel(modelDataItem);
                    });
                }
            );
    }

    public fetch(id: string): Promise<ModelInterface> {
        return this._persistence.fetch(id)
            .then((modelDataItem) => {
                return this._getModel(modelDataItem);
            });
    }

    public update(id: string, modelData: any): Promise<boolean> {

        return this
            ._persistence
            .fetch(id)
            .then((modelDataItem) => {

                if (!modelDataItem) {
                    return false;
                }

                let model = this._getModel(modelDataItem);
                model.update(modelData);

                return this._persistence.update(id, model);
            });
    }

    public remove(id: string): Promise<boolean> {
        return this._persistence.remove(id);
    }

    public disconnect() {
        if (!!this._persistence.disconnect) {
            return this._persistence.disconnect();
        } else {
            return new Promise((resolve) => {
                resolve(true);
            });
        }
    }
}