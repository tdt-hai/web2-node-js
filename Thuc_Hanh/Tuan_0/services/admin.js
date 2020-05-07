const bcrypt = require('bcrypt');

const admin = [{id: 1 ,email: 'admin@gmail.com' , password: '$2b$10$Yz4ykwvu0lC/yogNX1YjEeQ8RYux8gNhClIdPAkekb8wwwFGFU3hi' }];
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
    verifypass
};