const Ajv = require('ajv');
const AjvErrors = require('ajv-errors');
const AjvFormat = require('ajv-formats');
const AjvKeyword = require('ajv-keywords');

const ajv = new Ajv({
  allErrors: true,
  $data: true,
});
AjvErrors(ajv);
AjvFormat(ajv);
AjvKeyword(ajv);

module.exports = ajv;