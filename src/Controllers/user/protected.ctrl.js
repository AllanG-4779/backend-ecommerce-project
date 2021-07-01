const visitPost = (req,res)=>{
    console.log(req.user)
    res.status(200).json({Message:"Looks like you are logged In"})
}
module.exports = {visitPost}