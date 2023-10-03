 const jwt = require('jsonwebtoken');

 exports = {};

 exports.getToken =(email,user)=>{
    const token = jwt.sign({identifier:user._id},"ThisKeyWillBeSecret");
    return token;
 };

 module.exports = exports;