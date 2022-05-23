const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
    let token = req.cookies.token;
    
    if(!token) return res.status(401).send('access denied, no token provide');
    try{
        const { _id, email } = jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(_id && email){
            req.user = { _id, email };
            next();
        }else{
            return res.status(401).send('invalid token');
        }
    }catch(err){
        return res.status(401).send('invalid token');
    }
}