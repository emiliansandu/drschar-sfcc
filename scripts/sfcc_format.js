const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

function start_orders() {
    var start =
        '<?xml version="1.0" encoding="UTF-8"?>' +
        '<orders xmlns="http://www.demandware.com/xml/impex/order/2006-10-31">'
    return start;
}

function start_catalogue(catalog_id) {
    var start =
        '<?xml version="1.0" encoding="UTF-8"?>' +
        '<catalog xmlns="http://www.demandware.com/xml/impex/catalog/2006-10-31" catalog-id="' + catalog_id + '">'
    return start;
}

function header_catalogue() {
    var header =
        '<header>' +
        '<image-settings>' +
        '<external-location>' +
        '<http-url>http://staging-na01-azapflores.demandware.net/on/demandware.static/-/Sites-azap-products-master/default/dw01925bd8</http-url>' +
        '<https-url>https://staging-na01-azapflores.demandware.net/on/demandware.static/-/Sites-azap-products-master/default/dw01925bd8</https-url>' +
        '</external-location>' +
        '<view-types>' +
        '<view-type>large</view-type>' +
        '<view-type>medium</view-type>' +
        '<view-type>small</view-type>' +
        '<view-type>swatch</view-type>' +
        '</view-types>' +
        '<alt-pattern>${productname}</alt-pattern>' +
        '<title-pattern>${productname}</title-pattern>' +
        '</image-settings>' +
        '</header>';
    return header;
}

function root_catalogue(catalog_name) {
    var root =
    '<category category-id="root">'+
    '<display-name xml:lang="x-default">' + catalog_name + '</display-name>' +
    '<online-flag>true</online-flag>' +
    '<template/>' +
    '<page-attributes/>' +
    '</category>';
    return root;
}

function bolean_value(text_2_bolean) {
    if (text_2_bolean == "No") {
        return false;
    }
    return true;  // Should cover Si si Sé and Sí
}

function bolean_status(status) {
    if (status == "Habilitado") {
        return true;
    }
    return false;  // 
}


function product_part(current, g) {

    var te = '<product product-id="' + entities.encode(entities.decode(current.sku)) + '">' +
        '<ean/>' +
        '<upc/>' +
        '<unit>lb</unit>' +
        '<min-order-quantity>' + 1 + '</min-order-quantity>' +
        '<display-name xml:lang="x-default">' + entities.encode(entities.decode(current.name)) + '</display-name>' +
        '<short-description xml:lang="x-default">' + entities.encode(entities.decode(current.short_description)) + '</short-description>' +
        '<long-description xml:lang="x-default">' + entities.encode(entities.decode(current.description)) + '</long-description>' +
        '<online-flag>' + bolean_status(current.status) +'</online-flag>' +
        '<available-flag>false</available-flag>' +
        '<searchable-flag>true</searchable-flag>' +
        '<images>' +
        '<image-group view-type="large">' +
        g +
        '</image-group>' +
        '<image-group view-type="medium">' +
        g +
        '</image-group>' +
        '<image-group view-type="small">' +
        g +
        '</image-group>' +
        '</images>' +
        '<brand/>' +
        '<manufacturer-name>' +  entities.encode(entities.decode(current.name)) + '</manufacturer-name>' +
        '<manufacturer-sku>' + entities.encode(entities.decode(current.sku)) + '</manufacturer-sku>' +
        '<page-attributes>' +
            '<page-title xml:lang="x-default">' + entities.encode(entities.decode(current.meta_title)) + '</page-title>' +
            '<page-description xml:lang="x-default">' + entities.encode(entities.decode(current.meta_description)) + '</page-description>' +
            '<page-keywords xml:lang="x-default">' + entities.encode(entities.decode(current.meta_keyword)) + '</page-keywords>' +
            '<page-url xml:lang="x-default">' + entities.encode(current.url_key) + '</page-url>' +
        '</page-attributes>' +
        '<custom-attributes>' +
            '<custom-attribute attribute-id="is_food">' + bolean_value(current.is_flowers) + '</custom-attribute>' +
            '<custom-attribute attribute-id="is_flowers">' + bolean_value(current.is_flowers) + '</custom-attribute>' +
            '<custom-attribute attribute-id="car_required">' + bolean_value(current.car_required) + '</custom-attribute>' +

            '<custom-attribute attribute-id="custom_options_set_ids"></custom-attribute>' +

            '<custom-attribute attribute-id="weight">' + entities.encode(entities.decode(current.weight)) + '</custom-attribute>' +
            '<custom-attribute attribute-id="card_id">' + entities.encode(entities.decode(current.card_id)) + '</custom-attribute>' +
            
            '<custom-attribute attribute-id="cutoffTime">' + entities.encode(entities.decode(current.cutoff_time)) + '</custom-attribute>' +
            '<custom-attribute attribute-id="dates_not_available">' + current.disabled_dates + '</custom-attribute>' +
            '<custom-attribute attribute-id="is_deliverable_weekend">' + bolean_value(current.allow_delivery_on_weekends) + '</custom-attribute>' +
            '<custom-attribute attribute-id="free_delivery">' + bolean_value(current.free_shipping) + '</custom-attribute>' +

            '<custom-attribute attribute-id="measurements">' + entities.encode(entities.decode(current.measurements)) + '</custom-attribute>' +
            '<custom-attribute attribute-id="flower_arrangement">' + entities.encode(entities.decode(current.flower_arrangement)) + '</custom-attribute>' +
            
        '</custom-attributes>' +
        '<pinterest-enabled-flag>false</pinterest-enabled-flag>' +
        '<facebook-enabled-flag>false</facebook-enabled-flag>' +
        '<store-attributes>' +
            '<force-price-flag>false</force-price-flag>' +
            '<non-inventory-flag>false</non-inventory-flag>' +
            '<non-revenue-flag>false</non-revenue-flag>' +
            '<non-discountable-flag>false</non-discountable-flag>' +
        '</store-attributes>' +
        '</product>';
    return te;
}

