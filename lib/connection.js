const fs = require('fs');
const { SpreadSheetDocument } = require('./spreadsheet.js');

class SpreadSheetConnection {
    static spreadsheet = undefined;

    static async getSpreadsheet() {
        if(SpreadSheetConnection.spreadsheet == undefined) {
            let initializedSpreadsheetDocument = await SpreadSheetConnection.initSpreadsheetDb()
            SpreadSheetConnection.setSpreadsheet(initializedSpreadsheetDocument)
        }

        return SpreadSheetConnection.spreadsheet;
    }

    static setSpreadsheet(spreadsheetObject) {
        SpreadSheetConnection.spreadsheet = spreadsheetObject;
    }

    static initSpreadsheetDb() {
        return new Promise((resolve, reject) => {
            fs.readFile("./key", "utf8", function(err, data) {    
                if(err) { console.error(err) }
                const spreadsheet = new SpreadSheetDocument(process.env.SHEET_ID, process.env.SACC_EMAIL, data);
                resolve(spreadsheet);
            })
        })
    }
}

module.exports = { SpreadSheetConnection };