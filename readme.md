# Sheet API
The sheet API app, is a node js app that allows you to access a GSheet via an API. As an extra to this the app has a simple caching implementation in place. This way you can access more frequently accessed data faster.

---

## Setup
To set up the GSheet api you need a `GCP service account` and `GSheet`

### Get a service account
Go to the Google Cloud Platform and create a service account without permissions. After that generate a `json` key and store it safely.
Now you can extract the key from this `json` file and place it in a file called `key` in the root directory of this project.

For more info on service accounts in GCP go here: https://cloud.google.com/iam/docs/creating-managing-service-accounts

### Environment variables
Next, copy the `.env.example` file and paste in the service account email address, Google Sheet ID and choose a port to serve the app on.

```conf
PORT=<http port>
SHEET_ID=<google sheet id>
SACC_EMAIL=<service account email address>
```

For more info on the Google Sheet ID go here: https://developers.google.com/sheets/api/guides/concepts

### Install Node.js and Yarn
 - https://nodejs.org/en/
 - https://classic.yarnpkg.com/en/

### Install packages
Execute the command `yarn install` to install all packages.

---

## Running the app
To run the app, execute the `yarn serve` command. This will start a app on localhost with the PORT you supplied. Now you can use the app to play around, test or develop some frontend application around it.

---

## Endpoints

### GET /
The root endpoint will give you the status and configuration of the application.

Example response:
```json
{
    env: {
        SHEET_ID: "...",
        SACC_EMAIL: "...",
        connected: true || false
    }
}
```

### GET /:sheet?page=x
You can get a list of all the rows in a sheet with the name of the sheet that contains your data. If the sheet does not exist you will get an empty list. Take note there is a limit of 25 rows per call. You can use the `page` query parameter to scroll trough the rows.

Example response:
```json
{
    rows: [ ...your_data_here ],
    currentPage: 1,
    nextPage: 2
}
```

### GET /:sheet/:rowId
To get a specific element you can use the row id (the number of the row in GSheet) to get the row as a object. 

Example response:
```json
{
    rows: [ ...your_data_here ],
    currentPage: 1,
    nextPage: 2
}
```

### POST /:sheet
To create a row in the sheet make a json body with the columns in the sheet as keys

Example request:
```json
{
    "Column1": "Value1",
    "Column2": "Value2",
}
```

Example response with status `201`:
```json
{
    "Column1": "Value1",
    "Column2": "Value2",
}
```

## Tests
To run the test enter the `yarn tests` command. Be aware these are integration tests and need to have the testing sheet in the GSheet.

Create one called `Test`

With the values:

```
Key	Value
1	a
2	b
3	c
4	d
5	f
```

## TODO

[] Migrate to Typescript https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html
[] Feather maybe https://feathersjs.com/
[] Add swagger docs https://www.section.io/engineering-education/documenting-node-js-rest-api-using-swagger/

