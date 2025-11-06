import { pool } from "../config/_db.js";
import { UserModel } from "../model/user.model.js";

// GET ALL USERS

export const getUsers = async (req, res) => {

 
  try {
     console.log("route pour users");
    const result =  await UserModel.getUsers();
  
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }

};

// GET USER

export const getUser = async (req, res) => {


  try {
    const { id } = req.params;
    const user = await UserModel.getUserById(id);

    if ( !user )
      return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, user:user});

  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


// DELETE USER
 export const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await UserModel.deleteUser(id);
      console.log("resultat dans le controller ticket",deleted)
      if (deleted===false){
         return (res.status(404).json({ message: "User not found" }))
        };
      res.status(201).json({ message: "Uer deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

// UPDATE USER


export const updateUser = async (req,res) => {
  try {
      const { id } = req.params;
      const { username, email, role } = req.body;
     console.log("update process")
       const user = await UserModel.updateUser(id, { username, email, role });
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json({ message: "User updated", user });
  } catch (error) {

     res.status(500).json({ message: error.message });
    
  }
  }
