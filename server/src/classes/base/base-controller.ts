import * as express from "express";
import * as Promise from "bluebird";
import {BaseRepository} from "./base-repository";
import {BaseModel} from "./base-model";
import {RepositoryInterface} from "../../interfaces/repository.interface";

export abstract class BaseController {

    constructor(protected _router: express.Router) {

    }

    protected abstract _endpoint: string;
    protected abstract _repository: RepositoryInterface;

    public registerEndpoints() {

        this._router.post(this._endpoint, (req: express.Request, res: express.Response): void => {
            this
                ._create(req.body)
                .then((result: any) => res.json(result))
                .catch((error) => {
                    res.json(error.message);
                });
        });

        this._router.get(this._endpoint, (req: express.Request, res: express.Response): void => {
            this
                ._fetchAll()
                .then((result: any) => res.json(result))
                .catch((error) => {
                    res.json(error.message);
                });
        });

        this._router.get(this._endpoint + '/:id', (req: express.Request, res: express.Response): void => {
            this
                ._fetch(req.params.id)
                .then((result: any) => res.json(result))
                .catch((error) => {
                    res.json(error.message);
                });
        });

        this._router.put(this._endpoint + '/:id', (req: express.Request, res: express.Response): void => {
            this
                ._update(req.params.id, req.body)
                .then((result: any) => res.json(result))
                .catch((error) => {
                    res.json(error.message);
                });
        });

        this._router.delete(this._endpoint + '/:id', (req: express.Request, res: express.Response): void => {
            this
                ._remove(req.params.id)
                .then((result: any) => res.json(result))
                .catch((error) => {
                    res.json(error.message);
                });
        });
    }

    protected _create(payload: any): Promise<any> {
        return this._repository.create(payload);
    }

    protected _fetchAll(): Promise<any> {
        return this._repository.fetchAll()
    }

    protected _fetch(id: string): Promise<any> {
        return this._repository.fetch(id)
    }

    protected _update(id: string, payload: any): Promise<any> {
        return this._repository.update(id, payload);
    }

    protected _remove(id: string): Promise<any> {
        return this._repository.remove(id);
    }
}