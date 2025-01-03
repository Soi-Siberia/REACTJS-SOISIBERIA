import axios from '../axios';


const userService = {
    handleLogin:  (emailcheck, passwordcheck)=>{
        return  axios.post('/api-login', {email : emailcheck, password: passwordcheck});
    },


    getAllUsers: (idUser) => {
        return axios.get(`/api-get-all-users?id=${idUser}`)
    },

    CreateNewUser: (data) => {
        console.log("Check data from child: ", data)
        return axios.post('/api-create-user', data)
    }

}


export default userService