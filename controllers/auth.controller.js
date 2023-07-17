const bcrypt = require("bcrypt");
const authService = require("../services/auth.service");

const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await authService.login(email);

      if (!user) {
        return res.status(404).json({ message: "Invalid user or password." })
      }

      // Verify if password is valid
      // use await bcrypt.compare OR bcrypt.compareSync
      const passwordIsValid = await bcrypt.compare(password, user.password);

      if (!passwordIsValid) {
        return res.status(404).json({ message: "Invalid user or password." })
      }
      // console.log(passwordIsValid);

      res.json("Login ok");

    } catch (error) {
      // console.log(error);
      res.status(500).json(error.message);

    }


  }
}

module.exports = authController;