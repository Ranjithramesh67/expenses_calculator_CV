import { View, Text, Dimensions, ScrollView, StyleSheet, TextInput, TouchableOpacity, ToastAndroid, Image, BackHandler, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Today from './today';
import Month from './month';
import BottomSheet from './bottomSheet';
import * as images from './asserts/images/images';

const { width, height } = Dimensions.get('screen');

export default function Mainpage() {
    const [budget, setBudget] = useState(0);
    const [budgetList, setBudgetList] = useState([]);
    const [todayTab, setTodayTab] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [addExpenses, setAddExpenses] = useState(true);

    useEffect(() => {
        const backAction = () => {
            console.log("modalVisible", modalVisible);
            Alert.alert("Hold on!", "Are you sure you want to Exit App?", [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
          ]);
          return true;
        // }
    };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, []);

    const sortBudgetByDate = async () => {
        budgetList.sort((a, b) => { if (a.date > b.date) return -1; else return 1 });
    };
    useEffect(() => {
        sortBudgetByDate();
    }, [modalVisible, setModalVisible]);

    return (
        <>
            <View style={styles.topContainer}>
                <View style={styles.profile}>
                    <Text style={styles.title}>Coderz Vision</Text>
                    <Image source={images.user} style={styles.profilepic} />
                </View>
                <Text style={styles.budgetText}>My Budget</Text>
                <View style={styles.budgetCont}>
                    <Text style={styles.budgetValue}>{`₹ ${budget ? budget : 0}`}</Text>
                </View>
            </View>
            <ScrollView style={styles.mainContainerScroll}>
                <View style={styles.emptyContainer} />
                <View style={styles.mainContainer}>
                    <View style={styles.tabBar}>
                        <TouchableOpacity
                            style={[styles.todayTabColor, { backgroundColor: todayTab ? '#000' : '#fff' }]}
                            onPress={() => setTodayTab(true)}>
                            <Text style={{ color: todayTab ? '#fff' : '#000' }}>
                                Today
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.monthTabColor, { backgroundColor: todayTab ? '#fff' : '#000' }]}
                            onPress={() => setTodayTab(false)}>
                            <Text style={{ color: todayTab ? '#000' : '#fff' }}>
                                Month
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {todayTab ? <Today budgetList={budgetList} /> : <Month />}
                </View>
            </ScrollView>
            <View style={styles.addSubContainer}>
                <TouchableOpacity
                    style={styles.addBtn}
                    onLongPress={() => ToastAndroid.show('Add Income', ToastAndroid.SHORT)}
                    onPress={() => {
                        setModalVisible(true)
                        setAddExpenses(true)
                    }}>
                    <Text style={styles.symbol}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.subBtn}
                    onLongPress={() => ToastAndroid.show('Add Expense', ToastAndroid.SHORT)}
                    onPress={() => {
                        setModalVisible(true)
                        setAddExpenses(false)
                    }}>
                    <Text style={styles.symbol}>-</Text>
                </TouchableOpacity>
            </View>
            <BottomSheet
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                addExpenses={addExpenses}
                setBudget={setBudget}
                budgetList={budgetList}
                setBudgetList={setBudgetList} />
            {/* </View> */}

        </>
    )
}

const styles = StyleSheet.create({
    addBtn: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#21CD9A',
        borderRadius: 25
    },
    addSubContainer: {
        flexDirection: 'row',
        width: '80%',
        paddingVertical: 5,
        paddingHorizontal: '15%',
        // backgroundColor:'red',
        backgroundColor: '#d2d2d2',
        borderRadius: 30,
        zIndex: 3,
        position: 'absolute',
        bottom: 0,
        marginBottom: 25,
        justifyContent: 'space-between'
    },
    budgetCont: {
        flexDirection: 'row',
    },
    budgetText: {
        fontSize: 16,
        color: '#FDFFFF',
        fontWeight: '500'
    },
    budgetValue: {
        fontSize: 48,
        color: '#FDFFFF',
        fontWeight: '500',
        marginTop: 7
    },
    emptyContainer: {
        height: height / 3
    },
    mainContainer: {
        width,
        minHeight: height * 0.65,
        backgroundColor: '#FCFEFF',
        // marginTop: height / 3,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        alignItems: 'center',
        // zIndex: 9999
    },
    mainContainerScroll: {
        width: '100%',
        height,
        // backgroundColor:'red', 
        position: 'absolute'
    },
    modalContainer: {
        // width: '50%',
        // height: '20%',
        width,
        height: '100%',
        // backgroundColor: 'red',
        backgroundColor: 'rgba(0,0,0,0.15)',
        // paddingVertical: 20,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'center',
    },
    monthTabColor: {
        width: '50%',
        height: 50,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profile: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 30
    },
    profilepic: {
        width: 65,
        height: 65
    },
    subBtn: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fa8286',
        borderRadius: 25
    },
    symbol: {
        fontSize: 20, fontWeight: '800', color: '#fdffff'
    },
    tabBar: {
        flexDirection: 'row',
        width: '80%',
        backgroundColor: '#F1F2F8',
        marginVertical: 30,
        height: 50,
        borderRadius: 50,
        // justifyContent: 'space-between',
        // paddingHorizontal: '15%',
        // alignItems: 'center'
    },
    todayTabColor: {
        width: '50%',
        height: 50,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topContainer: {
        height: height / 3.5,
        // backgroundColor:'yellow',
        width,
        justifyContent: 'flex-start',
        paddingTop: '5%',
        paddingLeft: '7%'
    },
    title: {
        fontSize: 32,
        color: '#FDFFFF',
        fontWeight: '700',
        marginBottom: 40
    }
})