import { Router ,Request ,Response } from 'express'
import { UserModel } from '../Models/user'
import { verifyToken } from './user';

const router = Router()


router.post('/profile',verifyToken,async (req : Request , res : Response)=>{
   const userid = req.body.xid ;
   try {
     const user = await UserModel.findById(userid) 
     if(!user){
      return res.status(400).json({message : 'user not found'})
     }
     res.status(200).json({availableMoney : user.availableMoney , username : user.username})
   } catch (error) {
      console.log(error);
      
   }
   

})
router.get('/profile/items/:id',verifyToken,async (req : Request , res : Response)=>{

const customerId = req.params.id

   const user = await UserModel.findById(customerId).populate('perchasedItems')
   
   res.json(user.perchasedItems)

})

export {router as profileRouter}