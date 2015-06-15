var url = 'https://www.dmv.ca.gov/foa/clear.do?goTo=driveTest',
  jquery = 'http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js';



var Q = require('q');
var page = require('webpage').create();
/*
   page.open(url, function() {
   page.render('image.png');
   phantom.exit();
   });
   */

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

var evaluatePage = function (page) {
  var deferred = Q.defer();
  page.evaluate(deferred.resolve);
  return deferred.promise;
};

var screenCapture = function (page) {
  var deferred = Q.defer();
  page.render('image.png');
  return deferred.promise;
};

openPage(page, url).then(function() {
  includeJs(page);
  evaluatePage(function() {
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
    document.querySelector("input[name='requestedTask'][value='DT']:checked");
    $("button[type=submit]").click();
  });
  screenCapture(page);
  phantom.exit();
});







