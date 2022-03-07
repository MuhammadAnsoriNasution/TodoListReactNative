import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { black, white } from '../../utils/color';
import normalize from '../../utils/normalize';
import FooterCardActivity from '../Footers/FooterCardActivity';
const width = Dimensions.get('window').width / 2
export default function CardAktivity({ data, onPressDelete, onPress }) {
    return (
        <TouchableOpacity style={styles.container} onPress={() => onPress()}>
            <Text style={styles.title} numberOfLines={2}>{data.title}</Text>
            <FooterCardActivity data={data} onPress={onPressDelete} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
        backgroundColor: white,
        borderRadius: normalize(12),
        paddingHorizontal: normalize(17),
        paddingTop: normalize(13),
        paddingBottom: normalize(17),
        flexDirection: 'column',
        width: width - normalize(25),
        height: width - normalize(25),
        justifyContent: 'space-between',
        marginBottom: normalize(20),
    },
    title: {
        fontWeight: 'bold',
        fontSize: normalize(16),
        lineHeight: normalize(21),
        color: black
    }
})