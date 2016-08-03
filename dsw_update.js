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

        function(){
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
        function(){
            console.log("Step 1.5 - Take photo of where we're at");
            page.render("home.png")
        },

        function(){
            console.log('Step 2 - Populate and submit the form');
            page.evaluate(function() {
                document.getElementById("quantity").value='1';
                document.getElementById("width").value="M";
                document.getElementById("color").value="feed_00000000209451";
                document.getElementById("size").value="1000013";
                document.getElementById("quantity").value='1';
                document.getElementById("sku").value='58000000003466800010000M006.5';

                document.getElementById("productActionForm").submit();
            });
        },

        function(){
            console.log('Step 3 - Checkout the shoe');
            page.evaluate(function() {
                    document.getElementById("checkoutButton").click();
            });
        },

        function(){
            console.log("Step 3.5 - Take photo of where we're at");
            page.render("checkout.png")
        },


        function(){
            console.log('Step 4 - Guest checkout the shoe');
            page.evaluate(function() {
                    document.getElementById("guestButton").click();
            });
        },

        function(){
            console.log("Step 4.5 - Take photo of where we're at");
            page.render("guest_checkout.png")
        },

        function(){
            console.log("Step 5 - Fill out contact info");
            page.evaluate(function() {
                var nl = "\n";
                var first = "Jess";
                var last = "V";
                var street = "1700 Alabama St";
                var city = "San Francisco";
                var state = "CA";
                var zip = "94110";
                var email = "fake@gmail.com";
                var phone = "0000000000";
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
            });
        },

        function(){
            console.log("Step 5.5 - Take photo of where we're at");
            page.render("billing_info.png")
        },

        function(){
            console.log("Step 6 - Select credit card option");

            page.evaluate(function() {
                document.getElementById("paymentType-cc").click();
            });
        },

        function(){
            console.log("Step 6.5 - Take photo of where we're at");
            page.render("card_option.png")
        },

        function(){
            console.log("Step 7 - Fill out credit card info");
            page.evaluate(function() {
                var nl = "\n";
                var first="Jess";
                var acct="12341234545";
                var code = "123";
                console.log(first + nl + acct + nl + code);
                document.getElementById("cardHoldersName1").value=first;
                document.getElementById("accountNumber").value=acct;
                document.getElementById("cvv").value =code;
            });
        },

        function(){
            console.log("Step 7.5 - Take photo of where we're at");
            page.render("card_info.png")
        },
];

interval = setInterval(executeRequestsStepByStep, 4000);
function executeRequestsStepByStep(){
    if (loadInProgress == false && typeof steps[testindex] == "function") {
        //console.log("step " + (testindex + 1));
        steps[testindex]();
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