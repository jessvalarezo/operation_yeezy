var system = require('system');
var args = system.args;

var steps=[];
var testindex = 0;
var loadInProgress = false;

var page = require('webpage').create();
//page.settings.userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36';
page.settings.javascriptEnabled = true;
//phantom.cookiesEnabled = true;
phantom.javascriptEnabled = true;

console.log('All settings loaded, start with execution');
page.onConsoleMessage = function(msg) {
    console.log(msg);
};

steps = [

        function(vars){
            console.log('Step 1 - Open DSW shoe page');
            page.open("http://www.dsw.com/shoe/kelly+.and.+katie+nadia+sandal?prodId=346680", function (status) {
                if (status !== 'success') {
                    console.log('Unable to load the address!');
                }
                else{
                     console.log(document.title);
                }
            });
        },

        function(vars){
            console.log("Step 1.5 - Capture page");
            page.render("home.png")
        },

        function(vars){
            console.log('Step 2 - Populate and submit the form');
            page.evaluate(function(vars) {
                document.getElementById("quantity").value=vars[1];
                document.getElementById("width").value=vars[2];
                document.getElementById("color").value=vars[3];
                document.getElementById("size").value=vars[4];
                document.getElementById("sku").value=vars[5];

                document.getElementById("productActionForm").submit();
            }, vars);
        },

        function(vars){
            console.log('Step 3 - Checkout the shoe');
            page.evaluate(function(vars) {
                    document.getElementById("checkoutButton").click();
            }, vars);
        },

        function(vars){
            console.log("Step 3.5 - Capture page");
            page.render("checkout.png")
        },


        function(vars){
            console.log('Step 4 - Guest checkout the shoe');
            page.evaluate(function(vars) {
                    document.getElementById("guestButton").click();
            }, vars);
        },

        function(vars){
            console.log("Step 4.5 - Capture page");
            page.render("guest_checkout.png")
        },

        function(vars){
            console.log("Step 5 - Fill out contact info");
            page.evaluate(function(vars) {
                var nl = "\n";
                var first = vars[6];
                var last = vars[7];
                var street = vars[8];
                var city = vars[9];
                var state = vars[10];
                var zip = vars[11];
                var email = vars[12];
                var phone = vars[13];
                console.log(first + nl + last + nl + street + nl + city + nl + zip + nl + email + nl + phone);
                document.getElementById("billingFirstName").value=first;
                document.getElementById("billingLastName").value=last;
                document.getElementById("billingAddress").value=street;
                document.getElementById("billingCity").value=city;
                document.getElementById("billingZipCode").value=zip;
                document.getElementById("billingPhone").value=phone;
                document.getElementById("emailAddress").value=email;
                document.getElementById("confirmEmailAddress").value=email;
                document.getElementById("billingState").value=state;
                document.getElementById("checkoutButton").click();
            }, vars);
        },

        function(vars){
            console.log("Step 5.5 - Capture page");
            page.render("billing_info.png")
        },

        function(vars){
            console.log("Step 6 - Select credit card option");

            page.evaluate(function(vars) {
                document.getElementById("paymentType-cc").click();
            }, vars);
        },

        function(vars){
            console.log("Step 6.5 - Capture page");
            page.render("card_option.png")
        },

        function(vars){
            console.log("Step 7 - Fill out credit card info");
            page.evaluate(function(vars) {
                var nl = "\n";
                var first=vars[6];
                var acct=vars[14];
                var code = vars[15];
                console.log(first + nl + acct + nl + code);
                document.getElementById("cardHoldersName1").value=first;
                document.getElementById("accountNumber").value=acct;
                document.getElementById("cvv").value =code;
            }, vars);
        },

        function(vars){
            console.log("Step 7.5 - Capture page");
            page.render("card_info.png")
        },
];

var vars = [];
    if (args.length === 1) {
        console.log('Try to pass some arguments when invoking this script!');
    } else {
        args.forEach(function(arg, i) {
            vars[i] = arg;
            //console.log(i + ':' + vars[i]);
        });
}

interval = setInterval(executeRequestsStepByStep, 4000);
function executeRequestsStepByStep(){
    if (loadInProgress == false && typeof steps[testindex] == "function") {
        steps[testindex](vars);
        testindex++;
    }
    if (typeof steps[testindex] != "function") {
        console.log("Shoe buy complete!");
        phantom.exit();
    }
}

page.onLoadStarted = function() {
    loadInProgress = true;
    console.log('Loading started');
};
page.onLoadFinished = function() {
    loadInProgress = false;
    console.log('Loading finished');
};
page.onConsoleMessage = function(msg) {
    console.log(msg);
};