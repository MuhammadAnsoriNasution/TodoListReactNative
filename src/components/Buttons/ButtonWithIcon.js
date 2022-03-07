import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { blue, white } from '../../utils/color';
import normalize from '../../utils/normalize';

export default function ButtonWithIcon({ backgroundColor, text, onPress, disabled }) {
    return (
        <TouchableOpacity onPress={() => onPress()} style={[styles.button, { backgroundColor: backgroundColor, }]} disabled={disabled}>
            <Icon name="plus" size={normalize(20)} color={white} />
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    button: {
        paddingVertical: normalize(9.5, 'height'),
        paddingHorizontal: normalize(15),
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: -10
    },
    text: {
        color: white,
        fontSize: normalize(20),
        marginLeft: normalize(8)
    }
});

ButtonWithIcon.defaultProps = {
    backgroundColor: blue,
    text: "Tambah",
    color: white,
    onPress: () => console.log('pres'),
    disabled: false
}