import {App} from './app';
import {readFile, exists} from "fs";

let configPath: string = __dirname + '/config/config.' + (process.env.NODE_ENV || 'development') + '.json';


exists(configPath, (exists: boolean): void => {
    if (exists) {

        readFile(configPath, {encoding: 'utf-8'}, (error: Error, content: string) => {
            if (!error) {
                new App(JSON.parse(content));
            } else {
                throw error;
            }
        });

    } else {
        throw new Error('Missing configuration file at (' + configPath + ')');
    }
});
