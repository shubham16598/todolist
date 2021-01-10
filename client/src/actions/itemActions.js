import axios from 'axios'

import {GET_ITEMS , GET_ITEM,ADD_ITEM,DELETE_ITEM , ITEMS_LOADING,UPDATE_ITEM} from './types';


export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios.get('/api/items').then(res => 
        dispatch({
            type : GET_ITEMS,
            payload : res.data
        }))
}


export const getItem = (id) => dispatch => {
    dispatch(setItemsLoading());
    axios.get(`/api/items/${id}`).then(res => {
        console.log(res.data.name)
        dispatch({
            type : GET_ITEM,
            payload : res.data
        })
    }
       )
}

export const addItem = (item) => dispatch => {
    axios.post('/api/items', item)
        .then(res => {
            console.log(res.data)
            dispatch({
                type : ADD_ITEM,
                payload : res.data
            })
        }          
    )
}

export const deleteItem = (id) => dispatch => {
   axios.delete(`/api/items/${id}`).then(res => {
    console.log("Item Deleted :", id)
    dispatch({
        type : DELETE_ITEM,
        payload : id
    })
   })
}


export const updateItem = (id, obj) => dispatch => {
    axios.put(`/api/items/${id}`,obj).then(res => dispatch({
        type : UPDATE_ITEM,
        payload : res.data
    })).then(res => {
        dispatch(getItems());
    })
 }


export const setItemsLoading = () => {
    return{
        type : ITEMS_LOADING,
       
    }
}




