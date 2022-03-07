import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { black, blue, white, white100 } from '../../utils/color';
import normalize from '../../utils/normalize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


export default function ButtonPilIcon({ bgColor, onPress, icon, listSort }) {
    const [showSort, setShowSort] = useState(false)
    return (
        <Pressable
            style={[styles.button, { backgroundColor: bgColor }]}
            onPress={() => {
                setShowSort(!showSort)
            }}
        >
            {icon}
            {
                showSort && <View style={styles.containerSort}>

                    {
                        listSort.map((item) => {
                            return <TouchableOpacity
                                style={styles.wrapItemSort}
                                onPress={() => {
                                    onPress(item)
                                    setShowSort(false)
                                }}
                                key={item.sort}
                            >
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name={item.icon} size={normalize(20)} color={blue} />
                                    <Text style={{ marginLeft: normalize(5) }}>{item.sort}</Text>
                                </View>
                                {
                                    item.active && <Icon name='check' size={normalize(20)} color={black} />
                                }
                            </TouchableOpacity>
                        })
                    }
                </View>
            }
        </Pressable>
    );
}


ButtonPilIcon.defaultProps = {
    bgColor: white,
    onPress: () => console.log('press'),
    icon: null
}
const styles = StyleSheet.create({
    wrapItemSort: {
        padding: normalize(17),
        borderBottomColor: white100,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    containerSort: {
        position: 'absolute',
        top: normalize(43),
        backgroundColor: white,
        zIndex: 90,
        width: normalize(190),
        borderRadius: normalize(6),
        backgroundColor: white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    button: {
        borderRadius: normalize(40),
        height: normalize(40),
        width: normalize(40),
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: normalize(10),
        position: 'relative'
    },
})