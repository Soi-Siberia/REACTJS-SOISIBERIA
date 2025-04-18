// import { da } from 'date-fns/locale';
import axios from '../axios';


const userService = {
    handleLogin:  (emailcheck, passwordcheck)=>{
        return  axios.post('/api-login', {email : emailcheck, password: passwordcheck});
    },


    getAllUsers: (idUser) => {
        return axios.get(`/api-get-all-users?id=${idUser}`)
    },

    CreateNewUser: (data) => {
        // console.log("Check data from child: ", data)
        return axios.post('/api-create-user', data)
    },

    DeleteUser: (idUser) => {
        return axios.delete('/api-delete-user', {
            data: {id: idUser}
        })
    },

    EditUser: (data) => {
        return axios.put('/api-edit-user',data)
    },

    getAllCode: (typeInput) =>{
        return axios.get(`/api/allcode?type=${typeInput}`)
    },

    getAllDoctor: () => {
        return axios.get('/api/get-All-Doctor')
    },
    
    createMarkDown: (data) => {
        return axios.post('/api/create-update-markdown',data)
    },

    bulkCreateShedule: (data) => {
        return axios.post('/api/bulk-create-schedule', data)
    },

    getMarkdownDoctorByID: (id) =>{
        return axios.get(`/api/get-markdown-doctor-by-id?id=${id}`)
    },

    createBookingPattient: (data) => {
        return axios.post('/api/create-booking', data)
    },
    verifyEmailBooking: (data) => {
        return axios.post('/api/verify-email-booking', data)
    },

    createSpecialty:(data) => {
        return axios.post('/api/create-specialty',data)
    },

}


export default userService