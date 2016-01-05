var links = [];
var url = "http://store.nike.com/us/en_us/pd/flyknit-air-max-running-shoe/pid-10338899/pgid-808858";
var casper = require('casper').create(
{
    verbose : true,
    logLevel: 'debug',
});

casper.start(url, function (response) {
     console.log("casper started");
     require("utils").dump(response.status);
     if (response == undefined || response.status >= 400) this.echo("failed");
     this.capture('screen.png');
 });

casper.then(function() {
    this.echo(this.getTitle());
    this.echo('Current location is ' + this.getCurrentUrl(), 'info');
})

casper.then(function() {
    this.evaluate(function() {
    $('#select_element_selector').val('7.5').change();
});

})
casper.run(function() {
  casper.exit();
});
