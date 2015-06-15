//var url = 'https://www.dmv.ca.gov/foa/clear.do?goTo=driveTest/';
var casper = require('casper').create();
var url = 'https://www.dmv.ca.gov/portal/dmv/detail/portal/foa/welcome';
casper.start(url, function() {
    this.echo(this.getTitle());
    this.capture('image.png', {
      top: 100,
      left: 100,
      width: 500,
      height: 400
    });
});

casper.thenOpen('http://phantomjs.org', function() {
    this.echo(this.getTitle());
    this.capture('image.png', {
      top: 100,
      left: 100,
      width: 500,
      height: 400
    });
});

casper.run();
