const { SpreadSheetConnection } = require('../lib/connection.js');

const listEndpoint = async (req, res) => {
    const { page } = req.query;
    const { sheet } = req.params;

    const spreadsheet = await SpreadSheetConnection.getSpreadsheet();
    await spreadsheet.init() 

    const sheetTab = await spreadsheet.onSheet(sheet)
    const data = await sheetTab.getPage(page)

    if(data.rows.length > 0 && data.currentPage) {
        res.json(data)
    } else {
        res.status(404).json({ "message": "not found" })
    }
}

module.exports = { listEndpoint }