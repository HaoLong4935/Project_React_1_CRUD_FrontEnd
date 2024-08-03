import axios from './axios.customize';
const createUserAPI = (fullName, email, password, phoneNumber) => {
    const URL_BACKEND = "/api/v1/user"
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phoneNumber
    }
    return axios.post(URL_BACKEND, data);
}

// BOOKS
const createBookAPI = (thumbnail, mainText, author, price, quantity, category) => {
    const URL_BACKEND = "/api/v1/book"
    const data = {
        thumbnail: thumbnail,
        mainText: mainText,
        author: author,
        price: price,
        quantity: quantity,
        category: category
    }
    return axios.post(URL_BACKEND, data)
}

const updateUserAPI = (_id, fullName, phoneNumber) => {
    const URL_BACKEND = "/api/v1/user"
    const data = {
        _id: _id,
        fullName: fullName,
        phone: phoneNumber
    }
    return axios.put(URL_BACKEND, data);
}

// BOOK API 
const updateBookAPI = (_id, thumbnail, mainText, author, price, quantity, category) => {
    const URL_BACKEND = "/api/v1/book"
    const data = {
        _id: _id,
        thumbnail: thumbnail,
        mainText: mainText,
        author: author,
        price: price,
        quantity: quantity,
        category: category
    }
    return axios.put(URL_BACKEND, data);
}

const fetchAllUsers = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`
    return axios.get(URL_BACKEND);
}

// BOOKS API
const fetchAllBooks = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/book?current=${current}&pageSize=${pageSize}`
    return axios.get(URL_BACKEND);
}

const deleteAUser = (_id) => {
    const URL_BACKEND = `/api/v1/user/${_id}`
    return axios.delete(URL_BACKEND);
}
// BOOKS API
const deleteABook = (_id) => {
    const URL_BACKEND = `/api/v1/book/${_id}`
    return axios.delete(URL_BACKEND);
}

const handleUploadFile = (file, folder) => {
    const URL_BACKEND = `/api/v1/file/upload`
    let config = {
        headers: {
            "upload-type": folder,
            "Content-Type": "multipart/form-data" // Nếu không có dòng này thì nó sẽ tự hiểu là string
        }
    }
    const bodyFormData = new FormData();
    bodyFormData.append("fileImg", file); // Truyền vào key và giá trị của nó 

    return axios.post(URL_BACKEND, bodyFormData, config);
}

const updateUserAvatarAPI = (avatar, _id, fullName, phoneNumber) => {
    const URL_BACKEND = "/api/v1/user"
    const data = {
        _id: _id,
        avatar: avatar,
        fullName: fullName,
        phone: phoneNumber
    }
    return axios.put(URL_BACKEND, data);
}

const registerAPI = (fullName, email, password, phoneNumber) => {
    const URL_BACKEND = "/api/v1/user/register"
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phoneNumber
    }
    return axios.post(URL_BACKEND, data);
}

const loginAPI = (email, password) => {
    const URL_BACKEND = "/api/v1/auth/login"
    const data = {
        username: email,
        password: password,
    }
    return axios.post(URL_BACKEND, data);
}

const getAccountAPI = () => {
    const URL_BACKEND = "/api/v1/auth/account"
    return axios.get(URL_BACKEND);
}


const logouAPI = () => {
    const URL_BACKEND = "/api/v1/auth/logout"
    return axios.post(URL_BACKEND);
}




export {
    createUserAPI, updateUserAPI, fetchAllUsers, deleteAUser, handleUploadFile, updateUserAvatarAPI, registerAPI, loginAPI, getAccountAPI, logouAPI
    , fetchAllBooks, createBookAPI, updateBookAPI, deleteABook
}