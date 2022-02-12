import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message'
import { HelperText } from 'react-native-paper';
import { useTranslation } from 'react-i18next'
import * as Yup from "yup";
import { Formik } from 'formik';
import { genders, races } from '../lib/values/types';
import { useIsFocused } from '@react-navigation/native';
import { Input, Icon, Text, Image } from 'react-native-elements';
import { Divider } from 'react-native-elements';
import useAuth from '../hooks/useAuth'

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

    const [explorations, setexplorations] = useState([]);
    const [explorationId, setexplorationId] = useState("");

    const fieldValidationSchema = Yup.object().shape({
        identifier: Yup.string().min(3, t("Too Short")).required(`${t('Identifier')} ${t('is required!')}`),
        race: Yup.string().required(`${t('Race')} ${t('is required!')}`),
        gender: Yup.string().required(`${t('Gender')} ${t('is required!')}`),
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

    // ### EXPLORATIONS FUNCTIONS

    async function getInitialData() {
        const explorations = await AsyncStorage.getItem("Explorations")

        await setexplorations(JSON.parse(explorations))

        const ExplorationId = await AsyncStorage.getItem("ExplorationId")

        await setexplorationId(ExplorationId)
    }

    useEffect(() => {
        getInitialData()
    }, [isFocused]);

    async function handleChangeExploration(value) {
        await setexplorationId(value)
        await AsyncStorage.setItem('ExplorationId', value)
    }
    const { logout } = useAuth()

    return (
        <View style={styles.container} >
            <Button title="Logout" onPress={logout}></Button>

            <Text style={styles.text}>{t("Exploration")}</Text>
            <Picker
                style={styles.picker}
                name="explorationId"
                selectedValue={explorationId}
                value={explorationId} onValueChange={handleChangeExploration}            >
                <Picker.Item key="" value="" label={t("Exploration")} />
                {explorations && explorations.map(item => {
                    return <Picker.Item key={item.id} value={item.id} label={t(item.name)} />
                })}
            </Picker>
            <Divider width={50} color='#fff' />


            <Formik
                validationSchema={fieldValidationSchema}
                initialValues={emptyObject}
                onSubmit={(values, { resetForm }) => { handleSubmit(values); resetForm() }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
                    <View >
                        <Text style={styles.text}>{t("Identifier")}</Text>
                        <Input
                            placeholder={t('Identifier')}
                            onChangeText={handleChange('identifier')}
                            onBlur={handleBlur('identifier')}
                            value={values.identifier}
                            errorMessage={Boolean(errors.identifier && touched.identifier) && errors.identifier}
                        />
                        <Text style={styles.text}>{t("Weight")}</Text>
                        <Input
                            keyboardType='numeric'
                            placeholder={t('Weight')}
                            onChangeText={handleChange('weight')}
                            onBlur={handleBlur('weight')}
                            value={values.weight}
                            errorMessage={Boolean(errors.weight && touched.weight) && errors.weight}
                        />

                        <Text style={styles.text}>{t("Gender")}</Text>
                        <Picker
                            style={styles.picker}
                            name="gender"
                            selectedValue={values.gender} value={values.gender}
                            onValueChange={handleChange('gender')} onBlur={handleBlur('gender')} >
                            <Picker.Item key="" value="" label={`${t("Select")} ${t("Gender")}`} />
                            {genders && genders.map(item => {
                                return <Picker.Item key={item.id} value={item.id} label={t(item.name)} />
                            })}
                        </Picker>
                        {/* {Boolean(errors.gender && touched.gender) &&
                            <HelperText type="error" visible={Boolean(errors.gender && touched.gender)}>{errors.gender}</HelperText>
                        } */}
                        <Text style={styles.text}>{t("Race")}</Text>
                        <Picker
                            style={styles.picker}
                            name="race"
                            selectedValue={values.race} value={values.race}
                            onValueChange={handleChange('race')} onBlur={handleBlur('race')} >
                            <Picker.Item key="" value="" label={`${t("Select")} ${t("Race")}`} />
                            {races && races.map(item => {
                                return <Picker.Item key={item.id} value={item.id} label={t(item.name)} />
                            })}
                        </Picker>



                        <Button onPress={handleSubmit} title={t("Save")} disabled={!isValid} />
                    </View>
                )}
            </Formik >
        </View >
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'center',
        // padding: 10,

    },
    logo: {
        width: 100,
        height: 100
    },
    text: {
        fontSize: 18,
        paddingStart: 10,
        fontWeight: 'bold',
    },
    picker: {
        padding: 20,
        margin: 10,
    }
});
