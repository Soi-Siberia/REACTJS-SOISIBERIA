import axios from '../axios';


const homePageService = {

    getTopDoctor: (limit)=>{
        return axios.get(`/api/get-top-doctor?limit=${limit}`)

    },

    getDetailDoctorById: (id) => {
        return axios.get(`/api/detail-doctor-by-id?id=${id}`)
    }
}

export default homePageService