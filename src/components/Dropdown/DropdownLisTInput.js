import React, { useState } from "react";
import { Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import { black, white, white100 } from "../../utils/color";
import normalize from "../../utils/normalize";

export default function DropdownListInput({ data, onPress, onSelect, borderActive, setData }) {
    const [showListPriority, setShowListPriority] = useState(false)

    const getPriorityActive = () => {
        const priority = data.find((item) => item.active == true)
        if (priority) {
            return <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <View style={[styles.coloPriority, { backgroundColor: priority.color, }]} />
                    <Text>{priority.priority}</Text>
                </View>
                <Icon name="down" size={normalize(14)} color={black} />
            </View>
        } else {
            return <Text>Pilih Priority</Text>
        }
    }
    return (
        <View style={styles.wrapperInput}>
            <Text style={[styles.title, { fontSize: normalize(12), marginBottom: normalize(10) }]}>PRIORITY</Text>
            <View style={{ position: 'relative' }}>
                <TouchableOpacity
                    style={[styles.borderInput, { borderColor: borderActive }]}
                    onPress={() => {
                        onPress()
                        setShowListPriority(true)
                        Keyboard.dismiss()
                    }}>
                    {
                        getPriorityActive()
                    }
                </TouchableOpacity>
                {
                    showListPriority &&
                    <View style={styles.wrapperListPriority}>
                        <TouchableOpacity style={[styles.borderInput, styles.wraplabelPilihPriority]} onPress={() => {
                            setShowListPriority(false)
                            onPress()
                            Keyboard.dismiss()

                        }}>
                            <Text style={styles.labelpilihPriority}>Pilih priority</Text>
                            <Icon name="up" size={normalize(14)} color={black} />
                        </TouchableOpacity>
                        <ScrollView>
                            {
                                data.map((item) => {
                                    return <TouchableOpacity
                                        style={[
                                            styles.borderInput,
                                            styles.itemPriority,
                                        ]}
                                        onPress={() => {
                                            onSelect(item.priority)
                                            setData(p => p.map((itemMap) => itemMap.priority == item.priority ? { ...itemMap, active: true, } : { ...itemMap, active: false, }))
                                            setShowListPriority(false)
                                        }}
                                        key={item.priority}
                                    >
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={[styles.coloPriority, { backgroundColor: item.color, }]} />
                                            <Text>{item.priority}</Text>
                                        </View>
                                        {
                                            item.active && <Icon name="check" size={normalize(14)} color={black} />
                                        }

                                    </TouchableOpacity>
                                })
                            }
                        </ScrollView>
                    </View>
                }
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    wrapperListPriority: {
        position: "absolute",
        top: 0,
        width: '100%',
        backgroundColor: white,
        borderRadius: normalize(8),
        overflow: 'hidden',
        zIndex: 1
    },
    labelpilihPriority: {
        fontWeight: '400',
        color: black,
        fontSize: normalize(14),
        lineHeight: normalize(21)
    },
    wraplabelPilihPriority: {
        borderRadius: 0,
        backgroundColor: white100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    itemPriority: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 0,
        justifyContent: 'space-between'
    },
    coloPriority: {
        width: normalize(10),
        height: normalize(10),
        borderRadius: normalize(10),
        marginRight: normalize(10)
    },

    wrapperInput: {
        marginVertical: normalize(23)
    },

    borderInput: {
        borderWidth: 1,
        borderColor: white100,
        backgroundColor: white,
        borderRadius: normalize(6),
        padding: normalize(16),
        fontSize: normalize(14)

    },
});