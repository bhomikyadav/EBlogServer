const express = require("express");
const app = express();
require("./dbConnection")();
const cors = require('cors')



const PORT = 5000 || process.env.PORT;

app.use(express.json());
app.use(cors());





app.use('/user',require('./routers/register'));


app.listen(PORT, () => console.log(`server listening at PORT:${PORT}`));
