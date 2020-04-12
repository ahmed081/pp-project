const JWT        = require("jsonwebtoken")



module.exports = (req,res,next)=>{

    //token verification
    
    if(req.url.split('/')[1] ==="login")
    {
        console.log(req.url)
        next()
    }else 
    if(req.query.token|| req.headers.token)
        {
            const secret = process.env.SECRET
            const token =req.query.token
            JWT.verify(token,secret,(err,paylaod)=>{
              if (err) {
                  return res.sendStatus(403);
              }

              req.paylaod = paylaod;
              next();
            })
            
        }
        else res.send("no access is authorised") 
        
}