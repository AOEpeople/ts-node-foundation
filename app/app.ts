import * as express from "express";
import {createServer, Server} from "http";
import * as debug from "debug";

export class App {

    public config: any;
    public app: express.Application;
    public server: Server;
    public router: express.Router;

    public log = debug('app:log');

    constructor(config: any) {

        this.app = express();
        this.config = config;
        this.server = createServer(this.app);
        this.router = express.Router();

        this.log.log = console.log.bind(console);

        this._routes();

        this._run();
    }

    private _routes() {


        // CREATE
        this
            .router
            .post('/', (req: express.Request, res: express.Response): void => {
                res.json({method: req.method});
            });


        // READ (ALL)
        this
            .router
            .get('/', (req: express.Request, res: express.Response): void => {
                res.json({method: req.method});
            });


        // READ (ONE)
        this
            .router
            .get('/:id', (req: express.Request, res: express.Response): void => {
                res.json({method: req.method, itemId: req.params.id});
            });


        // UPDATE
        this
            .router
            .put('/:id', (req: express.Request, res: express.Response): void => {
                res.json({method: req.method, itemId: req.params.id});
            });


        // DELETE
        this
            .router
            .delete('/:id', (req: express.Request, res: express.Response): void => {
                res.sendStatus(204);
            });

        this.app.use(this.router);
    }

    private _run() {
        this.log.log('Server started on port ' + this.config.server.port);

        this.server.listen(this.config.server.port);
    }
}