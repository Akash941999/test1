const router = require('express').Router();
const verify = require('./verifyToken');
const employeeModel = require('../model/User2');


const {registerValidation,loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});



router.post('/addemp',verify , upload.single('employeeImage'), async (req,res)=>{


    const user = new employeeModel({
        name: req.body.name,
        department:req.body.department,
        salary: req.body.salary,
        post: req.body.post,
        employeeImage: req.file.path 
    });
    try{
        const savedUser = await user.save();
        res.send({user: user._id });

    }catch(err){
        res.status(400).send(err);
    }




//     res.json({posts: {title:"My first post",description: "random data you shouldnt access"}
// });
});

router.get('/listofEmployees',verify,function(req,res,next){

    employeeModel.find({post:"employee"},function(err,response){
      if(err)
      res.send(err);
      else
      res.send({status: 200,resultfound:response.length, employee: response});
    });
      
  });

router.get('/listofAdmins',verify,function(req,res,next){

    employeeModel.find({post:"admin"},function(err,response){
      if(err)
      res.send(err);
      else
      res.send({status: 200,resultfound:response.length, admin: response});
    });
      
  });

router.put('/updateEmployeeImage',verify, upload.single('employeeImage'),function(req,res,next){
    const id=req.query.userId ;
    const image = req.file.path; 
    employeeModel.findByIdAndUpdate(id,{employeeImage: image}, function(err,response){
      if(err)
      res.send(err);
      else
      res.send({status: 200,  employee: response});
    });
      
  });

router.delete('/deleteEmp',verify,function(req,res,next){
    const id=req.query.userId ;
    employeeModel.findByIdAndDelete(id, function(err,response){
      if(err)
      res.send(err);
      else
      res.send({status: 200,  employee: response});
    });
      
  });

  router.post('/addempimage',verify, async (req,res,next)=>{


    const user = new employeeModel({
        name: req.body.name,
        department:req.body.department,
        salary: req.body.salary,
        post: req.body.post
    });
    try{
        const savedUser = await user.save();
        res.send({user: user._id });

    }catch(err){
        res.status(400).send(err);
    }




//     res.json({posts: {title:"My first post",description: "random data you shouldnt access"}
// });
});


module.exports = router;