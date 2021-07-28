'use strict';

//var server = require('server');
var Logger = require('dw/system/Logger');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Transaction = require('dw/system/Transaction');
var instaHelper = require('~/cartridge/scripts/helpers/instagramHelper');

/**
 * @function getCOs
 * @description Function that gets a custom object for a CO type and key attribute passed as a parameter.
 *
 * @param {Object} parameters Represents the parameters defined in the steptypes.json file
 */
module.exports = {
    getCOmarketingCustomer : function getCOmarketingCustomer(parameters) {
        var XMLStreamWriter = require('dw/io/XMLStreamWriter');
        const File = require('dw/io/File');
        const FileWriter = require('dw/io/FileWriter');
        
        var customObjectInstanceList = CustomObjectMgr.getAllCustomObjects(parameters.CustomObjectType);
        var CustomObjectCount=customObjectInstanceList.getCount();
        var CustomObjectData=customObjectInstanceList.asList(0, CustomObjectCount);
        // Save XML on: /on/demandware.servlet/webdav/Sites/Impex/src/IMPEX/MarketingCloud/export-customer_emails_page_designer_marketing_cloud.xml 
        var impexPath = File.IMPEX + File.SEPARATOR + 'src' + File.SEPARATOR + 'IMPEX';
        var customDir = new File(impexPath);
        var existsDir=customDir.exists();
        if(existsDir==false){
            customDir.mkdir();
             impexPath = File.IMPEX + File.SEPARATOR + 'src' + File.SEPARATOR + 'IMPEX' + File.SEPARATOR + parameters.TargetFolder;
              customDir = new File(impexPath);
               customDir.mkdir();
        }
        var impexPathFile = File.IMPEX + File.SEPARATOR + 'src' + File.SEPARATOR + 'IMPEX' + File.SEPARATOR + parameters.TargetFolder + File.SEPARATOR + parameters.Filename;
        var file = new File(impexPathFile);
    
        var fileWriter : FileWriter = new FileWriter(file, "UTF-8");
        var xsw : XMLStreamWriter = new XMLStreamWriter(fileWriter);

        xsw.writeStartDocument();
            xsw.writeCharacters( "\n" );
                xsw.writeStartElement("customerEmails");
                    xsw.writeCharacters( "\n" );
                    for(var i=0; i<CustomObjectData.length; i++){
                        xsw.writeStartElement("email");
                        xsw.writeAttribute("id", "email_"+i);
                            xsw.writeCharacters( "\n" ); 
                                xsw.writeCharacters(CustomObjectData[i].custom.emailAddress);
                                    xsw.writeCharacters( "\n" );
                        xsw.writeEndElement();
                            xsw.writeCharacters( "\n" );
                         }  
                    
                xsw.writeEndElement();
            xsw.writeCharacters( "\n" );
        xsw.writeEndDocument();
       
        xsw.close();
        fileWriter.close();
            
    }
        };