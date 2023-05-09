const { SaveUserRegistration } = require("../services/userActions")

const firstView = async(req,res)=>{
    res.render('index')
}
const signup = async(req,res)=>{
    res.render('signup')
}
const register=async(req,res)=>{
    try {
        const RegisterData = await SaveUserRegistration(req.body,req,res);
        res.json({ data: RegisterData?.data, token: RegisterData.token });
        
    } catch (error) {
        
    }

}

module.exports={
    firstView,
    signup,
    register
}