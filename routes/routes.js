const express = require('express');
const router = express.Router();
const {generateNewUserData,loginUser,addEmployee,allEmployee,singleEmployee,updateEmployee,deleteEmployee,searchEmployee} = require('../controller/userController');
const {addProject,allProject,singleProject,updateProject,deleteProject,searchProject} = require('../controller/projectController')
const {addClient,allClient,singleClient,updateClient,deleteClient,searchClient} = require('../controller/clientController')
const {addProduct,allProduct,singleProduct,updateProduct,deleteProduct,searchProduct} = require('../controller/productController')
const {addSale,allSale,singleSale,updateSale,deleteSale,searchSale} = require('../controller/saleController')
const authMiddleware = require('../other/authentication')

// Login
router.post('/register',generateNewUserData);
router.post('/login',loginUser);

// Employee
router.post('/employee',authMiddleware,addEmployee);
router.get('/employee/getAll',authMiddleware,allEmployee);
router.get('/employee/get',authMiddleware,singleEmployee);
router.post('/employee/update',authMiddleware,updateEmployee);
router.delete('/employee/delete',authMiddleware,deleteEmployee);
router.get('/employee/search',authMiddleware,searchEmployee);

// Project
router.post('/project/post',authMiddleware,addProject);
router.get('/project/getAll',authMiddleware,allProject);
router.get('/project/get',authMiddleware,singleProject);
router.post('/project/update',authMiddleware,updateProject);
router.delete('/project/delete',authMiddleware,deleteProject);
router.get('/project/search',authMiddleware,searchProject);

//Client
router.post('/client/post',authMiddleware,addClient);
router.get('/client/getAll',authMiddleware,allClient);
router.get('/client/get',authMiddleware,singleClient);
router.post('/client/update',authMiddleware,updateClient);
router.delete('/client/delete',authMiddleware,deleteClient);
router.get('/client/search',authMiddleware,searchClient);

//Product
router.post('/product/post',authMiddleware,addProduct);
router.get('/product/getAll',authMiddleware,allProduct);
router.get('/product/get',authMiddleware,singleProduct);
router.post('/product/update',authMiddleware,updateProduct);
router.delete('/product/delete',authMiddleware,deleteProduct);
router.get('/product/search',authMiddleware,searchProduct);

router.post('/sale/post',authMiddleware,addSale);
router.get('/sale/getAll',authMiddleware,allSale);
router.get('/sale/get',authMiddleware,singleSale);
router.post('/sale/update',authMiddleware,updateSale);
router.delete('/sale/delete',authMiddleware,deleteSale);
router.get('/sale/search',authMiddleware,searchSale);


module.exports = router;