import express from 'express'
import { edituser, test, updateuser,userlist,deleteUser,searchUsers } from '../controller/user.controller.js';
import { verifyToken } from '../utils/verifyuser.js';


const router = express.Router();

router.get('/',test)
router.post('/updated/:id',verifyToken , updateuser)
router.get('/users',userlist)
router.post('/edituser/:id',edituser)
router.delete('/delete/:id',deleteUser)
router.get('/search', searchUsers);

export default router;