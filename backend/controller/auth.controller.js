import { pool } from "../config/_db.js";
import { generateToken } from "../middleware/auth.midleware.js";
import { UserModel } from "../model/user.model.js";
import bcrypt from 'bcrypt';
const saltRounds = 10;



export const register = async (req, res) =>{
    const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ success: false, message: "Please provide all fields" });
  }

  try {
  

    const existingUser = await UserModel.findByEmail(email);
    
    if (existingUser) return res.status(400).json({ message: "User already exist" });
  
    const newUser = await UserModel.createUser (username, email, password, role);

    const token = generateToken(newUser.id, newUser.role);
     res.status(201).json({ newUser, token });

  } catch (error) {
    
     res.status(500).json({ message: error.message });
    
    
  }

};


export const login = async ( req, res )=>{

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Please provide all fields" });
  }
  
  try {
    
     const user = await UserModel.findByEmail(email);
     if (!user) return res.status(400).json({ message: "User not found" });

     const valid = await bcrypt.compare(password, user.password);
     if (!valid) return res.status(401).json({ message: "Wrong password" });
      const token = generateToken( user.id, user.role );
      res.json({ user: { id: user.id, email: user.email }, token });



  } catch (error) {

     res.status(500).json({ message: error.message });
    
  }


}
/*

*/