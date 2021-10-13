const {
    SpreadSheetConnection
} = require('../lib/connection.js');

const postEndpoint = async (req, res) => {
    const { body, params } = req;
    const { sheet } = params;

    if(!body) { 
        res.status(400).json({
            error: "Missing data",
        });
    }

    const spreadsheet = await SpreadSheetConnection.getSpreadsheet();
    await spreadsheet.init() 

    const sheetTab = await spreadsheet.onSheet(sheet)

    try{
        const createdData = await sheetTab.createRow(body)
        res.status(201).json(createdData);
    } catch(err) { 
        res.status(400).json({
            error: err.message,
        });
    }
};

module.exports = {
    postEndpoint
}