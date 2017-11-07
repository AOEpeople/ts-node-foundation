import {App} from './app';
import {readFile} from "fs";

let configPath: string = __dirname + '/config/config.' + (process.env.NODE_ENV || 'development') + '.json';


readFile(configPath, {encoding: 'utf-8'}, (error: Error, content: string) => {
    if (!error) {
        new App(JSON.parse(content));
    } else {
        throw error;
    }
});

