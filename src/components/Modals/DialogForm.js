import React, { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from 'react-native-toast-message';
import { tambahTodoItem } from "../../store/actions";
import { black, blue, white, white100 } from "../../utils/color";
import { datapriority } from "../../utils/DataPriority";
import normalize from "../../utils/normalize";
import ButtonPil from "../Buttons/ButtonPil";
import DropdownListInput from "../Dropdown/DropdownLisTInput";


const DialogForm = ({ modalVisible, setModalVisible, title, dataActivity, setDataTodos, itemTodo, handleUpdate }) => {
    const [listPriority, setListPriority] = useState(datapriority)
    const [configInput, setConfigInput] = useState([
        { field: 'nama', borderColor: white100 },
        { field: 'priority', borderColor: white100 }
    ])

    const [namaTodoItem, setnamaTodoItem] = useState('')
    const showToast = (type = 'success', title, message) => {
        Toast.show({
            type: type,
            text1: title,
            text2: message
        });
    }
    useEffect(() => {
        if (itemTodo) {
            setnamaTodoItem(itemTodo.title)
            setListPriority(p => p.map((item) => item.value == itemTodo.priority ? { ...item, active: true } : item))
        }

    }, [])
    const onFocusOrBlud = (field, color) => {
        setConfigInput(p => p.map((item) => item.field == field ? { borderColor: color, field: field } : item))
    }

    const getBorderColor = (field) => {
        return configInput.find((item) => item.field == field)?.borderColor
    }

    const handlePilihPriority = (priority) => {
        onFocusOrBlud('priority', white100)
    }

    const handleSimpan = () => {
        if (itemTodo) {
            handleUpdate({ ...itemTodo, title: namaTodoItem, priority: listPriority.find((item) => item.active == true).value }, itemTodo.is_active)
        } else {
            tambahTodoItem({ activity_group_id: dataActivity.id, title: namaTodoItem, priority: listPriority.find((item) => item.active == true).value }, cb)
        }
    }


    const cb = (status, ress) => {
        const aksi = 'tambah'
        if (status) {
            showToast('success', 'Success', 'Berhasil melakukan ' + aksi + ' aktivity')
            setModalVisible(false)
            setDataTodos(p => [ress, ...p])
        } else {
            showToast('error', 'Error!', 'Gagal melakukan ' + aksi + ' aktivity')
        }
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false);
            }}
        >
            <Pressable style={styles.wrapperContent}>
                <View style={styles.modalView}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{title}</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text>X</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.wrapperInput}>
                            <Text style={[styles.title, { fontSize: normalize(12), marginBottom: normalize(10) }]}>NAMA LIST ITEM</Text>
                            <TextInput
                                style={[styles.borderInput, { borderColor: getBorderColor('nama') }]}
                                placeholder="Tambahkan nama list item"
                                onBlur={() => onFocusOrBlud('nama', white100)}
                                onFocus={() => onFocusOrBlud('nama', blue)}
                                onChange={(e) => setnamaTodoItem(e.nativeEvent.text)}
                                value={namaTodoItem}
                            />
                        </View>
                        <DropdownListInput
                            borderActive={getBorderColor('priority')}
                            data={listPriority}
                            onPress={() => {
                                onFocusOrBlud('priority', blue)
                            }}
                            onSelect={handlePilihPriority}
                            setData={setListPriority}
                        />
                    </View>
                    <View style={styles.wrapFooter}>
                        <ButtonPil
                            label={"Simpan"}
                            onPress={() => handleSimpan()}
                        />
                    </View>
                </View>
            </Pressable>
        </Modal>

    );
};

const styles = StyleSheet.create({
    wrapFooter: {
        width: '100%',
        alignItems: 'flex-end'
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingBottom: normalize(10),
        borderBottomColor: white100,
        borderBottomWidth: 2,

    },
    wrapperInput: {
        marginVertical: normalize(23)
    },
    body: {
        flexDirection: 'column',
        width: '100%',
    },
    borderInput: {
        borderWidth: 1,
        borderColor: white100,
        backgroundColor: white,
        borderRadius: normalize(6),
        padding: normalize(16),
        fontSize: normalize(14)

    },
    title: {
        fontSize: normalize(16),
        fontWeight: '600',
        color: black,
        lineHeight: normalize(24)
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        width: normalize(70),
        height: normalize(70)
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: normalize(10),
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: normalize(310),
        paddingHorizontal: normalize(28),
        paddingVertical: normalize(26),
        zIndex: 2
    },

    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    wrapperContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.1)',

    },
    buttonWrapper: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    }
});

export default DialogForm;