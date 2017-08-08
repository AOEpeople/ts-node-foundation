import {ExampleModel} from "./test.model"
import {expect} from 'chai';


describe('ExampleModel', () => {
    let testModel = new ExampleModel();

    it('Should have a save method', () => {
        expect(testModel.save()).to.equal(true);
    });
});