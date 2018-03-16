import {expect} from 'chai';
import {ExampleModel} from "../models/example.model";

import {PersistenceMemory} from "./persistence.memory";
import {PersistenceFs} from "./persistence.fs";
import {PersistenceInterface} from "../interfaces/persistence.interface";
import {PersistenceMongodb} from "./persistence.mongodb";
import {Schema} from "mongoose";


let persistenceLayers = [
    new PersistenceMemory(),
    new PersistenceFs(__dirname + '/../../../data'),
    new PersistenceMongodb('ts-node-foundation', 'tests', new Schema({
        id: {type: String, unique: true},
        name: String,
        description: String
    }))
];

describe('Persistence Layers', () => {
    persistenceLayers
        .forEach((persistence: PersistenceInterface) => {

            let firstModelData = {
                id: '235246546AE12A',
                name: 'A simple first test'
            };
            let secondModelData = {
                id: '4353BAF123EE',
                name: 'A simple second test'
            };
            let firstModel = new ExampleModel(firstModelData);
            let secondModel = new ExampleModel(secondModelData);

            let className = persistence
                .constructor
                .toString()
                .match(/^function\s([A-Z][a-z][a-zA-Z]*)/)[1];

            describe(className, () => {

                it('Should create two new items', (done) => {
                    persistence
                        .create(firstModel)
                        .then((persisted) => {
                            expect(persisted).to.equal(true);
                            return persistence.create(secondModel);
                        })
                        .then((persisted) => {
                            expect(persisted).to.equal(true);
                            // Try to recreate an already existing item
                            return persistence.create(secondModel);
                        })
                        .then((persisted) => {
                            expect(persisted).to.equal(false);
                            done();
                        });
                });

                it('Should fetch all items from persistence layer', (done) => {
                    persistence
                        .fetchAll()
                        .then((modelsData) => {
                            expect(modelsData.length === 2).to.equal(true);
                            expect(modelsData[0].id).to.equal(firstModelData.id);
                            expect(modelsData[0].name).to.equal(firstModelData.name);
                            done();
                        });
                });

                it('Should fetch an item by its id', (done) => {
                    persistence
                        .fetch(firstModelData.id)
                        .then((firstModelDataItem) => {
                            expect(firstModelDataItem.id).to.equal(firstModelData.id);
                            expect(firstModelDataItem.name).to.equal(firstModelData.name);
                            done();
                        });
                });

                it('Should update a persisted model item', (done) => {
                    let updatedProperty = 'A new name';

                    secondModel.update({name: updatedProperty});

                    persistence
                        .update(secondModelData.id, secondModel)
                        .then((modelHasBeenUpdated) => {

                            expect(modelHasBeenUpdated).to.equal(true);

                            return persistence.fetch(secondModelData.id)
                        })
                        .then((secondModelDataItem) => {
                            expect(secondModelDataItem.name).to.equal(updatedProperty);
                            done();
                        });
                });

                it('Should remove all persisted items and handle invalid operations', (done) => {
                    persistence
                        .remove(firstModelData.id)
                        .then((modelHasBeenRemoved) => {
                            expect(modelHasBeenRemoved).to.equal(true);
                        })
                        .then(() => {
                            return persistence.remove(secondModelData.id)
                        })
                        .then((modelHasBeenRemoved) => {
                            expect(modelHasBeenRemoved).to.equal(true);

                            return persistence.remove('SOMEFAKEID')
                        })
                        .then((modelHasBeenRemoved) => {
                            expect(modelHasBeenRemoved).to.equal(false);
                            done();
                        });
                });

                it('Should disconnect from persistence layer if there was a previous connection', (done) => {
                    if (!!persistence.disconnect) {

                        expect(typeof persistence.disconnect).to.equal('function');

                        persistence.disconnect().then((disconnected) => {
                            expect(disconnected).to.equal(true);
                            done();
                        });

                    } else {
                        expect(persistence.disconnect).to.equal(undefined);
                        done();
                    }
                });
            });
        });
});