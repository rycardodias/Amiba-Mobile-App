import React, { useEffect, useState } from 'react'
import { Icon } from 'react-native-elements';
import { Pressable, Alert, View } from 'react-native';
import { getExplorations } from '../lib/requests/explorationsRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message'
import useAuth from '../hooks/useAuth';
import { useIsFocused } from '@react-navigation/native';

export const SyncOrganizationsExplorations = (props) => {
    const { t } = useTranslation()
    const isFocused = useIsFocused()
    const { isLoggedIn, logout } = useAuth()

    const [loggedIn, setloggedIn] = useState(false)

    useEffect(() => {

        (async function verifyLoggedIn() {
            const request = await isLoggedIn()

            if (request.user) {
                await setloggedIn(true)
            } else {
                await setloggedIn(false)
            }
        })()
    }, [isFocused, loggedIn, props.loggedIn])

    async function handleLogout() {
        await logout()
        await setloggedIn(!loggedIn)
    }

    async function syncExplorations() {
        const result = await isLoggedIn()

        if (!result.user) {
            return await props.showModal()
        } else {
            const explorations = await getExplorations()

            if (explorations.error || explorations.data.error)
                return Toast.show({ type: 'error', text1: 'Erro!', text2: `Erro ao procurar ${t("Explorations")}!` });

            await AsyncStorage.setItem("Explorations", JSON.stringify(explorations.data.data))

            return Toast.show({ type: 'success', text1: 'Sucesso!', text2: 'Dados atualizados!' });
        }
    }

    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <Pressable
                onPress={syncExplorations}
                style={{ marginRight: 20, }}
            >
                <Icon name="sync"></Icon>
            </Pressable>
            {loggedIn &&
                <Pressable
                    onPress={handleLogout}
                    style={{ marginRight: 20, }}
                >
                    <Icon name="logout"></Icon>
                </Pressable>
            }
        </View>
    )
}
