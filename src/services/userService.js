import axios from '../axios';


const userService = {
    handleLogin:  (emailcheck, passwordcheck)=>{
        return  axios.post('/api-login', {email : emailcheck, password: passwordcheck});
    },


    getAllUsers: (idUser) => {
        return axios.get(`/api-get-all-users?id=${idUser}`)
    }

}


export default userService