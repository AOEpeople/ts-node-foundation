import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environment';

@Injectable()
export class ExampleService {

    constructor(private _httpClient: HttpClient) {

    }

    public fetchAll() {
        alert(environment.api);
        return this._httpClient
            .get(environment.api+'/example')
            .subscribe((response) => {
                console.log(response);
            });
    }

}
