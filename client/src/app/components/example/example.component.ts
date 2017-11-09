import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ExampleService} from "../../services/example.service";

@Component({
    selector: 'app-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ExampleComponent implements OnInit {

    constructor(private exampleService: ExampleService) {
    }

    ngOnInit() {
        this.exampleService.fetchAll();
    }

}
