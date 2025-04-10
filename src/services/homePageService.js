
import axios from '../axios';


const homePageService = {

    getTopDoctor: (limit)=>{
        return axios.get(`/api/get-top-doctor?limit=${limit}`)

    },

    getDetailDoctorById: (id) => {
        return axios.get(`/api/detail-doctor-by-id?id=${id}`)
    },

    getScheduleDoctorByID: (id) => {
        return axios.get(`/api/get-schedule-doctor-by-id?id=${id}`)
    },

    getExtraInforDoctorByID: (id) => {
        return axios.get(`/api/get-extra-infor-doctor-by-id?id=${id}`)
    },

    getProfileDoctorByID: (id) => {
        return axios.get(`/api/get-profile-doctor-by-id?id=${id}`)
    },

    getAllSpecialty: () => {
        return axios.get(`/api/get-all-specialty`)
    },
    getSpecialtyByID: (id) => {
        return axios.get(`/api/get-specialty-by-id?id=${id}`)
    }
}       

export default homePageService