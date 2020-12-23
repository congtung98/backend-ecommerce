const jwt = require('jsonwebtoken');

//middleware thuc hien kiem tra token user
exports.requireSignIn = (req, res, next) => {

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;   
    }else {
        return res.status(400).json({ message: 'Authorization required' });
    }
    next();
    // jwt.decode()
}

//middleware kiem tra phan quyen nguoi dung
exports.userMiddleware = (req, res, next) => {
    if(req.user.role !== 'user'){
        return res.status(400).json({ message: 'User access denied' })
    }
    next();
}

//middleware kiem tra phan quyen quan tri
exports.adminMiddleware = (req, res, next) => {
    if(req.user.role !== 'admin'){
        return res.status(400).json({ message: 'Admin access denied' })
    }
    next();
}