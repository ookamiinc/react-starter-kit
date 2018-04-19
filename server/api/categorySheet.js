/* eslint-disable no-shadow */

const GoogleSpreadsheet = require('google-spreadsheet');

const doc = new GoogleSpreadsheet(
  process.env.GOOGLE_SPREAD_SHEET_ID_FOR_CATEGORY,
);
const credentials = {
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
};

module.exports = {
  get: (request, response) => {
    // eslint-disable-next-line no-unused-vars
    doc.useServiceAccountAuth(credentials, error => {
      const { id } = request.query;
      doc.getRows(
        1,
        {
          offset: 1,
          query: `id = "${id}"`,
        },
        (error, rows) => {
          const row = (rows && rows[0]) || {};
          response.json({
            row,
            error,
          });
        },
      );
    });
  },
};
