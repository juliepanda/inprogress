var Q = require('q');
var secrets = require('./secrets.js');

var jquery = 'http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js';


// PhantomJS operations steps in promises
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
  // package secret params in an object
  var args = {
    location:   secrets.getLocation().santa_clara,
    firstName:  secrets.getName().firstName,
    lastName:   secrets.getName().lastName,
    DLNumber:   secrets.getDLNumber(),
    bdayMonth:  secrets.getBirthday().month,
    bdayDay:    secrets.getBirthday().day,
    bdayYear:   secrets.getBirthday().year,
    phoneAreaCode: secrets.getPhoneNumber().areaCode,
    phonePrefix:  secrets.getPhoneNumber().prefix,
    phoneSuffix:  secrets.getPhoneNumber().suffix
  };
  page.evaluate( function( args ) {
    // unpack params
    var SANTA_CLARA = args.location,
      FIRST_NAME = args.firstName,
      LAST_NAME = args.lastName,
      DL_NUMBER = args.DLNumber,
      B_MONTH = args.bdayMonth,
      B_DAY = args.bdayDay,
      B_YEAR = args.bdayYear,
      TEL_AREA = args.phoneAreaCode,
      TEL_PREFIX = args.phonePrefix,
      TEL_SUFFIX = args.phoneSuffix;

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
  }, args);
  return deferred.promise;
};

var clickSubmit = function (page) {
  var deferred = Q.defer();
  page.evaluate( function() {
    document.querySelector("input[value='Submit']").click();
  });
};

var checkDate = function (page) {
  var deferred = Q.defer();
  var ret = page.evaluate( function() {
    return document.querySelector("p[class='alert']").innerText;
  });
  deferred.resolve = ret;
  return deferred.promise;
};

var screenCapture = function (page) {
  var deferred = Q.defer();
  page.render('image.png');
  return deferred.promise;
};


// run it!
var page = require('webpage').create();
var url = 'https://www.dmv.ca.gov/foa/clear.do?goTo=driveTest';

openPage(page, url)
.then( function() {
  includeJS(page);
})
.then( function() {
  fillFields(page);
})
.then( function() {
  setTimeout(function() {
    clickSubmit(page);
    screenCapture(page);
  }, 5000);
})
.then( function() {
  phantom.exit();
});







