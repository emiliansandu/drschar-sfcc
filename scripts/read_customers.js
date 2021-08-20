var fs = require('fs');
var $ = jQuery = require('jquery');
$.csv = require('jquery-csv');

function loadcustomers(inputfile){
    var customer_array = [];
    var csv =  fs.readFileSync(inputfile, 'utf8');
    var options={"separator" : ";"};
    var data = $.csv.toArrays(csv, options);

    var keys = data[0];

          for (var i = 1; i < data.length; i++) {
          //  for (var i = 1; i < 10; i++) {

            let customer = {};

            for (var x = 0; x < keys.length; x++) {
                customer[keys[x]] = data[i][x];
            }

              customer_array.push(customer);
          }
      return customer_array;
  }

  function loadorders(){
    var customer_array = [];
    var inputfile = "schaer_export/export_lineitemcontainers.csv";
    var csv =  fs.readFileSync(inputfile, 'utf8');
    var options={"separator" : ";"};
    var data = $.csv.toArrays(csv, options);

    var keys = data[0];

          for (var i = 1; i < data.length; i++) {
          //  for (var i = 1; i < 10; i++) {

            let customer = {};

            for (var x = 0; x < keys.length; x++) {
                customer[keys[x]] = data[i][x];
            }

              customer_array.push(customer);
          }
      return customer_array;
  }

  function loadlineitems(){
    var inputfile = "schaer_export/export_lineitems_short.csv";
    //var inputfile = "schaer_export/export_lineitems.csv";
    var csv =  fs.readFileSync(inputfile, 'utf8');
    var options={"separator" : ";"};
    var data = $.csv.toArrays(csv, options);

    var lineItems = {};
          for (var i = 1; i < data.length; i++) {
          //  for (var i = 1; i < 10; i++) {
            let lineContainerId = data[i][1];
            if (lineItems[lineContainerId]== null){
                lineItems[lineContainerId] = [];
            }
            lineItems[lineContainerId].push(parselineitems(data[i]));
          }
      return lineItems;
  }

  function parselineitems (full_lineitem){
    let litem = {};
    litem["A_PRODUCT_NAME"] = full_lineitem[3];
    litem["A_TAXAMOUNT"] = full_lineitem[5];
    litem["A_QUANTITY_VALUE"] = full_lineitem[6];
    litem["A_UNIT_CODE"] = full_lineitem[7];

    litem["A_POSITION"] = full_lineitem[9];
    litem["A_TOTAL_NET_PRICE"]	= full_lineitem[11];
    litem["A_TOTAL_GROSS_PRICE"] = full_lineitem[12];
    litem["A_SINGLE_PRICE"] = full_lineitem[13];
    litem["A_SKU"] = full_lineitem[21];
    litem["A_MANUFACTURER_SKU"] = full_lineitem[22];
    litem["A_LINEITEM_TYPE_ID"] = full_lineitem[28];
    litem["A_TAX_RATE"] = full_lineitem[55];
    
    return litem;
  }

  function loadorders(){
    var inputfile = "schaer_export/export_lineitemcontainers.csv";
    var csv =  fs.readFileSync(inputfile, 'utf8');
    var options={"separator" : ";"};
    var data = $.csv.toArrays(csv, options);

    var lineItems = {};
          for (var i = 1; i < data.length; i++) {
          //  for (var i = 1; i < 10; i++) {
            let lineContainerId = data[i][2];
            if (lineItems[lineContainerId]== null){
                lineItems[lineContainerId] = [];
            }
            lineItems[lineContainerId].push(parseorders(data[i]));
          }
      return lineItems;
  }

  function parseorders (full_order){
    let order = {};
    order["A_LINEITEMCONTAINER_ID"] = full_order[0];
    order["A_USER_ID"] = full_order[1];
    order["A_ORDERNUMBER"]	= full_order[2];
    order["A_CREATION_DATE"] = full_order[3];
    order["A_SHIPPINGADDRESS_ID"] = full_order[5];
    order["A_INVOICEADDRESS_ID"] = full_order[6];
    return order;
  }

  function loadaddresses(){
    var inputfile = "schaer_export/export_addresses.csv";
    var csv =  fs.readFileSync(inputfile, 'utf8');
    var options={"separator" : ";"};
    var data = $.csv.toArrays(csv, options);

    var addressItems = {};
          for (var i = 1; i < data.length; i++) {
          //  for (var i = 1; i < 10; i++) {
            let addressId = data[i][0]; // A_ADDRESS_ID
            if (addressItems[addressId]== null){
                addressItems[addressId] = [];
            }
            addressItems[addressId].push(parseAddress(data[i]));
          }
      return addressItems;
  }

  function parseAddress (full_address){
    let addr = {};
    addr["A_FIRSTNAME"] = full_address[3];
    addr["A_LASTNAME"] = full_address[4];
    addr["A_STREET"]	= full_address[7];
    addr["A_POSTALCODE"] = full_address[9];
    addr["A_CITY"] = full_address[10];
    addr["A_PROVINCE"] = full_address[11];
    addr["A_COUNTRY_ID"] = full_address[12];  
    addr["A_PHONE"] = full_address[15];
    return addr;
  }

function link_data(order_items,user_address,line_items,all_customers){
    var arr_order_items = Object.keys(order_items);

    //for (var i = 0, len = arr_order_items.length; i < len; i++) {
    for (var i = 25, len = arr_order_items.length; i < len; i++) {
        var order_no = arr_order_items[i];
        var order = order_items[order_no][0];
        var linecontainer_id = order["A_LINEITEMCONTAINER_ID"];
        var user_id = order["A_USER_ID"];
        var shipping_address_id = order["A_SHIPPINGADDRESS_ID"];
        var billing_address_id = order["A_INVOICEADDRESS_ID"];
        order["product_line_items"]= line_items[linecontainer_id];
        order["user"]= all_customers[user_id];
        order["shipping_address"]= user_address[shipping_address_id];
        order["shipping_address"]= user_address[shipping_address_id];
    }

}


module.exports = {
    loadcustomers:loadcustomers,
    loadlineitems:loadlineitems,
    loadorders:loadorders,
    loadaddresses:loadaddresses,
    link_data:link_data
};
