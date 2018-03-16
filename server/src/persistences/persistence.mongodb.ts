import {BasePersistence} from "../classes/base/base-persistence";
import {ModelInterface} from "../interfaces/model.interface";
import * as Promise from 'bluebird';
import * as mongoose from "mongoose";
import {Schema, model} from "mongoose";
import {Resolver} from "bluebird";


export class PersistenceMongodb extends BasePersistence {

    private MongoDbModel;
    private connection;

    constructor(private dbName: string, private collectionName: string, private schema: Schema) {
        super();
    }

    private _connect() {
        return new Promise((resolve) => {
            if (!!this.MongoDbModel) {
                resolve(true);
            } else {
                mongoose.connect('mongodb://localhost/tsnode').then((connection) => {
                    this.connection = connection;
                    this.MongoDbModel = model(this.collectionName, this.schema);
                    resolve(true);
                });
            }
        });
    }

    protected _create(item: ModelInterface): Promise<boolean> {
        return this._connect()
            .then(() => {
                let modelData = item.toJSON();
                return new this.MongoDbModel(modelData).save();
            })
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });
    }

    protected _fetchAll(): Promise<Array<any>> {
        return this._connect()
            .then(() => {
                return this.MongoDbModel.find({});
            });
    }

    protected _fetch(id: string): Promise<any> {
        return this._connect()
            .then(() => {
                return this.MongoDbModel.findOne({id: id});
            });
    }

    protected _update(id: string, model: ModelInterface): Promise<boolean> {
        return this
            ._connect()
            .then(() => {
                return this.MongoDbModel.findOneAndUpdate({id: id}, {$set: model.toJSON()})
            })
            .then((result) => {
                return result !== null;
            }).catch((error) => {
                return false;
            });
    }

    protected _remove(id: string): Promise<boolean> {
        return this
            ._connect()
            .then(() => {
                return this.MongoDbModel.findOneAndRemove({id: id});
            })
            .then((result) => {
                return result !== null;
            }).catch((error) => {
                return false;
            });
    }

    public disconnect(): Promise<any> {
        return this
            .connection
            .disconnect()
            .then(() => {
                return true;
            }).catch(() => {
                return false;
            });
    }
}