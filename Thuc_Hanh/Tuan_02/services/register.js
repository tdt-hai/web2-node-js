
var user = {
    name: [],
    email: [],
    sdt: [],
}
function addname(name){
    user.name.push(name);
    return user.name;
}
function addemail(email){
    user.email.push(email);
    return user.email;
}
function addsdt(sdt){
    user.sdt.push(sdt);
    return user.sdt;
}
module.exports = {
    addname,
    addemail,
    addsdt,
    user
}