import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ExampleDataInterface} from "../../../../../shared/interfaces/example-data.interface";
import {TranslateService} from "@ngx-translate/core";
import {ExampleService} from "../../services/example.service";
import {ExampleModel} from "../../../../../server/src/models/example.model";

@Component({
    selector: 'app-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ExampleComponent implements OnInit {

    public examples: ExampleModel[] = [];
    public model: ExampleModel;
    public editing: boolean = false;
    public details: boolean = false;

    constructor(private exampleService: ExampleService, private translate: TranslateService) {
    }

    ngOnInit() {
        this.fetchAll();
    }

    public createNewItem() {
        this.model = new ExampleModel({});
    }

    public create() {
        if (!this.model) {
            this.model = new ExampleModel({});
        } else {
            this
                .exampleService
                .create(this.model)
                .subscribe((createSuccessful: boolean) => {
                    if (createSuccessful) {
                        delete this.model;
                        this.fetchAll();
                    }
                });
        }
    }

    public reset() {
        delete this.model;
    }

    public edit(model: ExampleModel) {
        this.editing = true;
        this.model = model;
    }

    public update() {
        this
            .exampleService
            .update(this.model)
            .subscribe(() => {
                delete this.model;
                this.editing = false;
                this.fetchAll();
            });
    }

    public fetchAll() {

        this.examples = [];

        this
            .exampleService
            .fetchAll()
            .subscribe((examples: ExampleDataInterface[]) => {
                examples.forEach((example: ExampleDataInterface) => {
                    this.examples.push(new ExampleModel(example));
                });
            });
    }

    // public fetchOne(id: string) {
    //     this
    //         .exampleService
    //         .fetchOne(id)
    //         .subscribe((example: ExampleDataInterface) => this.examples = [example]);
    //
    // }

    public remove(id: string) {
        this
            .exampleService
            .remove(id)
            .subscribe((result) => {
                this.fetchAll();
                delete this.model;
            });
    }
}
