
const fs = require('fs');
const http = require('http');
const path = require('path');

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const SPEC_URL = `http://localhost:7071/api/swagger.json`;
const SWAGGER_FILE = path.resolve(__dirname, `../swagger.json`)


console.log(SWAGGER_FILE);

console.log('HTTP GET ', SPEC_URL);

const req = http.get(
  SPEC_URL,
  { headers: { } },
  res => {
    console.log('Status: ', res.statusCode);

    if (res.statusCode === 200) {
      const specFile = fs.createWriteStream(SWAGGER_FILE);

      res.pipe(specFile);

      specFile.on('finish', () => console.log('Spec updated at: ', SWAGGER_FILE));
    }
  }
);

req.on('error', err => {
  fs.unlink(SWAGGER_FILE, (() => {}));
  console.error(err);
});
