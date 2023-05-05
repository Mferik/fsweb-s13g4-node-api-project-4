const uuid = require("uuid");

const createId = () => {
  return uuid.v1();
};

const initialUsers = () => {
  return [{ id: createId(), username: "admin", password: "1234" }];
};

let allUsers = initialUsers()

const getAllUsers = () =>{
    return allUsers
}

const getById = (id) => {
    let user = null;
    for(let i = 0; i< allUsers.length; i++){
        const element = allUsers[i]
        if(element.id == id){
            user = element
            break;
        }
    }
    return user
}

const insert = (user) => {
    user.id= createId()
    allUsers.push(user)
    return user
}

const checkLogin = (user) => {
    let isFinded = null;
    for(let i = 0; i < allUsers.length; i++){
        const item = allUsers[i]
        if(user.username == item.username && user.password && item.password){
            isFinded= item;
            break;
        }
    }
    return isFinded
}

module.exports = {
    getAllUsers,
    getById,
    insert,
    checkLogin
}