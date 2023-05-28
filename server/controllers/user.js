const User=require("../models/schema/user-Schema")
const bcrypt = require('bcrypt');
const async = require("hbs/lib/async");
const jwt = require('jsonwebtoken')


module.exports={
  postSigup: async (req, res) => {
    console.log("post signnup");
      let  userSignUpp={
        Status:false,
        message:null,
        }
        const { enteredEmail,enteredname} = req.body
        let { enteredPassword} = req.body
        let user = await User.find({ email: enteredEmail })
        if(user.length===0){
            enteredPassword= await bcrypt.hash(enteredPassword, 10)
            User.create({
                Name:enteredname ,
                email:enteredEmail,
                password:enteredPassword,
                
            }).then((data) => {
                userSignUpp.Status=true
                res.send({ userSignUpp })
            })
        }else{
            userSignUpp.message="email already exists try login with this email"
            res.send({ userSignUpp })      
          }
     
    }, 
    postLogin: async(req,res)=>{
        let  userSignUpp={
            Status:false,
            message:null,
            token: null,
            name:null
            }
            const {enteredEmail ,enteredPassword}=req.body
            let findUser = await User.find({ email: enteredEmail })
            if (findUser.length !== 0) {
                    bcrypt.compare(enteredPassword, findUser[0].password, function (error, isMatch) {
                        if (error) {
                            userSignUpp.Status = false
                            userSignUpp.message = error
                        res.send({ userSignUpp })      
                        } else if (isMatch) {
                            userSignUpp.Status=true
                            userSignUpp.name=findUser[0].Name
                          const name=findUser[0].Name
                            let token = jwt.sign({ id: findUser[0]._id }, "secretCode", { expiresIn: "30d" })
                            userSignUpp.token= token
                            let obj = {
                                token,name
                            }
                            res.cookie("jwt", obj,  {
                                httpOnly: false,
                                maxAge: 6000 * 1000,
                            }).status(200).send({ userSignUpp })    
                        } else {
                            userSignUpp.message = " Password is wrong"
                            userSignUpp.Status = false
                            res.send({ userSignUpp })      
                        }
                    })
            } else {
                userSignUpp.message = "your Email wrong"
                 userSignUpp.Status = false
                 res.send({ userSignUpp })      
                }
    },
  userProfile: async (req, res) => {
  
  if (req.cookies.jwt && req.cookies.jwt.token) {
    try {
      const jwtToken = jwt.verify(req.cookies.jwt.token, "secretCode");
      const user = await User.findOne({ _id: jwtToken.id });
      if (user) {
        res.status(200).send({ user });
      } else {
        res.status(500).send({ error: "User not found" });
      }
    } catch (err) {
      res.status(401).send({ error: "Invalid JWT token" });
    }
  } else {
    res.status(401).send({ error: "JWT token not found in cookies" });
  }
}
,
    editProfilePhoto:async(req,res)=>{

  try {
    // Verify the JWT token
    const jwtToken = jwt.verify(req.cookies.jwt.token, "secretCode");
    if (!jwtToken.id) {
      throw new Error("Invalid token");
    }

    // Find the user in the database
    const user = await User.findById(jwtToken.id);
    if (!user) {
      throw new Error("User not found");
    }

    // Update the user's profile image
    if (req.file && req.file.path) {
      user.image = req.file.path;
      await user.save();

      res.status(200).send({ changed: true });
    } else {
      throw new Error("No image found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }

    }
}