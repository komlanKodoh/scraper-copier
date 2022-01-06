# Welcome 
Scraper copier is a Command Line Interface (CLI) that replicate remote domain to local folder structure. Given a root URL, it find and scrap website to retrieve all valuable public files.

## Instalation 
The Installation of  **scraper copier** can be completed by following the following steps.

 1. Clone repository from github and cd into the repository
```bash
git clone https://github.com/Behemoth11/scraper-copier.git && 
cd scraper-copier
```
2.  Install dependencies 
```bash
npm install
```

At that point, you should be able to run the node script located in the **dist** flolder.
```bash
node ./dist/index.js
```

## Passing argument to process

Argument can be passed to the node process as you would for any other CLI.
```bash
node ./dist/index.js --help 
```

## Adding scraper to path 
You may want to add the markdown file to your path variable. Luckily, this can be quite easily achived. 

1. Change file permission.
```bash
chmod +x ./dist/index.js
```
2. Link the project 
```bash
npm link
```
The program can now be accessed under the name scraper.

```bash
scraper --help
```

#### *  Change path binary name

Open the package.json in the root of the the project and change the key associated to binary to the diserd name.
```json
{
  "bin": {
    "NAME_OF_BINARY": "./dist/index.js"
  },
  /*...*/  
}
```
replace **NAME_OF_BINARY** by desired bin name. 
Then, link the project again.

## Basic Usage

Use the following command to copy the url located on domain to local folder in dest. Files will be saved under their respective domain name. 
```
node ./dist/index.js load <url> [dest]
```
eg: 
```bash
node ./dist/index.js load https://komlankodoh.com .
```
The command above load pages from **komlankodoh.com** to the active folder designed by **.**