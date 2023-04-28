const port = 3000
const express = require('express');
const db = require('./models/index')
const app = express();
const userRoute = require('./Routes/userRoute')
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api',userRoute)

app.listen(port,()=>{
    console.log(`listing at http://localhost:${port}`);
})


