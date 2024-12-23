const express = require('express')
const app = express();
const DB = require('./db')
const urlsRouter = require('./routes/url.routes.js')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let PORT = 3000;
DB.DB_connection();


app.use('/api', urlsRouter);

app.listen(PORT, () => {
console.log(`Server is running at PORT ${PORT}`);
})