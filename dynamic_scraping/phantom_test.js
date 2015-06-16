var url = 'https://www.dmv.ca.gov/foa/clear.do?goTo=driveTest',
  jquery = 'http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js';

var Q = require('q');

var openPage = function (page, url) {
  var deferred = Q.defer();
  page.open(url, deferred.resolve);
  return deferred.promise;
};

var includeJS = function (page) {
  var deferred = Q.defer();
  page.includeJs(jquery, deferred.resolve);
  return deferred.promise;
};

var fillFields = function (page) {
  var deferred = Q.defer();
  page.evaluate( function() {
    /*
     * declare VARIABLES here, don't ask my why I couldn't do it outside..i'll fig it out later
     * */

    document.querySelector("select#officeId").value = SANTA_CLARA;
    document.querySelector("input[name='firstName']").value = FIRST_NAME;
    document.querySelector("input[name='lastName']").value = LAST_NAME;
    document.querySelector("input[name='dlNumber']").value = DL_NUMBER;
    document.querySelector("input[name='birthMonth']").value = B_MONTH;
    document.querySelector("input[name='birthDay']").value = B_DAY;
    document.querySelector("input[name='birthYear']").value = B_YEAR;
    document.querySelector("input[name='telArea']").value = TEL_AREA;
    document.querySelector("input[name='telPrefix']").value = TEL_PREFIX;
    document.querySelector("input[name='telSuffix']").value = TEL_SUFFIX;
    document.querySelector("input[name='requestedTask'][value='DT']").click();
  });
  return deferred.promise;
};

var clickSubmit = function (page) {
  var deferred = Q.defer();
  page.evaluate( function () {
    document.querySelector("input[value='Submit']").click();
    console.log('cool');
  });
};

var screenCapture = function (page) {
  var deferred = Q.defer();
  page.render('image.png');
  return deferred.promise;
};

var page = require('webpage').create();

openPage(page, url)
.then( function() {
  includeJS(page);
  console.log('BIG POO'); // step 1
})
.then( function() {
  console.log('middling poo'); // step 2
  fillFields(page);
})
.then( function() {
  console.log('another middling poo'); // step 3
  clickSubmit(page);
})
.then( function() {
  console.log('poo'); // step 4
  setTimeout(function() {
    screenCapture(page);
    phantom.exit();
  }, 5000);
});







