import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons'
import { black, secondary200 } from '../../utils/color';
import normalize from '../../utils/normalize';
export default function FormWithIcon({ value, onChange, onPress }) {
    return (
        <View style={styles.container}>
            <TextInput style={styles.textinput} value={value} onChange={(e) => onChange(e.nativeEvent.text)} />
            <TouchableOpacity onPress={() => onPress()} >
                <Icon name='pencil' size={20} color />
            </TouchableOpacity>
        </View>
    );
}

FormWithIcon.defaultProps = {
    value: '',
    onChange: () => console.log('')
}
const styles = StyleSheet.create({
    container: {
        borderBottomColor: secondary200,
        borderBottomWidth: 2,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: -10
    },
    textinput: {
        flex: 1,
        fontWeight: '600',
        fontSize: normalize(16),
        lineHeight: normalize(24),
        color: black
    }
})