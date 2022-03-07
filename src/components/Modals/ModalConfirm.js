import React from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { modaldeleteicon } from "../../assets/images";
import { danger, secondary300, secondary50 } from "../../utils/color";
import normalize from "../../utils/normalize";
import ButtonPil from "../Buttons/ButtonPil";

const ModalConfirm = ({ modalVisible, setModalVisible, message, hanldeConfirm }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <Pressable style={styles.wrapperContent}>
                <View style={styles.modalView}>
                    <Image source={modaldeleteicon} resizeMode="center" style={styles.icon} />
                    <Text style={styles.modalText}>{message}</Text>
                    <View style={styles.buttonWrapper}>
                        <ButtonPil label="Batal" bgColor={secondary300} color={secondary50} onPress={() => setModalVisible(false)} />
                        <ButtonPil label="Hapus" bgColor={danger} onPress={() => hanldeConfirm()} />
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
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
        width: normalize(260),
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

export default ModalConfirm;