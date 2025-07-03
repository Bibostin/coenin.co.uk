# coenin.co.uk

Git repository for the maintainance of the public parts of my website 
[coenin.co.uk](https://www.coenin.co.uk)

## Setup
- ensure you have a node version > 6 `node -v` 
- and that npm is installed `npm -v`
- run `npm install` to fetch the required build dependencies

## Develop
examine `./src/_includes/templates` for a better understanding of the site layout.
- run `npm start` to proxy run `npx eleventy --serve --watch --incremental`
- The site will become availible on localhost:8080
- any changes will be built while eleventy is live and reflected after a page refresh.

## Deploy
run `npm start` or `npx eleventy` to build the output dir `./dest/`
copy `./dest` to your desired webserver web root :) 
