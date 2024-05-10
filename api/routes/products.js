const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{

        res.status(200).json({
            message: 'handling get requests to /products'
        });

});

router.get('/:productId',(req,res,next)=>{

    const id = req.params.productId;
    if(id=== 'special')
        {
            res.status(200).json({
                message: 'you discovered the special id',
                id: id
            });
        }
        else{
            res.status(200).json({message: 'you passed an ID'});
        }
});

router.post('/',(req,res,next)=>{
    res.status(200).json({
        message: 'handling get requests to /products'
    });
});

router.patch('/',(req,res,next)=>{
    res.status(200).json({
        message: 'handling get requests to /products'
    });
});






router.patch()

module.exports = router;