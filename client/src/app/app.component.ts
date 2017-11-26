import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {environment} from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private translate: TranslateService) {

        let hasTranslation: boolean;

        translate.addLangs(environment.languages);

        hasTranslation = translate.getLangs().indexOf(translate.getBrowserLang()) !== -1;

        if (hasTranslation) {
            translate.use(this.translate.getBrowserLang());
        }else{
            translate.setDefaultLang(translate.getLangs().shift());
        }

    }
}
