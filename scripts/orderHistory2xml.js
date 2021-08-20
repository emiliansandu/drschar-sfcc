var fs = require('fs');
var sfcc = require("./sfcc_format.js");

var data_input = require("./read_customers.js");
var order_items = data_input.loadorders();
var user_address = data_input.loadaddresses();
var line_items = data_input.loadlineitems();
var inputfile = "schaer_export/export_users.csv";
var all_customers = data_input.loadcustomers(inputfile);


console.log("order_items " + Object.keys(order_items).length);
console.log("user_address " + Object.keys(user_address).length);
console.log("line_items " + Object.keys(line_items).length);
console.log("all_customers " + Object.keys(all_customers).length);


data_input.link_data(order_items,user_address,line_items,all_customers);

var output_filename = "output/orders.xml";
var output_stream = fs.createWriteStream(output_filename, { flags: 'a' });
var output_error_stream = fs.createWriteStream("errors_orders.xml", { flags: 'a' });


output_stream.write(sfcc.start_orders());
output_stream.write('\r\n');

//Remove email and cange it for a dummy one for testing.(ir required)
//@[A-Z0-9.-]+\.
//@[A-Z0-9.-]+\.[A-Z]{2,4}\b

var arr_order_items = Object.keys(order_items);

for (var i = 25, len = arr_order_items.length; i < 30; i++) {
    console.log("i= " + i);
    var order_no = arr_order_items[i];
    var order = order_items[order_no][0];

    if (order.A_USER_ID !== ''){
    console.log("order_no= " + order_no);
    var order_xml = sfcc.an_order(order);
    output_stream.write(order_xml);
    output_stream.write('\r\n');
    } else {
        console.log("Skip Order Without Registered user");
    }
}

output_stream.write("</orders>");
output_stream.write('\r\n');

console.log("Listing : " + all_customers.length + " Customers");
//console.log("count_written : " + count_written + "  Correct");
//console.log("count_errors : " + count_errors + " With Errors");
