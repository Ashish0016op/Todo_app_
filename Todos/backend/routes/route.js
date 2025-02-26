const express=require('express');
const router=express.Router();
const userController=require('../Controllers/controller.js');
router.post('/postData',userController.PostUser);
router.post('/Login',userController.LoginUser);
// Todo routes with userId
router.get('/todos/:userId', userController.getAllTodo);
router.post('/addTodo', userController.addTodo);
router.put('/updateTodo/:id', userController.updateTask);
router.delete('/deleteTodo/:id', userController.deleteTask);
module.exports=router;
