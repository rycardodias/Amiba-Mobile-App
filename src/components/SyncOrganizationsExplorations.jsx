import React from 'react'
import { Icon } from 'react-native-elements';
import { Pressable, Alert } from 'react-native';
import { getExplorations } from '../lib/requests/explorationsRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message'

export const SyncOrganizationsExplorations = (props) => {
    const { t } = useTranslation()

    async function syncExplorations() {
        const explorations = await getExplorations()

        if (explorations.error || explorations.data.error)
            return Toast.show({ type: 'error', text1: 'Erro!', text2: `Erro ao procurar ${t("Explorations")}!` });

        await AsyncStorage.setItem("Explorations", JSON.stringify(explorations.data.data))

        return Toast.show({ type: 'success', text1: 'Sucesso!', text2: 'Dados atualizados!' });
    }

    return (
        <Pressable
            onPress={syncExplorations}
            style={{ marginRight: 20, }}
        >
            <Icon name="sync"></Icon>
        </Pressable>
    )
}
