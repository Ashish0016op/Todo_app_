const express=require('express');
const router=express.Router();
const userController=require('../Controllers/controller.js');
router.post('/postData',userController.PostUser);
router.post('/Login',userController.LoginUser);
router.get('/todos',userController.getAllTodo);
router.post('/addTodo',userController.addTodo);
router.put('/updateTodo/:id',userController.updateTask);
router.delete('/deleteTodo/:id',userController.deleteTask);
module.exports=router;
