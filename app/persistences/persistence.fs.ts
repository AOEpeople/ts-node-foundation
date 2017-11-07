import * as Promise from "bluebird";
import {createHash} from "crypto";
import {createReadStream, createWriteStream, readdir, ReadStream, WriteStream, unlink, stat} from "fs";
import {BasePersistence} from "../classes/base/base-persistence";
import {ModelInterface} from "../interfaces/model.interface";

export class PersistenceFs extends BasePersistence {

    constructor(private _targetDir: string) {
        super();
    }

    protected _create(model: ModelInterface): Promise<boolean> {
        return new Promise((resolve: any) => {
            let modelData = model.toJSON();
            let fileName = modelData.id || this._getHashString(JSON.stringify(modelData));

            delete modelData.id;

            let writeStream: WriteStream = createWriteStream(
                this._targetDir + '/' + fileName,
                {encoding: 'utf-8'});

            writeStream.on('finish', () => {
                resolve(true);
            });

            writeStream.write(JSON.stringify(modelData));
            writeStream.end();
        });
    }

    protected _fetchAll(): Promise<Array<any>> {
        return Promise
            .promisify(readdir)(this._targetDir)
            .then((fileNames) => {

                return Promise.all(fileNames
                    .filter((fileName) => fileName.charAt(0) !== '.')
                    .map((fileName) => {
                        return this._fetch(fileName);
                    }));
            });

    }

    protected _fetch(id: string): Promise<any> {

        // TODO Determine if a file named ID exist in the _targetDir and if so provide it's content (enriched by the id
        return new Promise((resolve: any) => {
            let fileName: string = id,
                chunks: Buffer[] = [];

            Promise
                .promisify(stat)(this._targetDir + '/' + fileName)
                .then((fileExists) => {
                    if (!fileExists) {
                        return false;
                    } else {
                        let readStream: ReadStream = createReadStream(this._targetDir + '/' + fileName);

                        readStream
                            .on('data', chunk => {
                                chunks.push(chunk);
                            })
                            .on('close', () => {
                                let modelData = JSON.parse(Buffer.concat(chunks).toString('utf-8'));
                                modelData.id = id;
                                resolve(modelData);
                            });
                    }
                })

                .catch((error) => {
                    resolve(null);
                });
        });
    }

    protected _update(id: string, model: ModelInterface): Promise<boolean> {
        return new Promise((resolve) => {
            this
                ._fetch(id)
                .then((storageItem) => {
                    // TODO iterate modelData and map only properties which are inside the existing model
                    if (!storageItem) {
                        resolve(false);
                    }

                    let fileName = id;
                    let updateData = model.toJSON();
                    delete updateData.id;

                    let writeStream: WriteStream = createWriteStream(
                        this._targetDir + '/' + fileName,
                        {encoding: 'utf-8'});

                    writeStream.on('finish', () => {
                        resolve(true);
                    });

                    writeStream.write(JSON.stringify(updateData));
                    writeStream.end();
                });
        });
    }

    protected _remove(id: string): Promise<boolean> {
        return new Promise((resolve) => {

            Promise
                .promisify(stat)(this._targetDir + '/' + id)
                .then((fileExists) => {
                    unlink(this._targetDir + '/' + id, (error) => {
                        resolve((error === null));
                    });
                })
                .catch((error) => {
                    resolve(false);
                });
        });

    }

    private _getHashString(inputString: string): string {
        return createHash('sha256').update(inputString).digest('hex');
    }
}