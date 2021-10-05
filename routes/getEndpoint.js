const { SpreadSheetConnection } = require('../connection.js');

const getEndpoint = async (req, res) => {
    const { sheet, id } = req.params;
    
    const spreadsheet = await SpreadSheetConnection.getSpreadsheet();
    await spreadsheet.init() 

    const sheetTab = await spreadsheet.onSheet(sheet)
    const data = await sheetTab.getRow(id)

    if(data) {
        res.json(data)
    } else {
        res.status(404).json({ "message": "not found" })
    }
    
}

module.exports = { getEndpoint }
