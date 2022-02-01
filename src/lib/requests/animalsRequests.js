import { sendRequest } from './requests'

const getAnimals = async () => {
    return await sendRequest('GET', 'animals');
};

const getAnimalId = async (id) => {
    return await sendRequest('GET', 'animals/id/' + id);
};

const getAnimalsExplorationIdCertificated = async (ExplorationId) => {
    return await sendRequest('GET', 'animals/ExplorationId/' + ExplorationId + '/certificated');
}

const createAnimal = async (identifier, race, ExplorationId, gender, birthDate, weight) => {
    return await sendRequest('POST', 'animals/create', { identifier, race, ExplorationId, gender, birthDate, weight })
};

const updateAnimal = async (id, slaughterDate, slaughterWeight, slaughterLocal, breeder) => {
    return await sendRequest('PUT', 'animals/update', { id, slaughterDate, slaughterWeight, slaughterLocal, breeder })
};

const deleteAnimal = async (id) => {
    return await sendRequest('DELETE', 'animals/delete', { id })
}

export { getAnimals, getAnimalId, getAnimalsExplorationIdCertificated, createAnimal, updateAnimal, deleteAnimal }
