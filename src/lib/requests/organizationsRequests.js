import { sendRequest } from './requests'

const getOrganizations = async () => {
    return await sendRequest('GET', 'organizations');
};

const getOrganizationId = async (id) => {
    return await sendRequest('GET', 'organizations/id/' + id);
};

const getOrganizationUserId = async (UserId) => {
    return await sendRequest('GET', 'organizations/UserId/' + UserId);
};

const getOrganizationsProductAvailable = async () => {
    return await sendRequest('GET', 'organizations/productAvailable');
};


const createOrganization = async (UserId, name, address, locale, zipcode, fiscalNumber, telephone, mobilePhone) => {
    return await sendRequest('POST', 'organizations/create', { UserId, name, address, locale, zipcode, fiscalNumber, telephone, mobilePhone })
};

const updateOrganization = async (id, UserId, name, address, locale, zipcode, fiscalNumber, telephone, mobilePhone) => {
    return await sendRequest('PUT', 'organizations/update', { id, UserId, name, address, locale, zipcode, fiscalNumber, telephone, mobilePhone })
};

const deleteOrganization = async (id) => {
    return await sendRequest('DELETE', 'organizations/delete', { id })
}

export { getOrganizations, getOrganizationId, getOrganizationUserId, getOrganizationsProductAvailable, createOrganization, updateOrganization, deleteOrganization }