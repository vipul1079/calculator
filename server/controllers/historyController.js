const history=require("../models/history");

exports.getAll= async (req,res)=>{
    try {
        const allHistory  = await history.find();
        res.json(allHistory);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};

exports.create = async (req,res)=>{
    try {
        const {expression,result}=req.body;
        const createdHistory=await history.create({
            expression,result
        });
        res.json({ message: "history created successfully.", createdHistory });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

exports.delete = async (req,res) =>{
    try {
        const {id}=req.body;
        const deletedHistory=await history.findByIdAndRemove(id);
        res.json({ message: "history deleted successfully.", deletedHistory })
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}