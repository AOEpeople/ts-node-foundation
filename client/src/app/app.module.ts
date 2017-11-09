// MODULES
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

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
        HttpClientModule
    ],
    providers: [ExampleService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
