module.exports = {

  /**
    * TBD
    * Checks security specific rules before forwarding request further 
    * 
    * @param {object} req
    * @param {object} res
    * @param {object} next
    */
  security: (req, res, next) => {
    next();
  }
};