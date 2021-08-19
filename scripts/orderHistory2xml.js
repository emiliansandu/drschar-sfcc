var fs = require('fs');
var sfcc = require("./sfcc_format.js");

var data_input = require("./read_customers.js");
var line_items = data_input.loadlineitems();
var order_items = data_input.loadorders();

var output_filename = "output/orders.xml";
var inputfile = "schaer_export_16Ago/export_users.csv";
var all_customers = data_input.loadcustomers(inputfile);


var output_stream = fs.createWriteStream(output_filename, { flags: 'a' });
var output_error_stream = fs.createWriteStream("errors_orders.xml", { flags: 'a' });


output_stream.write(sfcc.start_orders());
output_stream.write('\r\n');

//@[A-Z0-9.-]+\.
//@[A-Z0-9.-]+\.[A-Z]{2,4}\b

Object.keys(order_items).forEach(function (order_no) { 
    var order = order_items[order_no][0]
    // iteration code
    console.log(order.A_CREATION_DATE);
    let order_xml = sfcc2.an_order(order);
    output_stream.write(order_xml);
    output_stream.write('\r\n');
})

output_stream.write("</orders>");
output_stream.write('\r\n');

console.log("Listing : " + all_customers.length + " Customers");
console.log("count_written : " + count_written + "  Correct");
console.log("count_errors : " + count_errors + " With Errors");
