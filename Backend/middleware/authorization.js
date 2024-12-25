const authorization = (x) => {
    return (req, res, next) => { 
      if (!req.token.role.permissions.includes(x)) {
        return res.status(403).json({
          success: false,
          message: `Unauthorized`,
        });
      }
      next();
    };
  };
  
  module.exports = authorization;