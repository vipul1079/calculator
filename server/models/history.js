const mongoose =require('mongoose');

const historySchema = new mongoose.Schema(
    {
        expression:{
            type:String,
            require:true,
        },
        result:{
            type:Number,
            require:true,
        }
    }
);

module.exports = history = mongoose.model("History",historySchema);