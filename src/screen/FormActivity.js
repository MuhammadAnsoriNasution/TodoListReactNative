import CheckBox from '@react-native-community/checkbox';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/EvilIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { todoemptystate } from '../assets/images';
import Body from '../components/Body';
import ButtonPilIcon from '../components/Buttons/ButtonPilIcon';
import ButtonWithIcon from '../components/Buttons/ButtonWithIcon';
import FormWithIcon from '../components/Forms/FormWithIcon';
import DialogForm from '../components/Modals/DialogForm';
import ModalConfirm from '../components/Modals/ModalConfirm';
import { deleteTodoItem, editAktivity, editTodoItem, getDataTodo, tambahAktivity } from '../store/actions';
import { email } from '../utils/account';
import { black, secondary, secondary100, white } from '../utils/color';
import { getColorPriorityByValue } from '../utils/DataPriority';
import normalize from '../utils/normalize';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
const win = Dimensions.get('window');
const ratio = win.width / 541; //541 is actual image width
export default function FormActivity({ navigation, route }) {
    const [data, setData] = useState(route.params)
    const [title, setTitle] = useState('')
    const [dataTodos, setDataTodos] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleConfirm, setModalVisibleConfirm] = useState(false)
    const itemTodo = useRef(null)
    const [listSort, setListSort] = useState([
        { sort: 'Terbaru', 'icon': 'sort-ascending', active: false },
        { sort: 'Terlama', 'icon': 'sort-descending', active: false },
        { sort: 'A-Z', 'icon': 'sort-alphabetical-ascending', active: false },
        { sort: 'Z-A', 'icon': 'sort-alphabetical-descending', active: false },
        { sort: 'Belum Selesai', 'icon': 'compare-vertical', active: false },
    ])
    useEffect(() => {
        if (data) {
            setTitle(data.title)
            getDataTodo(setDataTodos, () => console.log('err'), data.id)
        }

    }, [])
    const handleSave = () => {
        if (title) {
            if (data) {
                editAktivity({ title: title, id: data.id },
                    (status, ress) => {
                        cb(status, ress)
                    })
            } else {
                tambahAktivity({ title: title, email: email },
                    (status, ress) => {
                        cb(status, ress)
                    })
            }

        } else {
            showToast('success', 'Peringatan', 'Title tidak boleh kosong')
        }
    }
    const cb = (status, ress) => {
        const aksi = data ? 'update' : 'tambah'
        if (status) {
            setData(ress)
            showToast('success', 'Success', 'Berhasil melakukan ' + aksi + ' aktivity')
        } else {
            showToast('error', 'Error!', 'Gagal melakukan ' + aksi + ' aktivity')

        }
    }
    const showToast = (type = 'success', title, message) => {
        Toast.show({
            type: type,
            text1: title,
            text2: message
        });
    }

    const cbDelete = (status) => {
        setModalVisibleConfirm(false)
        if (status) {
            setDataTodos(p => p.filter((item) => item.id !== itemTodo.current.id))
            showToast('success', 'Success', 'Berhasil melakukan hapus todo item')
        } else {
            showToast('error', 'Error!', 'Gagal melakukan hapus todo item')
        }
        itemTodo.current = null
    }
    const handleDelete = () => {
        deleteTodoItem(itemTodo.current.id, cbDelete)
    }

    const handleConfirmDelete = (data) => {
        itemTodo.current = data
        console.log(data)
        setModalVisibleConfirm(true)
    }

    const handleUpdate = (data, is_active) => {
        editTodoItem({ ...data, is_active: is_active }, cbUpdateTodo)
    }

    const cbUpdateTodo = (status, data) => {
        setModalVisible(false)
        if (status) {
            setDataTodos(p => p.map((item) => item.id == data.id ? data : item))
            showToast('success', 'Success', 'Berhasil melakukan update todo item')
        } else {
            showToast('error', 'Error!', 'Gagal melakukan update aktivity')
        }
        itemTodo.current = null
    }

    const openModalUpdate = (data) => {
        setModalVisible(true)
        itemTodo.current = data
    }

    const onSelectSort = (item) => {
        setListSort(p => p.map(data => data.sort == item.sort ? ({ ...data, active: true }) : ({ ...data, active: false })))
        console.log(item.sort)
        if (item.sort == 'Terbaru') {
            setDataTodos(p => p.sort((a, b) => (a.id < b.id) ? 1 : ((b.id < a.id) ? -1 : 0)))
        } else if (item.sort == 'Terlama') {
            setDataTodos(p => p.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)))
        } else if (item.sort == 'A-Z') {
            setDataTodos(p => p.sort((a, b) => (a.title < b.title) ? 1 : ((b.title < a.title) ? -1 : 0)))
        } else if (item.sort == 'Z-A') {
            setDataTodos(p => p.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)))
        } else {
            setDataTodos(p => p.sort((a, b) => (a.is_active > b.is_active) ? 1 : ((b.is_active > a.is_active) ? -1 : 0)))
        }
    }

    console.log(dataTodos)
    return (
        <Body>
            {/* <Toast style={{ zIndex: 900, }} position="top" /> */}

            <FormWithIcon value={title} onChange={(e) => setTitle(e)} onPress={() => handleSave()} />
            <View style={styles.wrapperButton} accessibilityLabel="activity-add-button">
                {
                    dataTodos.length ? <ButtonPilIcon
                        icon={<Icon name="refresh"
                            size={normalize(40)}
                            color={secondary}
                        />
                        }
                        listSort={listSort}
                        onPress={onSelectSort}
                    /> : null
                }
                <ButtonWithIcon onPress={() => setModalVisible(true)} disabled={data ? false : true} />
            </View>
            {
                data ?
                    <FlatList
                        data={dataTodos}
                        renderItem={({ item }) => {
                            const status = item.is_active ? true : false;
                            return <View style={styles.containerItemTodo} accessibilityLabel="todo-item">
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <CheckBox
                                        disabled={false}
                                        value={status}
                                        onValueChange={(newValue) => {
                                            handleUpdate(item, newValue)
                                        }
                                            // setDataTodos(p => p.map((itemdata) => itemdata.id == item.id ? { ...item, is_active: newValue } : itemdata))
                                        }
                                    />
                                    <View
                                        style={[styles.colorPriority, { backgroundColor: getColorPriorityByValue(item.priority), }]}
                                    />

                                    <Text style={[styles.todoTitle, { textDecorationLine: item.is_active ? 'line-through' : 'none' }]} numberOfLines={1}>{item.title}</Text>
                                    <TouchableOpacity onPress={() => openModalUpdate(item)}>
                                        <Octicons name='pencil' size={14} color={'#C4C4C4'} />
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={() => handleConfirmDelete(item)}>
                                    <Icon size={normalize(20)} name="trash" color={secondary} />
                                </TouchableOpacity>
                            </View>
                        }}

                        contentContainerStyle={{ paddingBottom: normalize(40), paddingHorizontal: normalize(20), paddingTop: normalize(27) }}
                        showsVerticalScrollIndicator={false}
                        style={{ marginHorizontal: normalize(-20), marginTop: normalize(10) }}
                    />
                    :
                    <View style={styles.listEmpty} accessibilityLabel="todo-empty-state">
                        <Image source={todoemptystate} style={styles.vectorEmpty} resizeMode="center" />
                        <Text style={styles.textEmpty}>Buat List Item kamu</Text>
                    </View>
            }


            {
                modalVisible && <DialogForm
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    dataActivity={data}
                    title="Tambah List Item"
                    setDataTodos={setDataTodos}
                    itemTodo={itemTodo.current}
                    handleUpdate={handleUpdate}
                    accessibilityLabel="modal-add"
                />
            }

            {
                modalVisibleConfirm && <ModalConfirm
                    modalVisible={modalVisibleConfirm}
                    setModalVisible={setModalVisibleConfirm}
                    hanldeConfirm={() => handleDelete()}
                    message={`Apakah anda yakin menghapus List Item “${itemTodo.current.title}”?`}
                    accessibilityLabel="modal-delete"
                />
            }


        </Body>
    );
}

const styles = StyleSheet.create({
    todoTitle: {
        fontSize: normalize(14), lineHeight: normalize(21), color: black, marginRight: normalize(10),
    },
    vectorEmpty: {
        width: win.width,
        height: 362 * ratio,
    },
    listEmpty: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    textEmpty: {
        fontWeight: '600',
        fontSize: normalize(16),
        textAlign: 'center',
        lineHeight: normalize(24),
        color: secondary100,
        marginTop: normalize(35)
    },
    wrapperButton: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: '100%',
        marginTop: normalize(24),
        zIndex: 9,
        flexDirection: 'row'
    },
    containerItemTodo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: normalize(19),
        backgroundColor: white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginVertical: 10,
        borderRadius: normalize(12),
        paddingVertical: normalize(22),
        zIndex: -900

    },
    colorPriority: {

        width: normalize(10),
        height: normalize(10),
        borderRadius: normalize(10),
        marginRight: normalize(10)

    }
})