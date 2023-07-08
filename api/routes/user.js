const router = require("express").Router()
const User = require("../models/User")
const Student = require("../models/Student")
const Recruiter = require("../models/Recruiter")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")
const verify = require("../verifyToken")
//create token

//STUDENT

//get Student details

router.post("/userDetails", async (req,res)=>{
    
    const query = Student.findOne({ 'roll': req.body.roll })
    const Person = await query.exec() 
    console.log(Person.roll);
    console.log(Person.gender);
    
            
    console.log(Person.name)
    
        
    
    try{
        
        res.status(201).json(Person)
    }catch(err){
        res.status(404).json(err)   
    }
        
        
})

//RECRUITER

//open applications

router.put(`/openApplications/:id`, async (req,res) => {
    console.log("rrrr")
    let flag;
    
        
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{ isOpen: true },{new:true});
            res.status(200).json(updatedUser);
        }catch(err){
            res.status(500).json(err);
        }
    
})

module.exports = router;
