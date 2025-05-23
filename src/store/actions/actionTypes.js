//Bước 2 khai báo acction type sau khi tạo các action (adminType) và export ở index.js
const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE', // định nghĩa 1 action để thay đổi ngôn ngữ redux

    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',


    //admin

    //action type gender  ( định nghĩa action type )
    FETCH_GENDER_START: 'FETCH_GENDER_START',
    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAIDED: 'FETCH_GENDER_FAIDED',

    //positon
    FETCH_POSITION_START: 'FETCH_POSITION_START',
    FETCH_POSITION_SUCCESS: 'FETCH_POSITION_SUCCESS',
    FETCH_POSITION_FAIDED: 'FETCH_POSITION_FAIDED',

    //ROLE
    FETCH_ROLE_START: 'FETCH_ROLE_START',
    FETCH_ROLE_SUCCESS: 'FETCH_ROLE_SUCCESS',
    FETCH_ROLE_FAIDED: 'FETCH_ROLE_FAIDED',

    //CRREATE NEW USER
    CREATE_NEW_USER_SUCCESS: 'CREATE_NEW_USER_SUCCESS',
    CREATE_NEW_USER_FAILED: 'CREATE_NEW_USER_FAILED',


    //GET ALL USER
    GET_ALL_USER_SUCCESS: 'GET_ALL_USER_SUCCESS',
    GET_ALL_USER_FAILD: 'GET_ALL_USER_FAILD',

    //DELETE USER
    DELETE_USER_BY_ID_SUCCESS: 'DELETE_USER_BY_ID_SUCCESS',
    DELETE_USER_BY_ID_FAILD: 'DELETE_USER_BY_ID_FAILD',

    //UPDATE USER
    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
    UPDATE_USER_FAILD: 'UPDATE_USER_FAILD',

    GET_ALL_DOCTOR_SUCCESS:'GET_ALL_DOCTOR_SUCCESS',
    GET_ALL_DOCTOR_FAILD:'GET_ALL_DOCTOR_FAILD',

    //CREATE MARKDOWN

    CREATE_MARKDOWN_SUCCESS:'CREATE_MARKDOWN_SUCCESS',
    CREATE_MARKDOWN_FAILD: 'CREATE_MARKDOWN_FAILD',


    /**
     * Home Page Active
     */

    GET_TOP_DOCTOR_SUCCESS: 'GET_TOP_DOCTOR_SUCCESS',
    GET_TOP_DOCTOR_FALLD: 'GET_TOP_DOCTOR_FALLD',


    //************ */
    GET_DETAIL_DOCTOR_BY_ID_SUCCESS: 'GET_DETAIL_DOCTOR_BY_ID_SUCCESS',
    GET_DETAIL_DOCTOR_BY_ID_FAILD: 'GET_DETAIL_DOCTOR_BY_ID_FAILD',


    FETCH_ROLE_DOCTOR_SUCCESS: 'FETCH_ROLE_DOCTOR_SUCCESS',
    FETCH_ROLE_DOCTOR_FAIDED: 'FETCH_ROLE_DOCTOR_FAIDED',

    BULK_CREATE_SCHEDULE_SUCCESS: 'BULK_CREATE_SCHEDULE_SUCCESS',
    BULK_CREATE_SCHEDULE_FAILD: 'BULK_CREATE_SCHEDULE_FAILD',

    GET_SCHDULE_DOCTOR_BY_ID_SUCCESS: 'GET_SCHDULE_DOCTOR_BY_ID_SUCCESS',
    GET_SCHDULE_DOCTOR_BY_ID_FAILD:'GET_SCHDULE_DOCTOR_BY_ID_FAILD',

    FETCH_DOCTOR_INFOR_SUCCESS: 'FETCH_DOCTOR_INFOR_SUCCESS',
    FETCH_DOCTOR_INFOR_FAILD: 'FETCH_DOCTOR_INFOR_FAILD',

    FETCH_MARKDOWN_DOCTOR_SUCCESS: 'FETCH_MARKDOWN_DOCTOR_SUCCESS',
    FETCH_MARKDOWN_DOCTOR_FAILD: 'FETCH_MARKDOWN_DOCTOR_FAILD',

    GET_EXTRA_INFOR_DOCTER_SUCCESS:'GET_EXTRA_INFOR_DOCTER_SUCCESS',
    GET_EXTRA_INFOR_DOCTER_FAILD:'GET_EXTRA_INFOR_DOCTER_FAILD',

    GET_PROFILE_DOCTOR_SUCCESS: 'GET_PROFILE_DOCTOR_SUCCESS',
    GET_PROFILE_DOCTOR_FAILD: 'GET_PROFILE_DOCTOR_FAILD',

    CREATE_BOOKING_PATTIENT_SUCCESS: 'CREATE_BOOKING_PATTIENT_SUCCESS',
    CREATE_BOOKING_PATTIENT_FAILD: 'CREATE_BOOKING_PATTIENT_FAILD',

    VERIFY_EMAIL_SUCCESS: "VERIFY_EMAIL_SUCCESS",
    VERIFY_EMAIL_FAILD:"VERIFY_EMAIL_FAILD",


    //specialty create
    CREATE_SPECIALTY_SUCCESS: 'CREATE_SPECIALTY_SUCCESS',
    CREATE_SPECIALTY_FAILD: 'CREATE_SPECIALTY_FAILD',

    GET_ALL_SPECIALTY_SUCCESS: 'GET_ALL_SPECIALTY_SUCCESS',
    GET_ALL_SPECIALTY_FAILD: 'GET_ALL_SPECIALTY_FAILD',

    GET_SPECIALTY_BY_ID_SUCCESS: 'GET_SPECIALTY_BY_ID_SUCCESS',
    GET_SPECIALTY_BY_ID_FAILD: 'GET_SPECIALTY_BY_ID_FAILD',

})
export default actionTypes;