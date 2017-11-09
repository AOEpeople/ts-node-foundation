import {expect} from 'chai';
import {ExampleModel} from "./example.model";

let modelData = {
    id: 'A1CF43E',
    name: 'A simple test',
    trash: 'A property which is not part of the model'
};

describe('ExampleModel', () => {
    let model = new ExampleModel();

    it('Determine only specified properties are applied in model as data', () => {
        model.setAll(modelData);

        expect(model.toJSON().id).to.equal(modelData.id);
        expect(model.toJSON().name).to.equal(modelData.name);
        expect(model.toJSON().description).to.equal(null);
        expect(model.toJSON().trash).to.equal(undefined);
    });

    it('Determine that properties which are part of the model definition are updated', () => {
        let updatedProperties = {
            description: 'Updated description',
            weirdStuff: true
        };

        model.update(updatedProperties);

        expect(model.toJSON().description).to.equal(updatedProperties.description);
        expect(model.toJSON().weirdStuff).to.equal(undefined);
    });

    it('Determine the name property is updated and so get and set working as expected', () => {
        let updatedName = modelData.name;

        model.set('name', updatedName);

        expect(model.get('name')).to.equal(updatedName);
    });


    it('Should have a toJSON method', () => {
        expect(typeof model.toJSON).to.equal('function');
    });
});