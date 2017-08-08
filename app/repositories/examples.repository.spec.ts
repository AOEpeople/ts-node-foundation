import {TestRepository} from "./examples.repository"
import {expect} from 'chai';


describe('TestRepository', () => {
    let testRepository = new TestRepository();

    it('Should have a save method', () => {
        expect(testRepository.save()).to.equal(true);
    });
});