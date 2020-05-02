const bcrypt = require('bcrypt');

const user = [{id: 1 ,username: '1760051' , password: '$2b$10$FPaQuWvSF76ZUsyk51Fg9OztrVF8WvpE1ffaDviqat84/zB3.klPy' }];
function finduserbyid(id){
    return user.find(u => u.id === id);
}
function finduserbyusername(username){
    return user.find(u => u.username === username);
}
function hashpass(password){
    return bcrypt.hashSync(password, 10);
}
function verifypass(password,passhash){
    return bcrypt.compareSync(password, passhash);
}
module.exports = {
    finduserbyid,
    finduserbyusername,
    hashpass,
    verifypass
};