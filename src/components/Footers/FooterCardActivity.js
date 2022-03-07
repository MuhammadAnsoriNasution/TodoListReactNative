import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons'
import { secondary } from '../../utils/color';
import { montName } from '../../utils/convert';
import normalize from '../../utils/normalize';
export default function FooterCardActivity({ data, onPress }) {
    var date = new Date(data.created_at);
    var tahun = date.getFullYear();
    var bulan = date.getMonth();
    var tanggal = date.getDate();



    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: normalize(13), fontWeight: '500' }} numberOfLines={1}>{`${tanggal} ${montName(bulan)} ${tahun}`}</Text>
            <TouchableOpacity onPress={() => onPress(data.id)}>
                <Icon name='trash' size={20} color={secondary} />
            </TouchableOpacity>
        </View>
    );
}
