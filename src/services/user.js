// CRUD

const { User } = require('../models/index');

const getUser = async (email) => {
     try {
        const user = await User.findByPk(email);
        return {user:user};
        
     } catch(err) {
          console.log(err);
          return {error:{message:"something went wrong in getUser",code:500}}
     }
}

const createUser = async(user) => {
     try {
        const newUser = await User.create(user);
        return {user:newUser};
     } catch(err) {
        console.log(err);
        return {error:{message:"something went wrong in createUser",code:500}};
     }
 }
 
 const deleteUser = async(id) => {
   try {
     const user = await User.destroy({where: {id:id}});
     return {user:user};
  } catch(err) {
     console.log(err);
     return {error:{message:"something went wrong in deleteUser",code:500}};
 } 
 }
 
 const updateUser = async(updates) => {
   try {
     const newUser = await User.update(updates,{where:{id:updates.id}});
     return {updatedUser: newUser[1]}; 
   } catch(err) {
     console.log(err);
     return {error:{message:"something went wrong in deleteUser",code:500}};
   }
 
 }

const getAllUsers = async() => {
  try {
    const users = await User.findAll();
    return {users:users};
  } catch(err) {
    console.log(err);
    return {error:{message:"something went wrong in deleteUser",code:500}};
  }

} 
 
 module.exports = {
   getUser,
   createUser,
   deleteUser,
   updateUser,
   getAllUsers
 }

