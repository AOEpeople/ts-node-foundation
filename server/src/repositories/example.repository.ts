import {ModelInterface} from "../interfaces/model.interface";
import {BaseRepository} from "../classes/base/base-repository";
import {ExampleModel} from "../models/example.model";
import {PersistenceInterface} from "../interfaces/persistence.interface";

import {PersistenceMemory} from "../persistences/persistence.memory";
import {PersistenceFs} from "../persistences/persistence.fs";

export class ExampleRepository extends BaseRepository {

    // Both persistence layers provide an identical interface
    protected _persistence: PersistenceInterface = new PersistenceFs(__dirname + '/../../../data');
    //protected _persistence: PersistenceInterface = new PersistenceMemory();

    protected _getModel(modelData): ModelInterface {
        let model = new ExampleModel(modelData);
        return model;
    }
}