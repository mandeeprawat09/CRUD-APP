import User from "../models/userModel.js";

export const create = async (req, res) => {
  try {
    const userData = new User(req.body);
        // res.status(200).json({msg:"User Created Successfully"});

    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    // res.status(200).json({msg:"User Created Successfully"});

    const savedDatga = await userData.save();
    res.status(200).json({msg:"User Created Successfully"});

    
  } catch (error) {
    res.status(500).json({error: error});
  }
  
};

export const getAll = async (req, res) => { 
  try {
    const userDataa = await User.find();
    if (!userDataa) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userDataa);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getOne = async(req,res)=>{
  try{
      const id = req.params.id;
      const userExist = await User.findById(id);
      if(!userExist){
        return res.status(404).json({msg:"User not found"});
      }
      res.status(200).json(userExist);

  }catch(error){
    res.status(500).json({ error: error });

  }
}

export const update = async(req,res)=>{
    try{
      const id = req.params.id;
      const userExist = await User.findById(id);
      if(!userExist){
        return res.status(401).json({msg:"User not found"});
      }
      
      const updatedData = await User.findByIdAndUpdate(id,req.body,{new:true})
      res.status(200).json({msg:"User Updated Successfully"});


    }catch{
      res.status(500).json({ error: error });

    }
}

export const deleteUser = async(req,res)=>{
  try{
      const id = req.params.id;
      const userExist = await User.findById(id);
      if(!userExist){
        return res.status(404).json({msg:"User not found"});
      }

      await User.findByIdAndDelete(id);
       res.status(200).json({msg:"User Deleted  Successfully"});

  }catch(error){
    res.status(500).json({ error: error });

  }
}
