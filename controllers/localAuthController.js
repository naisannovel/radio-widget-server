const { LocalUser, validate } = require('../models/localUserModel');
const bcrypt = require('bcrypt');
const _ = require('lodash');

// signup

module.exports.signUp = async (req, res) => {

    const { value, error } = validate(req.body);
    if(error) return res.status(400).send({ message: error.details[0].message });

    let user = await LocalUser.findOne({
        email: req.body.email
    })

    if (user) return res.status(400).send({ message: "user already exist" });

    user = new LocalUser(value);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)

    const token = user.generateJWT()
    try{
        const result = await user.save()
        // res.status(200).send({token});
        // console.log(token);
        res.cookie('token',token, { maxAge: 60*60*1000, domain: "http://localhost:3000", signed: false })
        res.sendStatus(200);
    }catch(err){
        return res.status(400).send(err)
    }
}

// login

module.exports.login = async (req,res)=>{
    const user = await LocalUser.findOne({email:req.body.email});
    if(!user) return res.status(400).send({ message: 'Invalid email or password' })

    const validUser = await bcrypt.compare(req.body.password,user.password);
    if(!validUser) return res.status(400).send({ message: 'Invalid email or password' })

    const token = user.generateJWT();

    res.status(200).send({token});
}