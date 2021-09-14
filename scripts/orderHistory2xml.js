var start = new Date();
var fs = require('fs');
var sfcc = require("./sfcc_format.js");
var data_input = require("./read_customers.js");

var order_items = data_input.loadorders();
var user_address = data_input.loadaddresses();
var line_items = data_input.loadlineitems();
var inputfile = "schaer_export/export_users.csv";
var all_customers = data_input.loadcustomers(inputfile);
var customers_id = data_input.loadcustomers_id();



console.log("order_items " + Object.keys(order_items).length);
console.log("user_address " + Object.keys(user_address).length);
console.log("line_items " + Object.keys(line_items).length);
console.log("all_customers " + Object.keys(all_customers).length);
console.log("customers_id " + Object.keys(customers_id).length);


data_input.link_data(order_items,user_address,line_items,customers_id);

var output_filename = "output/orders.xml";
var output_stream = fs.createWriteStream(output_filename, { flags: 'a' });
var output_error_stream = fs.createWriteStream("errors_orders.xml", { flags: 'a' });


output_stream.write(sfcc.start_orders());
output_stream.write('\r\n');

//Remove email and cange it for a dummy one for testing.(ir required)
//@[A-Z0-9.-]+\.
//@[A-Z0-9.-]+\.[A-Z]{2,4}\b

var arr_order_items = Object.keys(order_items);

var count_orders = 0;
var count_guests = 0;
var count_canceled = 0;

for (var i = 0, len = arr_order_items.length; i < len; i++) {
    console.log("i= " + i);
    var order_no = arr_order_items[i];
    var order = order_items[order_no][0];


    if (order.A_ORDERSTATUS_ID === '90'){
        console.log("Order Canceled");
        count_canceled++;
        continue;
    }
    if (order.A_USER_ID === ''){
        console.log("Skip Order Without Registered user");
        count_guests++;
        continue;
    }

    if (order.A_ORDERNUMBER === ''){
        console.log("Skip Line no more orders");
        continue;
    }

    var order_xml = sfcc.an_order(order);
    count_orders++;

    if (count_orders%5000 == 0){
        console.log("Corte de Archivo i:" + i + " order_no= " + order_no );
            output_stream.write(order_xml);
            output_stream.write('\r\n');
            output_stream.write("</orders>");
            output_stream.write('\r\n');

            let output_filename = "output/orders_" + order_no + ".xml";
            output_stream = fs.createWriteStream(output_filename, { flags: 'a' });
            output_stream.write(sfcc.start_orders());
            output_stream.write('\r\n');
            continue;
    }

    output_stream.write(order_xml);
    output_stream.write('\r\n');
}

output_stream.write("</orders>");
output_stream.write('\r\n');

console.log("Listing : " + all_customers.length + " Customers");
console.log("count_guests : " + count_guests + "  Guests ( Skiped )");
console.log("count_canceled : " + count_canceled + " Canceled");
console.log("count_orders : " + count_orders + " Imported");

var end = new Date() - start;
console.log('Execution time: %dms', end)
