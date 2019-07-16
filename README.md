# frontend-bitrix with bootstrap-sass
for fast frontend-develop on bitrix<br>
<b>development template should be in "local"</b>

<h3>1. Place the files in the root</h3>
<h3>2. You need execute several commands:</h3>

Installation
============

Prerequisites
-------------

### Unix
1. npm
2. bower (npm install -g bower)

### Windows
1. git for windows (including gitBash) https://github.com/git-for-windows/git/releases/tag/v2.12.2.windows.2
2. npm (from node.js package) https://nodejs.org/en/download/
3. bower (npm install -g bower)

Install
-------
1. Install nodejs. https://nodejs.org/en/
2. Check npm (node package manager) is installed via command prompt:
```bash
$ npm
```
3. Global install gulp on computer:
```bash
$ npm install gulp --global
```
4. Copying 'gulpfile.js' and 'package.json' into folder with project
5. Initialize project:
```bash
$ npm init
```
6. Installing Gulp locally into project folder:
```bash
$ npm install gulp --save-dev
```
## If we have Error: gulp.hasTask is not a function

For anyone that's wondering, I found that there was a breaking change that was introduced in Gulp version 4.0. To fix this, I did the following:

```bash
$ npm install --save-dev gulp@3.9.1
```
### clone repository

```bash
$ git clone ssh://git@github.com:slaus/bitrix-frontend.git
```

You may also clone this using https:

```bash
$ git clone https://github.com/slaus/bitrix-frontend.git
```

# switch directory to the bitrix-frontend folder
```bash
$ cd bitrix-frontend/
```

### switch branch to develop
```bash
$ git checkout your_name_as_developer
```

### install npm libraries

```bash
$ npm install
```

### install bower libraries

```bash
$ bower install
```

### Run Gulp:

```bash
$ gulp default
```

This will start local server on http://localhost:3000/ with file watcher and all required tools to handle *.scss changes/build

