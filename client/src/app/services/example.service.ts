import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environment';
import {ExampleDataInterface} from "../../../../shared/interfaces/example-data.interface";
import {Observable} from "rxjs/Observable";
import {ExampleModel} from "../../../../server/src/models/example.model";
import {Subscription} from "rxjs/Subscription";
@Injectable()
export class ExampleService {

    constructor(private _httpClient: HttpClient) {
    }

    public create(example: ExampleDataInterface) {
        return this._httpClient.post(environment.api + '/example', example);
    }

    // ExampleDataInterface[] how to get this interface being ok for HTTP response
    public fetchAll(): Observable<ExampleModel[]> {
        return this._httpClient.get<ExampleModel[]>(environment.api + '/example');
    }

    public fetchOne(id: string) {
        return this._httpClient.get<ExampleModel>(environment.api + '/example/' + id);
    }

    public update(updatedExample: ExampleDataInterface) {
        return this._httpClient.put(environment.api + '/example/' + updatedExample.id, updatedExample);
    }

    public remove(id: string) {
        return this._httpClient.delete(environment.api + '/example/' + id);
    }
}
