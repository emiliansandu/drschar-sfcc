var fs = require('fs');
var sfcc = require("./sfcc_format.js");

var data_input = require("./read_customers.js");
var line_items = data_input.loadlineitems();
var order_items = data_input.loadorders();

var inputfile = "schaer_export/export_users.csv";
var output_filename = "output/users.xml";
var all_customers = data_input.loadcustomers(inputfile);


var output_stream = fs.createWriteStream(output_filename, { flags: 'a' });
var output_error_stream = fs.createWriteStream("errors.xml", { flags: 'a' });

var customer_list;
customer_list = sfcc.start_customer_list("drschar");

output_stream.write(customer_list);
output_stream.write('\r\n');

//@[A-Z0-9.-]+\.
//@[A-Z0-9.-]+\.[A-Z]{2,4}\b

function parseDrSchar(raw_customer) {
let current = {};
current.id          = raw_customer['A_USER_ID'];
current.first_name  = raw_customer['A_FIRSTNAME'];
current.last_name   = raw_customer['A_LASTNAME'];
current.email       = raw_customer['A_LOGIN'];
current.phone       = raw_customer['A_PHONE'];
current.phone       = raw_customer['A_BIRTHDATE'];
current.note        = raw_customer['A_LAST_MODIFIED'];
current.invalid = false;
return current;
}

var current_customer;
var count_written = 0;
var count_errors = 0;
for (var i = 0; i < all_customers.length; i++) {

    current_customer = parseDrSchar(all_customers[i]);

    let customer_xml = sfcc.customer(current_customer);

    if(current_customer.invalid){
        count_errors += 1;
        output_error_stream.write(customer_xml);
    }else{ 
        count_written += 1;
        output_stream.write(customer_xml);
    }
    output_stream.write('\r\n');

}

output_stream.write("</customer-list>");
output_stream.write('\r\n');

console.log("Listing : " + all_customers.length + " Customers");
console.log("count_written : " + count_written + "  Correct");
console.log("count_errors : " + count_errors + " With Errors");
