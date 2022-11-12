import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react';
import moment from 'moment';
import * as images from './asserts/images/images'

export default function Today(data) {
    const { budgetList } = data;
    // const [dropdownImage, setDropdownImage] = useState()
    // budgetList.sort((a,b) => )
    const sorted =  budgetList?.sort((a, b) => { if (a.date > b.date) return 1; else return -1 });

    return (
        <>
        <View style={{width:'100%', paddingBottom: 150, justifyContent: 'center', alignItems: 'center'}}>
            {budgetList.length ? <>{sorted.map((item, index) => {
                const img = item?.dropdown == 'Electricity' ? images.electricity : item?.dropdown == 'Food' ? images.food : item?.dropdown == 'Home' ? images.home : item?.dropdown == 'Income' ? images.income : item?.dropdown == 'Movie' ? images.movie : images.travel;
                return <>
                    <View key={index} style={{ width: '80%', backgroundColor: item?.dropdown == 'Income' ? '#21CD9A' : '#fa8286', marginVertical: 5, borderRadius: 10, padding: 5, paddingHorizontal: 15 }}>
                        <Text style={{ color: '#000', fontSize: 18, fontWeight: '700' }}>{`${moment(item?.date).format('DD MMM, YYYY - ddd')}`}</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{flexDirection:'row',}}>
                                <View style={{ marginRight: 10, padding:3, backgroundColor:'#f7f6d5', borderRadius: 50}}>
                                <Image source={img} style={{height:30, width:30,}} />
                                </View>
                            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>{`${item?.dropdown}`}</Text>
                            </View>
                            <Text style={{ color: '#1c1c1c', fontSize: 18, fontWeight: '700' }}>{`₹ ${item?.amount}`}</Text>
                        </View>
                            {item?.notes && <Text style={{ color: '#000', fontSize: 18, fontWeight: '700' }}>{`${item?.notes}`}</Text>}
                    </View>
                </>
            })}</> : <Text>No Expenses or Income found</Text>}
        </View>
        </>
    )
}

const styles = StyleSheet.create({})