const Comment = require("../model/Comment");

const getComment=async(req,res)=>{
    let comment;
    try{
        comment=await Comment.find();
    }
    catch(err)
    {
        // console.log(comment);
        console.log(err);
    }
    if(!comment){
        return res.status(404).json({message:"No Comment found"});
    }
    return res.status(200).json({comment});
}


const addComment = async (req, res) => {
    let comment ;
    
    try{
        comment = new Comment({
            name : req.body.name, 
            text : req.body.text, 
            image : req.body.image, 
            date : req.body.date, 
            likes: req.body.likes
            
        });
        await comment.save();
    }catch(err){
        console.log(err);
    }
    if(!comment){
        return res.status(500).json({message : "Unable to Comment "});
    }
    return res.status(201).json({comment});
}


const updateLikes= async(req,res,next)=>{
    
    const {name,text,image,date,likes}=req.body;
    const id=req.params.id;
    let comment;
    
    // console.log(likes)
    try{
    
        comment=await Comment.findByIdAndUpdate(id,{
            name,
            text,
            image,
            date,
            likes
        });
        console.log(comment);
        await comment.save();
    }
    catch(err)
    {
        console.log(err);
    }

    if(!comment){
        return res.status(404).json({message:"Failed to Update"});
    }
    return res.status(201).json({comment});
    
};




exports.getComment=getComment;
exports.addComment = addComment ;
exports.updateLikes = updateLikes ;