const bcrypt = require('bcrypt');

const admin = [{id: 1 ,email: 'admin@gmail.com' , password: '$2b$10$GgEIqEJqA6epqNXzxfeSEefUr3oLPY0kDrXlt09sm6MOIcgRIyIw6' }];
function finduserbyid(id){
    return admin.find(u => u.id === id);
}
function finduserbyusername(email){
    return admin.find(u => u.email === email);
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
    verifypass,
};