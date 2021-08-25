README.md


We usualy receive a .zip file containing 4 files 
    -- export_addresses.csv
    -- export_lineitemcontainers.csv
    -- export_lineitems.csv
    -- export_users.csv


The following scripts might require to execute this first to avoid running out of memmory
export NODE_OPTIONS=--max-old-space-size=8192


For testing Purposes the File export_lineitems.csv is truncated to be shorter like this.
sed -i '10001,$ d' export_lineitems.csv
or
head -n10000 export_lineitems.csv > export_lineitems_short.csv

For the innitial import, the full file will be used so the script needs to run for aprox 10min. (6GB Memory Peak)

Steps

 - Unzip file ( will create the schaer_export folder)
 - run node customers2xml.js 
 - This generates the output/users.xml file wich can be imported to the instance
    - Merchant Tools >  Customers >  Import &amp; Export > Import Customer List

 - run node orderHistory2xml.js
 - This generates the output files/ order_<lastcustomernumber>.xml 



 node vkbeautify.js


DELTA IMPORT
 - We should request to receive the files in the same way and form, (same columns as the last one)
 - The files should import "only" the new orders and new users (Therefore no memory or long running scripts will beneeded) it is expected that there will be no more than a couple of hundred orders max.


