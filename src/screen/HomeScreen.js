import { useIsFocused } from "@react-navigation/native"
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { activityemptystate } from '../assets/images'
import Body from '../components/Body'
import ButtonWithIcon from '../components/Buttons/ButtonWithIcon'
import CardAktivity from '../components/Cards/CardActivity'
import ModalConfirm from '../components/Modals/ModalConfirm'
import { deleteAktivity, getDataActivity } from '../store/actions'
import { black, secondary100 } from '../utils/color'
import normalize from '../utils/normalize'
import Toast from 'react-native-toast-message';

const win = Dimensions.get('window');
const ratio = win.width / 541; //541 is actual image width

export default function HomeScreen({ navigation }) {
    const isFocused = useIsFocused();

    const [data, setData] = useState([])
    const [refresh, setRefresh] = useState(true)
    const [modalVisible, setModalVisible] = useState(false);
    const idActivity = useRef(null)

    useEffect(() => {
        if (refresh || isFocused) {
            getDataActivity(cbFetchSuccess, () => showToast('error', 'Error!', 'Gagal mengambil data ke server'))
        }
    }, [refresh, isFocused])

    const handleDelete = () => {
        deleteAktivity(idActivity.current, cb)
    }

    const handleConfirmDelete = (id) => {
        idActivity.current = id
        setModalVisible(true)
    }
    const showToast = (type = 'success', title, message) => {
        Toast.show({
            type: type,
            text1: title,
            text2: message
        });
    }

    const cbFetchSuccess = (param) => {
        setData(param)
        setRefresh(false)
    }

    const cb = (status) => {
        idActivity.current = null
        setModalVisible(false)
        if (status) {
            showToast('success', 'Success', 'Berhasil Hapus')
            setRefresh(true)

        } else {
            showToast('Error', 'Gagal melakukan tambah aktivity')
        }
    }

    return (
        <Body>
            <View style={styles.wraphead}>
                <Text style={styles.wrapheadText}>Activity</Text>
                <ButtonWithIcon onPress={() => navigation.navigate('FormActivity')} accessibilityLabel="activity-add-button" />
            </View>

            {
                data.length ?
                    <FlatList
                        data={data}
                        renderItem={({ item }) => {
                            return <CardAktivity
                                data={item}
                                onPressDelete={handleConfirmDelete}
                                onPress={() => navigation.navigate('FormActivity', item)}
                                accessibilityLabel="activity-item"
                            />
                        }}
                        numColumns={2}
                        horizontal={false}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        contentContainerStyle={{ paddingBottom: normalize(40), paddingHorizontal: normalize(20), paddingTop: normalize(27) }}
                        showsVerticalScrollIndicator={false}
                        style={{ marginHorizontal: normalize(-20), marginTop: normalize(10) }}
                    />
                    :
                    <View style={styles.listEmpty} accessibilityLabel="activity-empty-state">
                        <Image source={activityemptystate} style={styles.vectorEmpty} resizeMode="center" />
                        <Text style={styles.textEmpty}>Buat activity pertamamu</Text>
                    </View>

            }

            <ModalConfirm
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                hanldeConfirm={() => handleDelete()}
                message={`Apakah anda yakin menghapus activity “${data.find((item) => item.id == idActivity.current)?.title}”?`}
                accessibilityLabel="modal-delete"
            />
        </Body>
    )
}


const styles = StyleSheet.create({
    wraphead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: -10
    },
    wrapheadText: {
        fontWeight: 'bold',
        fontSize: normalize(16),
        lineHeight: normalize(24),
        color: black
    },
    listEmpty: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    vectorEmpty: {
        width: win.width,
        height: 362 * ratio,
    },
    textEmpty: {
        fontWeight: '600',
        fontSize: normalize(16),
        textAlign: 'center',
        lineHeight: normalize(24),
        color: secondary100,
        marginTop: normalize(35)
    },
    list: {
        // flex: 1,
        // flexDirection: 'column',
    }
})