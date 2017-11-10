import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ExampleService} from "../../services/example.service";
import {ExampleDataInterface} from "../../../../../shared/interfaces/example-data.interface";

@Component({
    selector: 'app-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ExampleComponent implements OnInit {

    public examples: ExampleDataInterface[];

    constructor(private exampleService: ExampleService) {
    }

    ngOnInit() {
        this.fetchAll();
    }

    public create(event: any) {

        console.log(event);

        this.exampleService.create({
            id: 'sdfdsf',
            name: 'dfdsfdsds',
            description: 'sdasdasda'
        }).subscribe((createSuccessful: boolean) => {
            if (createSuccessful) {
                this.fetchAll();
            }
        });
    }

    public update(example: ExampleDataInterface) {
        this.exampleService.update(example).subscribe((result) => {
            console.log(result);
        });
    }


    public fetchAll() {
        this
            .exampleService
            .fetchAll()
            .subscribe((examples: ExampleDataInterface[]) => this.examples = examples);
    }


    public fetchOne(id: string) {
        this
            .exampleService
            .fetchOne(id)
            .subscribe((example: ExampleDataInterface) => this.examples = [example]);

    }

    public remove(id: string) {
        this.exampleService.remove(id).subscribe((result) => {
            console.log(result);
        });
    }
}
