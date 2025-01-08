import actionTypes from './actionTypes';

// khi action ko tuyền data
export const appStartUpComplete = () => ({
    type: actionTypes.APP_START_UP_COMPLETE
});
// khi action có truyền data
export const setContentOfConfirmModal = (contentOfConfirmModal) => ({
    type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
    contentOfConfirmModal: contentOfConfirmModal
});


// action để thay đổi ngôn ngữ có data redux
export const changlanguages = (languageInput)=>({
    type: actionTypes.CHANGE_LANGUAGE,
    language: languageInput
})