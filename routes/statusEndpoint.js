const { SpreadSheetConnection } = require('../connection.js');

const statusEndpoint = async (req, res) => {
    const spreadsheet = await SpreadSheetConnection.getSpreadsheet();
    
    await spreadsheet.init() 

    const connected = await spreadsheet.connectionStatus()
    const sheetId = process.env.SHEET_ID;
    const serviceAccountEmail = process.env.SACC_EMAIL;

    const env = {
        sheetId,
        serviceAccountEmail,
        connected,
    }

    res.json({ env })
}

module.exports = { statusEndpoint }