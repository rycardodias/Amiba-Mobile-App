import { sendRequest } from './requests'

const getExplorations = async () => {
    return await sendRequest('GET', 'explorations');
};

const getExplorationId = async (id) => {
    return await sendRequest('GET', 'explorations/id/' + id);
};

const getExplorationUserId = async () => {
    return await sendRequest('GET', 'explorations/UserId');
};

const createExploration = async (OrganizationId, type, name, address, locale, zipcode, fiscalNumber, telephone, mobilePhone, gpsLocalization) => {
    return await sendRequest('POST', 'explorations/create', { OrganizationId, type, name, address, locale, zipcode, fiscalNumber, telephone, mobilePhone, gpsLocalization })
};

const updateExploration = async (id, type, name, address, locale, zipcode, fiscalNumber, telephone, mobilePhone, gpsLocalization) => {
    return await sendRequest('PUT', 'explorations/update', { id, type, name, address, locale, zipcode, fiscalNumber, telephone, mobilePhone, gpsLocalization })
};

const deleteExploration = async (id) => {
    return await sendRequest('DELETE', 'explorations/delete', { id })
}

export { getExplorations, getExplorationId, getExplorationUserId, createExploration, updateExploration, deleteExploration }