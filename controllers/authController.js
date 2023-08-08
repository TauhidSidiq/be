const { User } = require("../models")
const bcrypt = require("bcrypt")

// register user controller
const register = async (req, res) => {
  try {
    const {  name, email, password } = req.body

    const emailUser = await User.findOne({
      where: {
        email: email,
      },
    })

    if (emailUser) {
      return res.status(400).json({ status: "failed", message: "Email is already exist, please use another one", })
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    console.log(req.body)
    const newUser = await User.create(
      {name, 
        email,
        password: hash
      })
    res.status(201).json({
      status: "success",
      message: "Register success!",
      data: {
        newUser,
      },
    })  
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    })
  }
}


// login user controllers
const signin = async (req, res) => {
  try {
    console.log(req.body.email)
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    }) 
    console.log(user)
    if (!user) {
      return res.status(404).json({ status: "failed", message: "User Not found.", })
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password)

    if (!passwordIsValid) {
      res.status(401).json({ status: "failed", message: "Invalid Password", })
      return
    }
    res.status(200).json({ status: "success", message: "Login successfully", data: user, })
  } catch (error) {
    return res.status(500).send({ message: error.message, })
  }
}
module.exports = {
  register,
  signin,
}