const express = require("express")
const app = express()
const mongoose = require("mongoose")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const dotenv = require("dotenv")
dotenv.config();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("DB connection successful")).catch((err)=>console.log(err));



app.use(express.json())

app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)

app.listen(8800, ()=>{
    console.log("Backend server is running")
})



