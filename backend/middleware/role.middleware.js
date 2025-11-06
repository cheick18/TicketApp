export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({succes:false, message: "User not authenticades" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ succes:false, message: "forbien : aunothorized operation" });
    }

    next();
  };
};
