# ts-node-foundation blueprint #

A basic micro service blueprint written in TypeScript and transpiled on the fly for the node.js runtime.
Unit tests, coverage reports and debugging is supported out of the box by yarn scripts and as config 
inside e.g. IntelliJ Idea.

**Contains out of the box (pre)configured**

- On the fly transpiled TypeScript using [ts-node](https://github.com/TypeStrong/ts-node)
- UnitTests using [mocha](https://mochajs.org/) and [chai](http://chaijs.com/)
- Coverage reports using [istanbul](https://istanbul.js.org/)
- **Preconfigured [express.js](http://expressjs.com/) using:**
- - [BodyParser midleware](https://github.com/expressjs/body-parser)
- Coverage highlighting in Webstorm / PHPStorm / IntelliJ with pretty less configuration
- Production optimized run script (without entire type checking during transpiling process)

### Installation ###

    git clone https://github.com/AOEPeople/ts-node-foundation
    cd ts-node-foundation
    yarn install
    
Once installation is completed all tests are executed.


### Configuration ###

Apply development and production settings in according config file.
Actually it's only the server port but extend wherever additions are needed and keep in sync with testing and development files.

**File**
   
    server/config/config.production.json
    
**Contents:**  
   
    {
      "server": {
        "port": 8080
      }
    },
    "controllers": [
       "ExampleController"
    ],
    "states":["statename"]

### NPM run scripts ###

Developing, QA (unit tests and coverage report) and production scripts are listed in package.json.file 
 
 | Script        | Call                 | Description                                                                                              |
 |---------------|----------------------|----------------------------------------------------------------------------------------------------------|
 | **start**     | ``yarn start``       | Starts the app in production mode (NODE_ENV=production) with disabled type checking for faster app start |
 | **develop**   | ``yarn develop``     | Runs the app in development mode with file change watchers (nodemon)                                     |
 | **test**      | ``yarn test``        | Execute all unit tests                                                                                   |   
 | **cover**     | ``yarn cover``       | Execute all unit tests and write a coverage report (HTML/JSON)                                           |
 
 
### Debugging and Analytics ###
 
 The ``yarn run develop`` script contains built in debugging support via *$NODE_DEBUG_OPTION* when the script is called in debug mode.

 ![Example for a breakpoint in a debugging session](http://i.imgur.com/pU0H918.png)
 

### IDE coverage highlighting ###
  
 Create a run configuration within your IDE:
 
    Edit Configurations -> +(Add) -> Mocha
 
 Then paste line below into *Extra mocha options* and select *File Patterns* option.
 
    -r ts-node/register server/**/*.spec.ts  server/**/**/*.spec.ts server/*.spec.ts

**Example:**
![Coverage highlighting setup](http://i.imgur.com/LVVrWK9.png)

**Finally the un/covered code will be highlighted:**

![Example of coverage highlighted code ](http://i.imgur.com/8rnsgPi.png)