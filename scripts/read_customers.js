var fs = require('fs');
var $ = jQuery = require('jquery');
$.csv = require('jquery-csv');

function loadcustomers(inputfile){
    var customer_array = [];
    var csv =  fs.readFileSync(inputfile, 'utf8');
    var data = $.csv.toArrays(csv, {});

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

  function loadorders(inputfile){
    var customer_array = [];
    var csv =  fs.readFileSync(inputfile, 'utf8');
    var data = $.csv.toArrays(csv, {});

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
    var inputfile = "schaer_export_16Ago/lineitemssmall.csv";
    var csv =  fs.readFileSync(inputfile, 'utf8');
    var data = $.csv.toArrays(csv, {});

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
    litem["A_TOTAL_NET_PRICE"]	= full_lineitem[11];
    litem["A_TOTAL_GROSS_PRICE"] = full_lineitem[12];
    litem["A_SINGLE_PRICE"] = full_lineitem[13];
    return litem;
  }

  function loadorders(){
    var inputfile = "schaer_export_16Ago/export_lineitemcontainers.csv";
    var csv =  fs.readFileSync(inputfile, 'utf8');
    var data = $.csv.toArrays(csv, {});

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


module.exports = {
    loadcustomers:loadcustomers,
    loadlineitems:loadlineitems,
    loadorders:loadorders
};
