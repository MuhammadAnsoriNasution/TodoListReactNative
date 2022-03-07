import axios from "axios";
import { email } from "../utils/account";
import axiosC from "../utils/Axios";

export function getDataActivity(setData, cberr) {
    axiosC.get('/activity-groups', {
        params: {
            email: email,
        }
    }).then((ress) => ress.data?.data ? setData(ress.data.data) : null)
        .catch((err) => cberr())
}

export function getDataTodo(setData, cberr, activity_group_id) {
    axiosC.get('/todo-items', {
        params: {
            activity_group_id: activity_group_id,
        }
    }).then((ress) => ress.data?.data ? setData(ress.data.data) : null)
        .catch((err) => cberr())
}
export function tambahAktivity(data, cb) {
    axiosC.post('/activity-groups', data).then((ress) => cb(true, ress.data))
        .catch((err) => cb(false, null))

}

export function editAktivity(data, cb) {
    axiosC.patch('/activity-groups/' + data.id, data).then((ress) => cb(true, ress.data))
        .catch((err) => cb(false, null))

}

export function deleteAktivity(id, cb) {
    axiosC.delete('/activity-groups/' + id)
        .then((ress) => {
            cb(true)
            console.log(ress)
        })
        .catch((err) => {
            cb(false)
            console.log(err, 'ini error')
        })

}


export function deleteTodoItem(id, cb) {
    axiosC.delete('/todo-items/' + id)
        .then((ress) => {
            cb(true)
            console.log(ress)
        })
        .catch((err) => {
            cb(false)
            console.log(err, 'ini error')
        })

}

export function tambahTodoItem(data, cb) {
    axiosC.post('/todo-items', data).then((ress) => cb(true, ress.data))
        .catch((err) => cb(false, null))
}

export function editTodoItem(data, cb) {
    axiosC.patch('/todo-items/' + data.id, data).then((ress) => cb(true, ress.data))
        .catch((err) => cb(false, null))

}