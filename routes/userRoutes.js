const router = require('express').Router();
const User = require('../models/User');


// User Creation : users/
router.post('/', async (req, res) => {
  const {email, password} = req.body;

  try {
      const user = await User.create({email, password});
      await user.generateAuthToken();
      res.status(201).send();
  } catch (error) {
      let msg;
      if(error.code == 11000){
        msg = 'Email already exists !'
      } else {
        msg = error.message;
      }
      res.status(400).json(msg)
  }
})

// Login user :
router.post('/login', async (req, res) => {
  const {email, password} = req.body;
  try {
      const user = await User.findByCredentials(email, password)
      await user.generateAuthToken();
      res.json(user)
  } catch (error) {
    res.status(400).json(e.message);
  }
})



module.exports = router;
