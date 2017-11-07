import {expect} from 'chai';
import {ExampleRepository} from "./example.repository";

let modelData = {
    id: 'A1CF43E',
    name: 'A simple test',
    trash: 'A property which is not part of the model'
};

describe('ExampleRepository', () => {
    let repository = new ExampleRepository();

    it('Should create a new model and write it into specified persistence', () => {
        repository
            .create(modelData)
            .then((createResult) => {
                expect(createResult).to.equal(true);
            });
    });

    it('Should fetch all persisted items as a collection of models', () => {
        repository
            .fetchAll()
            .then((modelCollection) => {
                expect(modelCollection instanceof Array).to.equal(true);
                expect(modelCollection.pop().get('id')).to.equal(modelData.id);
            });
    });

    it('Should fetch one persisted item by id', () => {
        repository
            .fetch(modelData.id)
            .then((model) => {
                expect(model.get('id')).to.equal(modelData.id);
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
});