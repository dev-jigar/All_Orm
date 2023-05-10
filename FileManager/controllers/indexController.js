const { routeUserToDashboard } = require("../helpers");
const { SaveUserRegistration } = require("../services/userActions");

const firstView = async (req, res) => {
  res.render("index");
};
const signup = async (req, res) => {
  res.render("signup",{data:null,token:null});
};
const register = async (req, res) => {
  try {
    const RegisterData = await SaveUserRegistration(req.body, req, res);
    if (RegisterData?.data && RegisterData.token) {
      console.log("RegisterData.data",RegisterData.data,JSON.stringify(RegisterData.data));
        // const routeUserToHome = await routeUserToDashboard(RegisterData?.data , RegisterData.token,req,res)
      res.render('signup',{ data: RegisterData.data, token: null});
      // res.json({data:RegisterData.data})
    }
  } catch (error) {
    console.log(error);
  }
};
const Home = async (req, res) => {
  res.render("Home");
};

module.exports = {
  firstView,
  signup,
  register,
  Home,
};
