const historyController=require('../controllers/historyController');
const express=require('express');
const router=express.Router();


//get All
router.get('/all',historyController.getAll);

//create new
router.post('/create',historyController.create);

//delete 
router.delete('/delete/:id',historyController.delete);

module.exports=router;