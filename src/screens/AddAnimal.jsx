import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message'
import { HelperText, TextInput, Title } from 'react-native-paper';
import { useTranslation } from 'react-i18next'
import * as Yup from "yup";
import { Formik } from 'formik';
import { genders, races } from '../lib/values/types';
import { useIsFocused } from '@react-navigation/native';
import { Input, Icon } from 'react-native-elements';
import { Divider } from 'react-native-elements';

export const AddAnimal = (props) => {
    const { t } = useTranslation()
    const isFocused = useIsFocused()
    const emptyObject = {
        identifier: "",
        ExplorationId: "",
        race: "",
        gender: "",
        birthDate: "02-01-2022",
        weight: "",
        slaughterDate: "",
        slaughterWeight: "",
        slaughterLocal: "",
        breeder: "",
    }

    // const [organizations, setorganizations] = useState([]);
    const [explorations, setexplorations] = useState([]);
    // const [organizationId, setorganizationId] = useState("");
    const [explorationId, setexplorationId] = useState("");
    // const [explorationsFiltered, setexplorationsFiltered] = useState([]);

    const fieldValidationSchema = Yup.object().shape({
        identifier: Yup.string().min(3, t("Too Short")).required(`${t('Identifier')} ${t('is required!')}`),
        race: Yup.string().required(`${t('Race')} ${t('is required!')}`),
        // ExplorationId: Yup.string().required(`${t('Exploration')} ${t('is required!')}`),
        // birthDate: Yup.date().required(`${t('Birth Date')} ${t('is required!')}`),
        weight: Yup.number().required(`${t('Weight')} ${t('is required!')}`),
    });

    async function handleSubmit(values) {
        try {
            const { identifier, race, gender, birthDate, weight } = values

            const ExplorationId = await AsyncStorage.getItem('ExplorationId')

            if (!(identifier && race && gender && ExplorationId && birthDate && weight)) {
                return Toast.show({ type: 'error', text1: 'Erro!', text2: 'Parametros em falta!' });
            }

            const animalAux = { ...values, ExplorationId: ExplorationId }

            const existingData = await AsyncStorage.getItem('AnimalStorage')

            if (!existingData) {
                await AsyncStorage.setItem('AnimalStorage', JSON.stringify([animalAux]))
            } else {
                let newArray = []
                const parsed = JSON.parse(existingData)

                for (const element of parsed) {
                    newArray.push(element)
                }
                newArray.push(animalAux)

                await AsyncStorage.setItem('AnimalStorage', JSON.stringify(newArray))
            }
            Toast.show({ type: 'success', text1: 'Sucesso!', text2: 'Registo adicionado com sucesso!' });
        } catch (error) {
            Toast.show({ type: 'error', text1: 'Erro!', text2: 'Erro ao adicionar registo!' });
        }
    }

    // ### ORG EXPLORATIONS FUNCTIONS

    async function getInitialData() {
        const explorations = await AsyncStorage.getItem("Explorations")
        // const organizations = await AsyncStorage.getItem("Organizations")

        await setexplorations(JSON.parse(explorations))
        // await setorganizations(JSON.parse(organizations))

        // const OrganizationId = await AsyncStorage.getItem("OrganizationId")
        const ExplorationId = await AsyncStorage.getItem("ExplorationId")

        // await setorganizationId(OrganizationId)
        await setexplorationId(ExplorationId)
    }

    useEffect(() => {
        getInitialData()
    }, [isFocused]);

    // async function handleChangeOrganization(value) {
    //     await setorganizationId(value)
    //     await AsyncStorage.setItem('OrganizationId', value)

    //     let filtered = explorations

    //     filtered = await filtered.filter(item => item.OrganizationId === value)

    //     await setexplorationsFiltered(filtered)
    // }

    async function handleChangeExploration(value) {
        await setexplorationId(value)
        await AsyncStorage.setItem('ExplorationId', value)
    }

    // ### TOASTS

    function handleToast() {
        const { type, text1, text2 } = props.toastObject
        if (!(type && text1 && text2)) return console.log("Toast invalid")

        Toast.show({
            type: type,
            text1: text1,
            text2: text2
        });
    }

    useEffect(() => {
        handleToast()
    }, [props.toastObject,])

    return (
        <View style={styles.container} >
            <Button title="Test" onPress={() => AsyncStorage.clear()}></Button>
            {/* <Picker name="organizationId" selectedValue={organizationId} value={organizationId} onValueChange={handleChangeOrganization}            >
                <Picker.Item key="" value="" label={t("Organization")} />
                {organizations && organizations.map(item => {
                    return <Picker.Item key={item.id} value={item.id} label={t(item.name)} />
                })}
            </Picker>

            <Picker name="explorationId" selectedValue={explorationId} value={explorationId} onValueChange={handleChangeExploration}            >
                <Picker.Item key="" value="" label={t("Exploration")} />
                {explorationsFiltered && explorationsFiltered.map(item => {
                    return <Picker.Item key={item.id} value={item.id} label={t(item.name)} />
                })}
            </Picker> */}

            <Picker name="explorationId" selectedValue={explorationId} value={explorationId} onValueChange={handleChangeExploration}            >
                <Picker.Item key="" value="" label={t("Exploration")} />
                {explorations && explorations.map(item => {
                    return <Picker.Item key={item.id} value={item.id} label={t(item.name)} />
                })}
            </Picker>
            <Formik
                validationSchema={fieldValidationSchema}
                initialValues={emptyObject}
                onSubmit={(values, { resetForm }) => { handleSubmit(values); resetForm() }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
                    <View >
                        <Input
                            placeholder={t('Identifier')}
                            onChangeText={handleChange('identifier')}
                            onBlur={handleBlur('identifier')}
                            value={values.identifier}
                            errorMessage={Boolean(errors.identifier && touched.identifier) && errors.identifier}
                        />

                        <Picker name="race" selectedValue={values.race} value={values.race}
                            onValueChange={handleChange('race')} onBlur={handleBlur('race')} >

                            <Picker.Item key="" value="" label={`${t("Select")} ${t("Race")}`} />

                            {races && races.map(item => {
                                return <Picker.Item key={item.id} value={item.id} label={t(item.name)} />
                            })}
                        </Picker>
                        <HelperText type="error" visible={Boolean(errors.race && touched.race)}>{errors.race}</HelperText>

                        <Input
                            keyboardType='numeric'
                            placeholder={t('Weight')}
                            onChangeText={handleChange('weight')}
                            onBlur={handleBlur('weight')}
                            value={values.weight}
                            errorMessage={Boolean(errors.weight && touched.weight) && errors.weight}
                        />

                        <Picker name="gender"
                            selectedValue={values.gender} value={values.gender}
                            onValueChange={handleChange('gender')} onBlur={handleBlur('gender')} >
                            <Picker.Item key="" value="" label={`${t("Select")} ${t("Gender")}`} />
                            {genders && genders.map(item => {
                                return <Picker.Item key={item.id} value={item.id} label={t(item.name)} />
                            })}
                        </Picker>
                        <HelperText type="error" visible={Boolean(errors.race && touched.race)}>{errors.race}</HelperText>

                        <Button onPress={handleSubmit} title={t("Save")} disabled={!isValid} />
                    </View>
                )}
            </Formik >
            <Toast />
        </View >
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 100,
        height: 100,
    },
});
