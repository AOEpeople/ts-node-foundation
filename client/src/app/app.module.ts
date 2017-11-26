// MODULES
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from "./factories/translate-http-loader";

// SERVICES
import {ExampleService} from './services/example.service';

// COMPONENTS
import {AppComponent} from './app.component';
import {ExampleComponent} from './components/example/example.component';

@NgModule({
    declarations: [
        AppComponent,
        ExampleComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
            }
        })
    ],
    providers: [ExampleService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
