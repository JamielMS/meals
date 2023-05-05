require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');
const initModel = require('./models/initModel');

db.authenticate()
  .then(() => console.log('Database Authenticated'))
  .catch((error) => console.log(error));

initModel();

db.sync()
  .then(() => console.log('Database Sync'))
  .catch((error) => console.log(error));

const port = +process.env.PORT || 4005;
app.listen(port, () => {
  console.log(`App Running on port ${port}`);
});
