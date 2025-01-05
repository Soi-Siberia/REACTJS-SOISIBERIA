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
    },

    DeleteUser: (idUser) => {
        return axios.delete('/api-delete-user', {
            data: {id: idUser}
        })
    },

    EditUser: (data) => {
        return axios.put('/api-edit-user',data)
    }

}


export default userService