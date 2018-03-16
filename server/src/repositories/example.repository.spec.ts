import {expect} from 'chai';
import {ExampleRepository} from "./example.repository";

let modelData = {
    id: 'A1CF43E',
    name: 'A simple test',
    trash: 'A property which is not part of the model'
};

describe('ExampleRepository', () => {
    let repository = new ExampleRepository();

    it('Should create a new model and write it into specified persistence', (done) => {
        repository
            .create(modelData)
            .then((createResult) => {
                expect(createResult).to.equal(true);
                done();
            });
    });

    it('Should fetch all persisted items as a collection of models', (done) => {
        repository
            .fetchAll()
            .then((modelCollection) => {
                expect(modelCollection instanceof Array).to.equal(true);
                //  console.log(modelCollection);
                expect(modelCollection.pop().get('id')).to.equal(modelData.id);
                done();
            });
    });

    it('Should fetch one persisted item by id', (done) => {
        repository
            .fetch(modelData.id)
            .then((model) => {
                expect(model.get('id')).to.equal(modelData.id);
                done();
            });
    });

    it('Should update one persisted item', (done) => {

        let newName = 'A new name';

        repository
            .update(modelData.id, {name: newName})

            .then((modelUpdated) => {
                expect(modelUpdated).to.equal(true);
                return repository.update('SOMEFAKEID', {name: newName})
            })

            .then((modelUpdated) => {
                expect(modelUpdated).to.equal(false);
                done();
            });

    });

    it('Should remove a persisted model item', (done) => {
        repository
            .remove(modelData.id)
            .then((modelRemoved) => {
                expect(modelRemoved).to.equal(true);

                return repository.remove('SOMEFAKEID')
            })
            .then((modelRemoved) => {
                expect(modelRemoved).to.equal(false);
                done();
            });
    });

    it('Should call the disconnect method but just reolve with true (no real connection)', (done) => {
        repository
            .disconnect()
            .then((disconnected) => {
                expect(disconnected).to.equal(true);
                done();
            });
    });
});