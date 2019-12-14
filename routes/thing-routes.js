const express = require('express');
const router  = express.Router();
const uploader = require('../configs/cloudinary-setup')
// include the model:
const Thing = require('../models/thing-model');

router.get('/things', (req, res, next) => {
    Thing.find()
    .then(thingsFromDB => {
        res.status(200).json(thingsFromDB)
    })
    .catch(err => next(err))
})

router.get('/allPics', (req, res, next)=> {
    Thing.find().then(allPics => res.json({allPics}))
})

router.post('/upload', uploader.single("imageUrl"), (req, res, next) => {
    console.log('file is: ', req.file)

    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }

    Thing.create({imageUrl:req.file.secure_url})
    .then( aNewThing => {
        // console.log('Created new thing: ', aNewThing);
        //res.status(200).json(aNewThing);
        res.json({ secure_url: req.file.secure_url });

    })
    .catch( err => next(err) )
    
    // get secure_url from the file object and save it in the 
    // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
})

module.exports = router;
