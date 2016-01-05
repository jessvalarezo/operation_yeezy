var links = [];
var searchQuery = "";
var casper = require('casper').create();

function getLinks() {

    var links = document.querySelectorAll('h3.r a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
}

casper.start('http://google.com/', function() {
    // search for 'casperjs' from google form
    this.echo("Casper CLI passed args:");
    require("utils").dump(this.cli.args);
    searchQuery = this.cli.get(0);
    this.echo(searchQuery);
    this.fill('form[action="/search"]', { q: searchQuery}, true);
});

casper.then(function() {
    // aggregate results for search
    links = this.evaluate(getLinks);
});

casper.run(function() {
    // echo results in some pretty fashion
    this.echo(links.length + ' links found:');
    this.echo(' - ' + links.join('\n - ')).exit();
});
