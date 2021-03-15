const express = require('express');

const { appConfig } = require('./middleware/appConfig');
const { dbConnect } = require('./misc/dbConnect');
const { partialsReg } = require('./misc/hbsReg');
const { sessionConfig } = require('./middleware/sessionConfig');
const { routersConfig } = require('./middleware/routersConfig');

const PORT = process.env.PORT || 3000;
const app = express();

appConfig(app);
sessionConfig(app);
partialsReg();
dbConnect();
routersConfig(app);

app.listen(PORT, () => {
  console.log(`
    -----------------
    server on ${PORT}
    -----------------
    `)
});
