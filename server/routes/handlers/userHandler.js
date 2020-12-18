const config = require('../../config');
const User = require('../../models/user');
const collectionService  = require('../../services/collection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const logger = require('../../utils/logger');

const { roles } = require('../../roles')

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

exports.grantAccess = function(action, resource) {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
        return res.status(401).json({
          error: "You don't have enough permission to perform this action"
        });
      }
      next()
    } catch (error) {
      next(error)
    }
  }
}

exports.allowIfLoggedin = async (req, res, next) => {
  try {
    const user = res.locals.loggedInUser;
    if (!user)
      return res.status(401).json({
        error: "You need to be logged in to access this route"
      });
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

exports.signup = async (req, res, next) => {
  try {
    const { role, email, password, lastName, firstName } = req.body
    const hashedPassword = await hashPassword(password);
    const newUser = new User({ email, lastName, firstName, password: hashedPassword, role: role || "basic" });
    const accessToken = jwt.sign({ userId: newUser._id }, config.jwtSecret, {
      expiresIn: "30m"
    });
    newUser.accessToken = accessToken;
    await newUser.save();
    res.json({
      data: newUser,
      message: "You have signed up successfully"
    })
  } catch (error) {
    next(error)
  }
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new Error('Email does not exist'));
    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) return next(new Error('Password is not correct'))
    const accessToken = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: "30m"
    });
    await User.findByIdAndUpdate(user._id, { accessToken })
    res.status(200).json({
      data: { email: user.email, role: user.role },
      accessToken
    })
  } catch (error) {
    next(error);
  }
}

exports.getUsers = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({
    data: users
  });
}

exports.getUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) return next(new Error('User does not exist'));
    res.status(200).json({
      data: user
    });
  } catch (error) {
    next(error)
  }
}

exports.getUserStats = async (req, res, next) => {
    const {start, end} = req.query;
    if (!start || !end) {
      res.sendStatus(400);
    }
    const startDate = new Date(start);
    const endDate = new Date(end);
    const userId = req.params.userId;
    collectionService.getStats(userId, startDate, endDate)
      .then(response => {
        res.status(200).json({
          total: response
        });
      })
      .catch(err => {
        logger.error(`Error: ${err}. Stack: ${err.stack}`);
        return res.sendStatus(500);
      })
}

exports.updateUser = async (req, res, next) => {
  try {
    const { email, firstName, lastName, role } = req.body;
    const userId = req.params.userId;
    await User.findByIdAndUpdate(userId, { email, firstname, lastName, role });
    const user = await User.findById(userId)
    res.status(200).json({
      data: user
    });
  } catch (error) {
    next(error)
  }
}

exports.updateUserPass = async (req, res, next) => {
  try {
    const { password } = req.body;
    const userId = req.params.userId;
    const hashedPassword = await hashPassword(password);
    await User.findByIdAndUpdate(userId, { password: hashedPassword });
    const user = await User.findById(userId)
    res.status(200).json({
      data: user
    });
  } catch (error) {
    next(error)
  }
}

exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndDelete(userId);
    res.status(200).json({
      data: null,
      message: 'User has been deleted'
    });
  } catch (error) {
    next(error)
  }
}