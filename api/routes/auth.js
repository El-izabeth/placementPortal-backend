const router = require("express").Router()
const User = require("../models/User")
const Student = require("../models/Student")
const Recruiter = require("../models/Recruiter")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")
//create token

//STUDENT

//Register 
router.post("/register", async (req,res) => {
    
    
        const query = Student.findOne({ 'roll': req.body.roll })
        const Person = await query.exec() 
        if(Person){
            console.log("hi")
            query.select('name')
            
            console.log(Person.name)
            console.log(query.name)
        
            const newUser = new User({
                roll: req.body.roll,
                email: req.body.email,
                phoneno: req.body.phoneno,
                password: CryptoJS.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString()
            })
            try{
                const user = await newUser.save()
                res.status(201).json(user)
            }catch(err){
                res.status(404).json(err)   
            }
        
        }
        
        
        else{
            console.log("scam") 
            res.json("scam")
        }
})

//login
router.post("/login", async (req,res) => {
    try{
        const user = await User.findOne({ roll: req.body.roll })
        
        !user && res.status(401).json("wrong password or username")

        const bytes = CryptoJS.AES.decrypt(user.password,process.env.SECRET_KEY)
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8)

        originalPassword!==req.body.password && res.status(401).json("Wrong password or username")
        const accessToken = jwt.sign(
            { _id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "1d" })
        const { password, ...info } = user._doc

        res.status(200).json({ ...info, accessToken })
    }catch(err){
        
        res.status(500).json(err)
    }
})

//RECRUITER

//signin
router.post("/signin", async (req,res) => {
    try{
        const user = await Recruiter.findOne({ recname: req.body.recname })
        
        !user && res.status(401).json("wrong password or username")

        const bytes = CryptoJS.AES.decrypt(user.password,process.env.SECRET_KEY)
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8)

        originalPassword!==req.body.password && res.status(401).json("Wrong password or username")
        const accessToken = jwt.sign(
            { _id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "1d" })
        const { password, ...info } = user._doc

        res.status(200).json({ ...info, accessToken })
    }catch(err){
        
        res.status(500).json(err)
    }

})

//signup
router.post("/signup", async (req,res) => {
    
  
        const newUser = new Recruiter({
            recname: req.body.recname,
            compname: req.body.compname,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString()
        })
        try{
            const user = await newUser.save()
            res.status(201).json(user)
        }catch(err){
            res.status(404).json(err)   
        }
    
       
   
})

module.exports = router;

