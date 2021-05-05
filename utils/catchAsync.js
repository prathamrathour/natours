module.exports = fn=>{
    return(req, res, next)=>{
        fn(Req,res,next).catch(next);
    };
};