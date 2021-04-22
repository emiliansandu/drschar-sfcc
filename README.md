# Advanced Rx Storefront

This Advanced Rx Storefront Storefront

This is a repository for the Storefront Reference Architecture reference application.

Storefront Reference Architecture has a base cartridge (`app_storefront_base`) provided by Commerce Cloud that is never directly customized or edited. Instead, customization cartridges are layered on top of the base cartridge. This change is intended to allow for easier adoption of new features and bug fixes.
Storefront Reference Architecture supplies an [plugin_applepay](https://github.com/SalesforceCommerceCloud/plugin-applepay) plugin cartridge to demonstrate how to layer customizations for the reference application.

Your feedback on the ease-of-use and limitations of this new architecture is invaluable during the developer preview. Particularly, feedback on any issues you encounter or workarounds you develop for efficiently customizing the base cartridge without editing it directly.


# The latest version

The latest version of SFRA is 5.1.0

# Setup environment for new project.

## Download and install dependencies

* Clone this repository.
* Install node (if not installed already).
* Install sgmf-scripts globally `npm install -g sgmf-scripts`.
* Install dependencies by running `npm install`.
* Install dependencies inside build-suite folder by running
    * `npm rebuild node-sass`
    * `npm install`

 
## Use build suite for development

* Go to `../build-suite folder`
* Copy `build/advanced-rx-new.json` to `build/advanced-rx-local.json` and `update` connection params
* Now you can run the following commands:
    * Deploy code: `grunt dist --project=advanced-rx-local`
    * Run build before each import: `grunt build --project=advanced-rx-local`
    * Import all: `grunt importSite --project=advanced-rx-local`
        * Import site configuration: `grunt initSite --project=advanced-rx-local`
        * Import Demo Data: `grunt initDemoSite --project=advanced-rx-local`
    * Reindex: `grunt triggerReindex --project=advanced-rx-local`

## Sync sandbox without build

* Inside this project folder, copy dw.json.example to dw.json and update connection parameters
* Install VS Prophet uploader
* Run command `npm run watch:compile` to watch and compile files (When modifying js or scss files)



# NPM scripts
Use the provided NPM scripts to compile and upload changes to your Sandbox.

## Compiling your application

* `npm run compile:scss` - Compiles all .scss files into CSS.
* `npm run compile:js` - Compiles all .js files and aggregates them.
* `npm run compile:fonts` - Copies all needed font files. Usually, this only has to be run once.

 If you are having an issue compiling scss files, try running 'npm rebuild node-sass' from within your local repo.

## Linting your code

`npm run lint` - Execute linting for all JavaScript and SCSS files in the project. You should run this command before committing your code.

## Watching for changes and uploading

`npm run watch` - Watches everything and recompiles (if necessary) and uploads to the sandbox. Requires a valid `dw.json` file at the root that is configured for the sandbox to upload.

## Uploading

`npm run uploadCartridge` - Will upload `app_storefront_base`, `modules` and `bm_app_storefront_base` to the server. Requires a valid `dw.json` file at the root that is configured for the sandbox to upload.

`npm run upload <filepath>` - Will upload a given file to the server. Requires a valid `dw.json` file.

# Testing
## Running unit tests

You can run `npm test` to execute all unit tests in the project. Run `npm run cover` to get coverage information. Coverage will be available in `coverage` folder under root directory.

* UNIT test code coverage:
1. Open a terminal and navigate to the root directory of the mfsg repository.
2. Enter the command: `npm run cover`.
3. Examine the report that is generated. For example: `Writing coverage reports at [/Users/yourusername/SCC/sfra/coverage]`
3. Navigate to this directory on your local machine, open up the index.html file. This file contains a detailed report.

## Running integration tests
Integration tests are located in the `storefront-reference-architecture/test/integration` directory.

To run integration tests you can use the following command:

```
npm run test:integration
```

**Note:** Please note that short form of this command will try to locate URL of your sandbox by reading `dw.json` file in the root directory of your project. If you don't have `dw.json` file, integration tests will fail.
sample `dw.json` file (this file needs to be in the root of your project)
{
    "hostname": "devxx-sitegenesis-dw.demandware.net"
}

You can also supply URL of the sandbox on the command line:

```
npm run test:integration -- --baseUrl devxx-sitegenesis-dw.demandware.net
```

# [Contributing to SFRA](./CONTRIBUTING.md)

#Page Designer Components for Storefront Reference Architecture
See: [Page Designer Components](./page-designer-components.md)
