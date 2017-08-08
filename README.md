# ts-node-foundation blueprint #

A basic micro service blueprint written in TypeScript and transpiled on the fly for the node.js runtime. Also unit tests and coverage reports are enabled to keep quality and angibility transparency as high as possible.

**Contains out of the box (pre)configured**

- On the fly transpiled TypeScript using [ts-node](https://github.com/TypeStrong/ts-node)
- UnitTests using [mocha](https://mochajs.org/) and [chai](http://chaijs.com/)
- Coverage reports using [istanbul](https://istanbul.js.org/)
- Preconfigured [express.js](http://expressjs.com/)
- Coverage highlighting in Webstorm / PHPStorm / IntelliJ with less configuration
- Production optimized run script (without entire type checking during transpile process)

### Installation ###

    # clone the repository:
    git clone https://github.com/AOEPeople/ts-node-foundation
    
    # enter folder
    cd ts-node-foundation
    
    # and resolve npm dependencies
    npm install
    
    ### DONE
    
Once the installation is completed the tests are executed to verify everything is working well (npm postinstall).


### Configuration ###

Apply production settings in according config file.
Actually it's only the server port but extend wherever additions are needed and keep in sync with testing and development files.

**File**
   
    app/config/config.production.json
    
**Contents:**  
   
    {
      "server": {
        "port": 8080
      }
    }

### NPM run scripts ###

Developing, QA (unit tests and coverage report) and production scripts are listed in package.json.file 
 
 | Script        | Call                | Description                                                                                              |
 |---------------|---------------------|----------------------------------------------------------------------------------------------------------|
 | **start**     | ``npm start``       | Starts the app in production mode (NODE_ENV=production) with disabled type checking for faster app start |
 | **develop**   | ``npm run develop`` | Runs the app in development mode with file change watchers (nodemon)                                     |
 | **test**      | ``npm run test``    | Execute all unit tests                                                                                   |   
 | **cover**     | ``npm run cover``   | Execute all unit tests and write a coverage report (HTML/JSON)                                           |
 
 
### Debugging and Analytics ###
 
 The ``npm run develop`` script contains built in debugging support via *$NODE_DEBUG_OPTION* when the script is called in debug mode.

 ![Example for a breakpoint in a debugging session](http://i.imgur.com/pU0H918.png)
 

### IDE coverage highlighting ###
  
 Create a run configuration within your IDE:
 
    Edit Configurations -> +(Add) -> Mocha
 
 Then paste line below into *Extra mocha options* and select *File Patterns* option.
 
    -r ts-node/register app/**/*.spec.ts app/*.spec.ts

![Coverage highlighting setup](http://i.imgur.com/LVVrWK9.png)

Finally the un/covered code will be highlighted like in the image below after running the tests with coverage

![Example of coverage highlighted code ](http://i.imgur.com/8rnsgPi.png)
 