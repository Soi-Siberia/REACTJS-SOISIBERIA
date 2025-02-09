import axios from '../axios';


const homePageService = {

    getTopDoctor: (limit)=>{
        return axios.get(`/api/get-top-doctor?limit=${limit}`)

    }
}

export default homePageService