import React from 'react'
import { Icon } from 'react-native-elements';
import { Pressable, Alert } from 'react-native';
import { getOrganizations } from '../lib/requests/organizationsRequests';
import { getExplorations } from '../lib/requests/explorationsRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SyncOrganizationsExplorations = (props) => {

    async function syncOrganizationsExplorations() {
        // const organizations = await getOrganizations()
        // if (organizations.error || organizations.data.error) {
        //     return await props.handleToast('error', 'Erro!', `Erro ao procurar ${t("Organizations")}!`)
        // }

        // await AsyncStorage.setItem("Organizations", JSON.stringify(organizations.data.data))

        const explorations = await getExplorations()
        if (explorations.error || explorations.data.error) {
            return await props.handleToast('error', 'Erro!', `Erro ao procurar ${t("Explorations")}!`)
        }
        await AsyncStorage.setItem("Explorations", JSON.stringify(explorations.data.data))

        return await props.handleToast('success', 'Sucesso!', `Dados atualizados!`)
    }

    return (
        <Pressable
            onPress={syncOrganizationsExplorations}
            style={{ marginRight: 20, }}
        >
            <Icon name="sync"></Icon>
        </Pressable>
    )
}