function product_yotpo_part(current) {

    var te = '<product product-id="' + entities.encode(entities.decode(current.sku)) + '">' +
        '<custom-attributes>' +
            '<custom-attribute attribute-id="car_required">' + bolean_value(current.car_required) + '</custom-attribute>' +
            '<custom-attribute attribute-id="yotpoId">' + entities.encode(entities.decode(current.yotpoId)) + '</custom-attribute>' +
        '</custom-attributes>' +
        '</product>';
    return te;
}


function image_path(image_file) {
    var name_of_image = (image_file != "") ? image_file.substr(1) : "missing-image.jpg";
    return "<image path='" + name_of_image + "'/>";
}

function product_links(){
    var a = '<product-links>' +
    '<product-link product-id="chocolates-azap" type="up-sell"/>' +
    '<product-link product-id="chocolate-artesanal" type="up-sell"/>' +
    '<product-link product-id="chocolate-mexicano" type="up-sell"/>' +
    '<product-link product-id="chocolates-azap-xocolatl" type="up-sell"/>' +
    '</product-links>'
}


function start_inventory(name) {

var headXML =
'<?xml version="1.0" encoding="UTF-8"?>'+
'<inventory xmlns="http://www.demandware.com/xml/impex/inventory/2007-05-31">'+
    '<inventory-list>'+
        '<header list-id="' + name +'">'+
            '<default-instock>true</default-instock>'+
            '<use-bundle-inventory-only>false</use-bundle-inventory-only>'+
            '<on-order>false</on-order>'+
        '</header><records>';
 return headXML;
}

function start_customer_list(name) {
    var start =
        '<?xml version="1.0" encoding="UTF-8"?>' +
        '<customer-list xmlns="http://www.demandware.com/xml/impex/customer/2006-10-31" list-id="' + name + '">'
    return start;
}

function customer(current) {
    var custmr =
    '<customer customer-no="'+current.id+'">'+
        '<credentials>' +
            '<login>'+current.email+'</login>' +
            '<password encrypted="true" encryptionScheme="scrypt">$s0$b0401$rPaMzX/SAVqGmoA1aqmJLQ==$VYZXkuqzeAnV1ADiMrXZ37iE8oy2Y4sOvDM+/36/sdQ=</password>' +
        '</credentials>' +
        '<profile>' +
        '    <first-name>' + entities.encode(entities.decode(current.first_name)) + '</first-name>' +
        '    <last-name>'+ entities.encode(entities.decode(current.last_name)) +'</last-name>' +
        '    <email>'+current.email+'</email>' +
        '    <phone-home>'+ current.phone+'</phone-home>' +
        '</profile>' +
        '<note>' + current.note +
        '</note>' +
    '</customer>';

    return custmr;
}


