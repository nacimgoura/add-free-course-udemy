# add-free-course-udemy

[![NPM version](https://img.shields.io/npm/v/add-free-course-udemy.svg)](https://www.npmjs.com/package/add-free-course-udemy)
[![Build Status](https://travis-ci.org/nacimgoura/add-free-course-udemy.svg?branch=master)](https://travis-ci.org/nacimgoura/add-free-course-udemy)
[![built with NodeJS](https://img.shields.io/badge/Built%20with-nodejs-green.svg)](https://www.nodejs.org/)
[![built with Selenium](https://img.shields.io/badge/built%20with-Selenium-red.svg)](https://github.com/SeleniumHQ/selenium)
[![dependances](https://david-dm.org/nacimgoura/add-free-course-udemy.svg)](https://david-dm.org/nacimgoura/add-free-course-udemy)

<img src="https://www.udemy.com/staticx/udemy/images/v5/logo-green.svg" width="250px" align="right">

## add quickly free course on udemy account

I realized this script with nodejs and selenium.
I created this program because I had several free course offered for udemy and I had the laziness to grab them by hand. I wrote all the urls of the free courses in one file. Then I realized this script that reads the file and adds each of the file's courses to my udemy account.
You can see file example in examplefile.txt.

At first, I realized this only for my personal use then I think that it would be cool to share it with others.

## Functionality
 - asks the user for the required information
 - login with email and password
 - read the specified file
 - browse all the links in the file
 - very quickly (few second for each course)
 - If the course is free, it adds it to the udemy account
 - goes to the next if the course is already added or is paying
 - work with udemy into different language
 - compatible with nodejs >= 4

## Install
```
npm install -g add-free-course-udemy
```
If you encounter an error on windows, do :

```
npm install -g windows-build-tools
npm install -g add-free-course-udemy
```

## Usage
Execute this code in the same folder as the file to be read
```
Usage
	$ add-free-course-udemy
```

## License 
MIT © [Nacim Goura](http://nacimgoura.xyz)