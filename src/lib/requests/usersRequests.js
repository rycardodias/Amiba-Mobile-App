import { sendRequest } from './requests'
// import Cookies from 'js-cookie';

const getUsers = async () => {
    return await sendRequest('GET', 'users');
};

const getUserId = async (id) => {
    return await sendRequest('GET', 'users/id/' + id);
};

const createUser = async (name, email, password, address, locale, zipcode, fiscalNumber, telephone, mobilePhone) => {
    return await sendRequest('POST', 'users/create', { name, email, password, address, locale, zipcode, fiscalNumber, telephone, mobilePhone })
};

const updateUser = async (id, name, email, password, address, locale, zipcode, fiscalNumber, telephone, mobilePhone) => {
    return await sendRequest('PUT', 'users/update', { id, name, email, password, address, locale, zipcode, fiscalNumber, telephone, mobilePhone })
};

const deleteUser = async (id) => {
    return await sendRequest('DELETE', 'users/delete', { id })
}

const login = async (email, password) => {
    return await sendRequest('POST', 'users/login', { email, password });
}

const logout = async () => {
    // Cookies.remove('token')
    return await sendRequest('POST', 'users/logout');
};

const getUserByToken = async () => {
    return await sendRequest('GET', 'users/me')
}

const validateToken = async () => {
    return await sendRequest('GET', 'users/validateToken')
}

const tokenPermission = async () => {
    return await sendRequest('GET', 'users/tokenPermission')
}

const updateAddress = async (address, locale, zipcode) => {
    return await sendRequest('PUT', 'users/update', { address, locale, zipcode });
};

const updatePassword = async (oldPassword, newPassword) => {
    return await sendRequest('PUT', 'users/update/password', { oldPassword, newPassword });
};

export { getUsers, getUserId, createUser, updateUser, deleteUser, login, logout, updateAddress, updatePassword, getUserByToken, validateToken, tokenPermission }