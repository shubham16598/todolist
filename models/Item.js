const mongoose = require("mongoose");
const ItemSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    date : {
        type  : Date,
        default : Date.now
    },
    priority : {
        type : String
    },
    completed : {
        type : Boolean
    }
}, {
    timeStamps : true
});

module.exports = Item = mongoose.model("Item", ItemSchema);

