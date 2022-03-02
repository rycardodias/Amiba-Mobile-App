import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message'
import { useTranslation } from 'react-i18next'
import * as Yup from "yup";
import { Formik } from 'formik';
import { genders, races } from '../lib/values/types';
import { useIsFocused } from '@react-navigation/native';

// import { Divider } from 'react-native-elements';
import { CheckIcon, Select, Input, FormControl, Box, Text, Divider } from "native-base";

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
        if (isFocused)
            getInitialData()
    }, [isFocused]);

    async function handleChangeExploration(value) {
        await setexplorationId(value)
        await AsyncStorage.setItem('ExplorationId', value)
    }

    return (
        <Box alignItems="center" backgroundColor='#fff'>
            <Text bold mt={3} mb={2}>{t("Exploration")}</Text>
            <Select selectedValue={explorationId} minWidth="200"
                accessibilityLabel={t("Exploration")} placeholder={t("Exploration")}
                onValueChange={handleChangeExploration}
                _selectedItem={{ bg: "teal.600", endIcon: <CheckIcon size="5" /> }} >
                {explorations && explorations.map(item => {
                    return <Select.Item label={t(item.name)} key={item.id} value={item.id} />
                })}
            </Select>

            <Divider my="8" thickness="1" />

            <Formik validationSchema={fieldValidationSchema} initialValues={emptyObject}
                onSubmit={(values, { resetForm }) => { handleSubmit(values); resetForm() }} >
                {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
                    <View >
                        <Text bold mb={2}>{t("Identifier")}</Text>
                        <Input mb={4}
                            label={t('Identifier')}
                            placeholder={t('Identifier')}
                            onChangeText={handleChange('identifier')} onBlur={handleBlur('identifier')}
                            value={values.identifier}
                            errorMessage={Boolean(errors.identifier && touched.identifier) && errors.identifier}
                        />
                        <Text bold mb={2}>{t("Weight")}</Text>

                        <Input mb={4}
                            keyboardType='numeric'
                            label={t('Weight')}
                            placeholder={t('Weight')}
                            onChangeText={handleChange('weight')}
                            onBlur={handleBlur('weight')}
                            value={values.weight}
                            errorMessage={Boolean(errors.weight && touched.weight) && errors.weight}
                        />
                        <Text bold mb={2}>{t("Gender")}</Text>
                        <Select mb={2} selectedValue={values.gender} minWidth="200"
                            accessibilityLabel={t("Gender")} placeholder={t("Gender")}
                            onValueChange={handleChange('gender')} onBlur={handleBlur('gender')}
                            _selectedItem={{ bg: "teal.600", endIcon: <CheckIcon size="5" /> }}  >
                            {genders && genders.map(item => {
                                return <Select.Item label={t(item.name)} key={item.id} value={item.id} />
                            })}
                        </Select>

                        <Text bold mb={2}>{t("Race")}</Text>
                        <Select mb={3} selectedValue={values.race} minWidth="200"
                            accessibilityLabel={t("Race")} placeholder={t("Race")}
                            onValueChange={handleChange('race')} onBlur={handleBlur('race')}
                            _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size="5" />
                            }}  >
                            {races && races.map(item => {
                                return <Select.Item label={t(item.name)} key={item.id} value={item.id} />
                            })}
                        </Select>
                        <Button onPress={handleSubmit} title={t("Save")} disabled={!isValid} />
                    </View>
                )}
            </Formik >
        </Box >
    )
};

const styles = StyleSheet.create({
    select: {
        // width: 300,
        // minWidth:300,
        // marginVertical: 10,
        // width: 300,
        padding: 20,
    },
    input: {
        // width: 300,
        // minWidth:300,
        // marginVertical: 10,
        // width: 300,
        padding: 20,
        margin: 20
    }
});
