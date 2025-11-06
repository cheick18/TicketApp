import jwt from "jsonwebtoken";

export const generateToken = ( userId, userRole ) => {
console.log(" role pour le token", userRole);
 return jwt.sign(
  { id: userId, role: userRole },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);
};

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token requis" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log ("deoce token ----", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Token invalide ou expiré" });
  }
};
