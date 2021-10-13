const {
    SpreadSheetConnection
} = require('../lib/connection.js');

const deleteEndpoint = async (req, res) => {
    const { sheet, id } = req.params;
    
    const spreadsheet = await SpreadSheetConnection.getSpreadsheet();
    await spreadsheet.init() 

    const sheetTab = await spreadsheet.onSheet(sheet)
    const success = await sheetTab.deleteRow(id)

    if(success) {
        res.status(204).send({ "message": "deleted" });    
    } else {
        res.status(404).json({ "message": "not found" });
    }
    
};

module.exports = {
    deleteEndpoint
}