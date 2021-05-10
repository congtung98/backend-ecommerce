const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const shortid = require('shortid');

const generateJwtToken = (_id, role, firstName, lastName) => {
    return jwt.sign({ _id, role, firstName, lastName }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

exports.signUp = (req, res) => {
    User.findOne({ email: req.body.email })
    .exec( async (error, user) => {
        if(user) return res.status(400).json({
            message: 'User already registered'
        });
 
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body
        const hash_password = await bcrypt.hash(password, 10);
        const _user = new User({ 
            firstName,
            lastName,
            email,
            hash_password,
            username: shortid.generate()
        });

        _user.save((error, data) => {
            if(error){
                return res.status(400).json({
                    message: 'Something went wrong'
                });
            }

            if(data){
                const token = generateJwtToken(user._id, user.role);
                const { _id, firstName, lastName, email, role, fullName } = user;
                return res.status(201).json({
                    token,
                    user: { _id, firstName, lastName, email, role, fullName },
                });
            }
        });
    });
}

exports.signIn = (req, res) => {
    User.findOne({ email: req.body.email})
    .exec(async (error, user) => {
        if(error) return res.status(400).json({ error });
        if(user){
            const isPassword = await user.authenticate(req.body.password);
            if(isPassword && user.role === 'user'){
                const token = generateJwtToken(user._id, user.role, user.firstName, user.lastName);
                const { _id, firstName, lastName, email, role, fullName } = user;
                res.status(200).json({
                    token,
                    user: {
                        _id, firstName, lastName, email, role, fullName
                    }
                });
            }else{
                return res.status(400).json({ 
                    error: 'Wrong email or password!'
                });
            }
        }else{
            return res.status(400).json({error: 'Wrong email or password!'})
        }
    })
}