function order_function(order) {
    var order_text =
    '<order order-no="'+order['A_ORDERNUMBER']+'">'+
    '<order-date>'+order['A_CREATION_DATE']+'</order-date>' +
    '<created-by>storefront</created-by>' +
    '<currency>USD</currency>' +
    '<customer-locale>default</customer-locale>' +
    '<taxation>net</taxation>' +
    '<customer>' +
    '  <customer-no>'+order['A_USER_ID']+'</customer-no>' +
    '  <customer-name>Yo merenges registrado </customer-name>' +
    '  <customer-email>rcervantes@unitedvirtualities.com</customer-email>' +
    '</customer>';

    order_text += order_status(order);
    
    order_text += '<product-lineitems>';
    for (let pli = 0; pli < order.product_line_items.length; pli++) {
        order_text += product_line_items(order.product_line_items[pli]);
    }
    order_text += '</product-lineitems>';

    order_text += 
    ' <shipping-lineitems> '+ 
    '     <shipping-lineitem> '+ 
    '         <net-price>5.99</net-price> '+ 
    '         <tax>0.00</tax> '+ 
    '         <gross-price>5.99</gross-price> '+ 
    '         <base-price>5.99</base-price> '+ 
    '         <lineitem-text>Shipping</lineitem-text> '+ 
    '         <tax-basis>5.99</tax-basis> '+ 
    '         <item-id>STANDARD_SHIPPING</item-id> '+ 
    '         <shipment-id>00005324</shipment-id> '+ 
    '         <tax-rate>0.0</tax-rate> '+ 
    '     </shipping-lineitem> '+ 
    ' </shipping-lineitems> '+ 

    '<shipments>' + 
       order_shipment() +
    '</shipments>'+

    order_totals() +
    
    '</order>';

    return order_text;
}

function order_status(order){
 var os = 
'<status> ' +
'    <order-status>NEW</order-status>' +
'    <shipping-status>NOT_SHIPPED</shipping-status>' +
'    <confirmation-status>CONFIRMED</confirmation-status>' +
'    <payment-status>NOT_PAID</payment-status>' +
'</status>';
return os;
}

function order_shipment(o_shipment){
 var shipment_text = 
    '<shipment shipment-id="'+o_shipment['A_ORDERNUMBER']+'">' +
    '<status>' +
    '    <shipping-status>SHIPPED</shipping-status>' +
    '</status>' +
    '<shipping-method>001</shipping-method>' +
    '<shipping-address>' +
    '    <first-name>Ruben</first-name>' + 
    '    <last-name>Cervantes</last-name>' + 
    '    <address1>Uhlandstr 8</address1>' + 
    '    <city>Atlantic City</city>' + 
    '    <postal-code>92237</postal-code>' + 
    '    <state-code>NJ</state-code>' + 
    '    <country-code>US</country-code>' + 
    '    <phone>9876543219</phone>' + 
    '</shipping-address>' +
    '</shipment>';

 return shipment_text;
}


function order_totals(){
    var o_totals = 
    ' <totals> '+
    '     <shipping-total> '+
    '         <net-price>5.99</net-price> '+
    '         <tax>0.00</tax> '+
    '         <gross-price>5.99</gross-price> '+
    '     </shipping-total> '+
    '     <order-total> '+
    '         <net-price>35.94</net-price> '+
    '         <tax>0.00</tax> '+
    '         <gross-price>35.94</gross-price> '+
    '     </order-total> '+
    ' </totals> ';
    return o_totals;
}

function product_line_item(pli){
    var plitext = 
    '    <product-lineitem>' +
    '        <net-price>' + pli.A_TOTAL_NET_PRICE + '</net-price>' +
    '        <tax>0.19</tax>' +
    '        <gross-price>' + pli.A_TOTAL_GROSS_PRICE + '</gross-price>' +
    '        <base-price>55.99</base-price>' +
    '        <lineitem-text>' + pli.A_PRODUCT_NAME + '</lineitem-text>' +
    '        <tax-basis>29.95</tax-basis>' +
    '        <position>1</position>' +
    '        <product-id>' + pli.A_SKU + '</product-id>' + 
    '        <product-name>' + pli.A_PRODUCT_NAME + '</product-name>' +
    '        <quantity unit="UNIT">12.0</quantity>' +
    '        <tax-rate>0.2</tax-rate>' +
    '        <shipment-id>00005324</shipment-id>' +
    '        <gift>false</gift>' +
    '    </product-lineitem>';
    return plitext;
}


module.exports = {
    start_catalogue:start_catalogue,
    start_orders:start_orders,
    an_order:order_function,
    header_catalogue:header_catalogue,
    root_catalogue:root_catalogue,
    product_part:product_part,
    product_yotpo_part:product_yotpo_part,
    image_path:image_path,
    start_inventory:start_inventory,
    start_customer_list:start_customer_list,
    customer:customer,
};