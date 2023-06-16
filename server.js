require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection  = require('./config/connection');
const app = express();
const authRoute = require('./routes/authRoute');




app.use(express.json());
app.use(cors());
app.use('/api',authRoute);

app.get('/',(req,res) => {
    return(
        res.send('<h1>Home Page</h1>')
    )
})

const port = process.env.PORT || 9000;

app.listen(port, async() => {
    console.log(`server running on port ${port}`);
    await connection();
})