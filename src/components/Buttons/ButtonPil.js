import React from 'react';
import { Pressable, StyleSheet, Text } from "react-native";
import { blue, white } from '../../utils/color';
import normalize from '../../utils/normalize';



export default function ButtonPil({ label, bgColor, color, onPress }) {
    return (
        <Pressable
            style={[styles.button, { backgroundColor: bgColor }]}
            onPress={() => onPress()}
        >
            <Text style={[styles.textStyle, { color: color }]}>{label}</Text>
        </Pressable>
    );
}


ButtonPil.defaultProps = {
    label: 'Button',
    bgColor: blue,
    color: white,
    onPress: () => console.log('press')
}
const styles = StyleSheet.create({
    button: {
        borderRadius: normalize(20),
        paddingHorizontal: normalize(32),
        paddingVertical: normalize(12),
        elevation: 2
    },
    textStyle: {
        fontSize: normalize(16),
        fontWeight: '600'
    }
})