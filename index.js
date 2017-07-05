#!/usr/bin/env node

var readline = require('linebyline');
var wdio = require('wdio');
var selenium = require('selenium-standalone');
var chalk = require('chalk');
var meow = require('meow');
var inquirer = require('inquirer');
var includes = require('lodash.includes');

// init variable
var user = {};
var freeInMultipleLangage = [
  'Gratuit',
  'Free',
  'Kostenlos',
  'Gratuito',
  'Gratis',
  '無料',
  '무료',
  'Bezpłatny',
  'Бесплатно',
  'Ücretsiz',
  '免费',
  '免費',
];
var options = {
  desiredCapabilities: {
    browserName: 'chrome',
  },
};
var browser = wdio.getBrowser(options);
var listUrlCoupon = [];
var prompt = [{
    type: 'input',
    message: 'Email ? ',
    name: 'email',
  }, {
    type: 'password',
    message: 'Password ? ',
    name: 'password',
  },
  {
    type: 'input',
    message: 'Filename',
    name: 'filename',
  },
];

// for --help
meow(`
    Usage
	  $ add-free-course-udemy
`);

console.log(chalk.blue('Enter your information : '));
inquirer.prompt(prompt).then(function (answers) {
  user = answers;
  start();
});

function start() {
  readCoupon();
  // init selenium server
  selenium.start(function (err) {
    if (err) {
      console.log(chalk.red(err));
      return;
    }
    // init browser
    wdio.run(initAddCoupon, function (err) {
      if (err) {
        console.log(chalk.red(err));
      }
      browser.end();
      process.exit();
    });
  });
}

function initAddCoupon() {
  console.log(chalk.green('begin program!'));
  browser.init();
  browser.setViewportSize({ width: 1366, height: 768 });
  browser.url('https://www.udemy.com');

  browser.click('.dropdown--login');
  // wait input login
  while (!browser.isVisible('.emailinput')) {
    browser.pause(500);
  }
  // login
  browser.addValue('.emailinput', user.email);
  browser.addValue('.textinput', user.password);
  // wait for safety
  browser.pause(2000);
  browser.click('.submit-row .btn-primary');
  browser.pause(2000);
  iterate();
}

/**
 * for each link, add course on account if course is free
 */
function iterate() {
  console.log(chalk.blue(`begin with ${listUrlCoupon.length} urls`));
  while (listUrlCoupon.length > 0) {
    var urlCoupon = listUrlCoupon.pop();
    console.log(`current Url : ${urlCoupon}`);
    browser.url(urlCoupon);
    browser.pause(2500);
    // if course already buy
    if (browser.isVisible('.course-cta--buy')) {
      // if course is free
      var textPrice = browser.getText('.price-text__current') || '';
      textPrice = textPrice.trim();
      try {
        textPrice = /[^\s]+$/.exec(textPrice)[0];
      } catch (err) {
        console.log(chalk.red(err));
      }
      if (includes(freeInMultipleLangage, textPrice)) {
        browser.click('.course-cta--buy');
        // wait end buy
        while (browser.getUrl() === urlCoupon) {
          browser.pause(500);
        }
        // wait for safety
        browser.pause(2500);
      }
    }
  }
  // end of program
  console.log(chalk.green('End of program, all url used!'));
}

// read all url in file
function readCoupon() {
  var rl = readline(`./${user.filename}`);
  rl.on('line', function (line, lineCount, byteCount) {
    listUrlCoupon.push(line);
  }).on('error', function (e) {
    console.error(chalk.red(e));
    process.exit();
  });
}
