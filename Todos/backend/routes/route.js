const express=require('express');
const router=express.Router();
const userController=require('../Controllers/controller.js');
router.post('/postData',userController.PostUser);
router.post('/Login',userController.LoginUser);
router.post('/addTodo',userController.addTodo);
module.exports=router;