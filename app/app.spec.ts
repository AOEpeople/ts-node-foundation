import {App} from './app';
import {expect} from 'chai';
import {readFileSync} from "fs";

import * as request from "supertest";

const dummyConfig = JSON.parse(readFileSync(__dirname + '/config/config.testing.json', 'utf-8'));


describe('Class App', () => {
    let appServer = new App(dummyConfig);

    it('Should determine all required properties were set', () => {
        expect(appServer.app).to.be.an('function');
        expect(appServer.config).to.be.an('object');
        expect(appServer.server).to.be.an('object');
        expect(appServer.router).to.be.an('function');
        expect(appServer.log).to.be.an('function');
    });


    describe('Determine all CRUD routes are responding', () => {
        let server = request(appServer.app);

        it('Should check the POST (CREATE) call', (done) => {
            server
                .post('/')
                .expect(200, (err: Error, res: any) => {
                    expect(res.body.method).to.equal('POST');
                    done();
                });
        });

        it('Should check the GET all (READ all) call', (done) => {
            server
                .get('/')
                .expect(200, (err: Error, res: any) => {
                    expect(res.body.method).to.equal('GET');
                    done();
                });
        });

        it('Should check the GET one (READ one) call', (done) => {
            let itemId = '202cb962ac59075b964b07152d234b70';

            server
                .get('/' + itemId)
                .expect(200, (err: Error, res: any) => {
                    expect(res.body.method).to.equal('GET');
                    expect(res.body.itemId).to.equal(itemId);
                    done();
                });
        });

        it('Should check the PUT one (UPDATE) call', (done) => {
            let itemId = '202cb962ac59075b964b07152d234b70';

            server
                .put('/' + itemId)
                .expect(200, (err: Error, res: any) => {
                    expect(res.body.method).to.equal('PUT');
                    expect(res.body.itemId).to.equal(itemId);
                    done();
                });
        });

        it('Should check the DELETE one (DELETE) call', (done) => {
            let itemId = '202cb962ac59075b964b07152d234b70';
            let httpStatusAccepted = 204;

            server
                .delete('/' + itemId)
                .expect(httpStatusAccepted, (err, res) => {
                    expect(res.status).to.equal(httpStatusAccepted);
                    done();
                });
        });
    });

});