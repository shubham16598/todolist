const express = require("express");
const router = express.Router();

const Items = require("../../models/Item");
const Item = require("../../models/Item");

router.get('/', (req,res) => {
    Item.find()
        .sort({date : -1})
        .then(items => res.json(items))
});


router.get('/:id', (req,res) => {
    Item.findById(req.params.id, (err,todo) => {
       
        res.json(todo)
    })
})

router.post('/', (req,res) => {
    const newItem = new Item({
        name : req.body.name,
        priority : req.body.priority,
        completed :req.body.completed
    });

    newItem.save().then(item =>  {
        console.log(item);
        res.json(item)});
});


router.delete("/:id", (req,res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success : true})))
        .catch(err => res.status(404).json({success : false}));
})


router.put("/:id", (req,res) => {
//    Item.findByIdAndUpdate(req.params.id, {name : req.body.name})
//         .then(() => res.json({success : true}));

    Item.findById(req.params.id, (err, item) => {
        if(!item){
            res.status(404).send("Data not found");
        }else{
            item.name = req.body.name;          
            item.priority = req.body.priority;
            item.completed = req.body.completed;
            item.save().then(item => {
                console.log(item);
                res.json(item);
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            })
        }
    })
        
})


module.exports = router;