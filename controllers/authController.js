const { UserModel } = require('../models/userModel');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

 const registerController = async (req,res) => {
    try {
        const {name,email,password} = req.body;

    if(!name){
        return res.send({message:'Name is Required'});
    }
    if(!email){
        return res.send({message:'Email is Required'});
    }
    if(!password){
        return res.send({message:'Passowrd is Required'});
    }

    const isUserExists = await UserModel.findOne({email});
   
    if(isUserExists){
        return res.status(200).send({
            success:false,
            message:'User Already Exists Please Try To Login'
        })
    }
    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(password,saltRounds);
    const user = await new UserModel({name,email,password:hashedPass}).save();

    res.status(200).send({
        success:true,
        message:"User Registerd Successfully!!!",
        user
    })

    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error in Register",
            error
        })
    }
}
// const compass = async (passowrd,op) => {
//     return bcrypt.compare(passowrd,op)
// }
 const loginController  = async (req,res) => {
    try {
        const {email,password} = req.body;

        if(!email){
            return res.status(404).send({
                success:false,
                message:"Email is Required"
            })
        }
        if(!password){
            return res.status(404).send({
                success:false,
                message:"Password is Required"
            })
        }

        const isUser = await UserModel.findOne({email});
        console.log(isUser)
        if(!isUser){
            return res.status(404).send({
                success:false,
                message:"Email is Not Registerd"
            })
        }
        const isPasswordMatch = await bcrypt.compare(password,isUser.password)
        console.log(isPasswordMatch)
        if(!isPasswordMatch){
            return res.status(200).send({
                success:false,
                message:"Invalid Password"
            })
        }

        const token = await JWT.sign({_id:isUser._id},process.env.JWT_SECRETKEY,{expiresIn:'7d'});

        res.status(200).send({
            success:true,
            message:"Login Successfully!!!",
            user:{
                _id: isUser._id,
                name:isUser.name,
                email:isUser.email,
            },
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in login",
            error
        })
    }
}




// const loginController = async (req, res) => {
//     const {email,password} = req.body;

//     const user = await UserModel.findOne({email});
//     if(!user){
//         return res.send({
//             message:"email is wrong..."
//         })
//     }
//     else{
//         const validate = await bcrypt.compare(password, user.password,(err,valid) => {
//             if(err){
//                 return res.send({
//                     message:"password is wrong..."
//                 })
//             }
//             else{
//                 // return res.send({
//                 //     message:"user is valid..."
//                 // }) 
//                  JWT.sign(password, process.env.JWT_SECRETKEY, (err, token) => {
//                     if(err){
//                         res.send('error');
//                     }
//                     res.send(token)
//                 })
//             }
//         })
        

//     }
// }

module.exports = {registerController,loginController};
