const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors')
const router = require("./routers/index")
const bodyParser = require("body-parser")


dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json());
app.use(cors())  
app.use(router)


app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`Backend server is running at http://localhost:${process.env.PORT}`);
});