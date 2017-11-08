import {BaseController} from "../classes/base/base-controller";
import {ExampleRepository} from "../repositories/example.repository";

export class ExampleController extends BaseController {
    protected _endpoint: string = '/example';
    protected _repository = new ExampleRepository();
}