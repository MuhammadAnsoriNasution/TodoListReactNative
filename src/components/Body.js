import React from 'react';
import { View, Text } from 'react-native';
import { white } from '../utils/color';
import normalize from '../utils/normalize';
import Toast from 'react-native-toast-message'

export default function Body({ children }) {
    return (
        <View style={{
            flex: 1,
            paddingHorizontal: normalize(20),
            paddingTop: normalize(28),
            backgroundColor: white
        }}>
            <Toast style={{ zIndex: 9 }} accessibilityLabel="modal-information" />
            {children}
        </View>
    );
}
