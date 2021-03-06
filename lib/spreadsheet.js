const { GoogleSpreadsheet } = require('google-spreadsheet');


const mapReduceObject = (row) => Object.keys(row).map((key) => {
    return {
        [key]: row[key]
    }
}).reduce((previous, current) => {
    return { 
        ...previous, 
        ...current 
    }
})


const cleanSheetObject = (row) => {
    const uniqueId = row._rowNumber - 1
    delete row._sheet
    delete row._rawData
    delete row._rowNumber
    return {
        uniqueId,
        ...row
    }
}


class SpreadSheetDocument {
    currentSheet = null
    serviceAccountEmail = null
    serviceAccountPrivateKey = null
    connected = true

    constructor(sheetId, serviceAccountEmail, serviceAccountPrivateKey) {
        this.googleSpreadsheet = new GoogleSpreadsheet(sheetId)
        this.serviceAccountEmail = serviceAccountEmail
        this.serviceAccountPrivateKey = serviceAccountPrivateKey
    }

    async init() {
        try {
            await this.googleSpreadsheet.useServiceAccountAuth({
                client_email: this.serviceAccountEmail,
                private_key: this.serviceAccountPrivateKey,
            });

            await this.googleSpreadsheet.loadInfo()
            
        } catch (error) {
            this.connected = false;
            return `Could not initialized: ${error.message}`
        }
        return `Sheet initialized successfully`
    }

    async onSheet(name) {
        try {
            this.currentSheet = this.googleSpreadsheet.sheetsByTitle[name]
            await this.currentSheet.loadHeaderRow()
            this.requiredValues = this.currentSheet.headerValues
        } catch (error) {}

        return this
    }

    async getPage(number) {
        number = number ? parseInt(number) : 1

        if(!this.currentSheet) {
            return undefined
        }
        
        const limit = 25
        const offset = number <= 1 ? 0 : number * limit
        let currentPage = number
        
        let rows = []
        
        try {
            rows = await this.currentSheet.getRows({ offset, limit });
            rows = rows.map(mapReduceObject).map(cleanSheetObject)
        } catch (error) {
            currentPage = undefined;
        }

        let nextPage = undefined
        
        if(rows.length === limit) {
            nextPage = number + 1
        }

        return {
            rows,
            currentPage,
            nextPage
        }
    }

    async connectionStatus() {
        return this.connected
    }

    async getRow(number) {
        if(!this.currentSheet) {
            return undefined
        }

        const limit = 1;
        const offset = number - 1;
        let rows = await this.currentSheet.getRows({ offset, limit });
        
        rows = rows.map(mapReduceObject).map(cleanSheetObject)

        return rows[0]
    }

    async createRow(data) {
        if(!this.currentSheet) {
            return undefined
        }

        const unknownFields = Object.keys(data).filter(element => !this.requiredValues.includes(element));
        if(unknownFields.length > 0) {
            throw new Error(`Unknown fields supplied ${unknownFields.join(", ")}`)
        }

        this.currentSheet.addRow(data);

        return data
    }

    async deleteRow(number) {
        if(!this.currentSheet) {
            return undefined
        }

        const limit = 1;
        const offset = number - 1;
        const rows = await this.currentSheet.getRows({ offset, limit });
        const rowToDelete = rows[0];

        if(!rowToDelete) {
            return false;
        } else {
            await rowToDelete.delete();
            return true;
        }
    }
}

exports.SpreadSheetDocument = SpreadSheetDocument;