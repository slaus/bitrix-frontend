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
### open terminal (for Windows users gitBash)
### change directory to your dev folder
 
```bash
$ cd /path/to/your/dev/folder
```

### clone repository

```bash
$ git clone ssh://git@github.com:slaus/bitrix-frontend.git
```

You may also clone this using https:

```bash
$ git clone https://github.com/slaus/bitrix-frontend.git
```

# switch directory to the mobile-app-www
```bash
$ cd bitrix-frontend/
```

### switch branch to develop
```bash
$ git checkout name_developer
```

### install npm libraries

```bash
$ npm install
```

### install bower libraries

```bash
$ bower install
```

### build and start

```bash
$ gulp
```

This will start local server on http://localhost:3000/ with file watcher and all required tools to handle *.scss changes/build
