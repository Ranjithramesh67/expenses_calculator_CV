import { Dimensions, Image, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import * as  images from "./asserts/images/images";
import moment from 'moment/moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import SelectDropdown from 'react-native-select-dropdown'

const { width, height } = Dimensions.get('screen');

const BottomSheet = (data) => {
    const { modalVisible, setModalVisible, addExpenses, budgetList, setBudgetList, setBudget } = data;
    const [amount, setAmount] = useState(null);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dropdown, setDropdown] = useState('Electricity');
    const [notes, setNotes] = useState('');
    const [dropdownImage, setDropdownImage] = useState(images.electricity);

    const countries = ["Electricity", "Food", "Home", "Income", "Movie", "Travel"]

    useEffect(() => {
        () => {
            setShowDatePicker(false);
            setDropdownImage(images.electricity);
        }
    }, []);

    const setAmountZero = () => { setAmount(0) };

    useEffect(() => {
        setAmountZero();
    }, [modalVisible, setModalVisible])

    function onDateSelected(event, value) {
        setDate(value);
        setShowDatePicker(false);
    };

    const save = async () => {
        if (addExpenses) {
            setBudgetList([...budgetList, { amount, date, dropdown: 'Income', notes }]);
            setBudget(val => parseFloat(val) + parseFloat(amount));
        }
        else {
            setBudgetList([...budgetList, { amount, date, dropdown, notes }])
            setBudget(val => parseFloat(val) - parseFloat(amount));
        }
        setModalVisible(false);

    }

    return (
        <ScrollView keyboardShouldPersistTaps="always">
            <Modal animationType="slide" transparent={true} visible={modalVisible} >
                <View style={[styles.modalContainer, { position: 'absolute' }]}>
                    <TouchableOpacity style={styles.modalContainer}
                        onPress={() => {
                            setModalVisible(false);
                            setDropdownImage(images.electricity);
                        }} />
                    <View style={styles.modal}>
                        <View style={{ flexDirection: 'row', marginBottom: 30, width: '90%', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: 30, height: 30, borderRadius: 30, backgroundColor: '#989898' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', }} onPress={() => setModalVisible(false)}>x</Text>
                            </View>
                            <Text style={{ width: '70%', fontSize: 20, fontWeight: '700', marginLeft: '20%' }}>Add Transaction </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                            {/* <Text style={{width: 20, marginRight: 30, fontSize:30}}>₹</Text> */}
                            <Image source={images.rupee} style={{ width: 30, height: 30, marginRight: 20 }} />
                            <TextInput
                                style={{ width: '70%', height: 30, borderBottomWidth: 1, borderColor: '#bababa', fontSize: 20, }}
                                placeholder='Amount'
                                keyboardType='number-pad'
                                onChangeText={setAmount} />
                        </View>
                        {!addExpenses && <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                            <Image source={dropdownImage} style={{ width: 30, height: 30, marginRight: 20 }} />
                            <SelectDropdown
                                buttonStyle={{ height: 40, width: "70%", }}
                                data={countries}
                                defaultButtonText={'Electricity'}
                                onSelect={(selectedItem, index) => {
                                    selectedItem == 'Electricity' ? setDropdownImage(images.electricity) : selectedItem == 'Food' ? setDropdownImage(images.food) : selectedItem == 'Home' ? setDropdownImage(images.home) : selectedItem == 'Income' ? setDropdownImage(images.income) : selectedItem == 'Movie' ? setDropdownImage(images.movie) : setDropdownImage(images.travel);
                                    setDropdown(selectedItem);
                                    console.log(selectedItem, index)
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                            />
                        </View>}
                        <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                            <Image source={images.calendar} style={{ width: 30, height: 30, marginRight: 20 }} />
                            <TouchableOpacity style={{ width: '70%', height: 30, borderBottomWidth: 1, borderColor: '#bababa', }}
                                onPress={() => setShowDatePicker(true)}>
                                <Text style={{ fontSize: 20, color: '#989898' }}>{!!date ? moment(date).format("DD MMM, YYYY") : 'Date'}</Text>
                            </TouchableOpacity>
                            {/* <TextInput
                            style={{ width: '70%', height: 30, borderBottomWidth: 1, borderColor: '#bababa', fontSize: 20 }}
                            placeholder='Date'
                        /> */}
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                            <Image source={images.notes} style={{ width: 30, height: 30, marginRight: 20 }} />
                            <TextInput
                                style={{ width: '70%', height: 30, borderBottomWidth: 1, borderColor: '#bababa', fontSize: 20 }}
                                placeholder='Notes'
                                // keyboardType='number-pad'
                                onChangeText={setNotes} />
                        </View>
                        <TouchableOpacity
                            style={{ backgroundColor: '#21CD9A', paddingHorizontal: 30, paddingVertical: 7, borderRadius: 25, marginTop: 10 }}
                            onPress={() => amount ? save() : ToastAndroid.show('Please Enter Amount', ToastAndroid.SHORT)}>
                            <Text style={{ fontSize: 22, color: '#fff', fontWeight: '600' }}>Save</Text>
                        </TouchableOpacity>
                        {showDatePicker && <DateTimePicker
                            value={date}
                            mode={'date'}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            is24Hour={true}
                            onChange={onDateSelected}
                            style={styles.datePicker}
                        />}
                    </View>
                </View>
            </Modal>
        </ScrollView>
    )
}

export default BottomSheet

const styles = StyleSheet.create({
    modalContainer: {
        width,
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.15)',
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'center',
    },
    modal: {
        width,
        paddingVertical: 20,
        marginTop: -20,
        backgroundColor: '#FDFFFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    datePicker: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 320,
        height: 260,
        display: 'flex',
    },
})