import toast from "react-hot-toast";
import { Hey_Server } from "../../main";
import {  getAllGroupsFail, getAllGroupsRequest, getAllGroupsSuccess, getGroupFail, getGroupRequest, getGroupSuccess } from "../slice/group";
import axios from 'axios'

export const addGroups = (groupName) => async(dispatch) => {
    try {
        const {data} = await axios.post(`${Hey_Server}/api/group/add`, {
            groupName
          },{
            headers:{
              "Content-Type": "application/json"
            },
            withCredentials: true
          })
          console.log(data)
        toast.success(`${data.group.groupName} created`)

    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
}

export const getMyGroups = () => async(dispatch) => {
    try {
        dispatch(getGroupRequest())
        const {data} = await axios.get(`${Hey_Server}/api/group/mygroups`, {
            withCredentials: true
        })
        dispatch(getGroupSuccess(data.group))
    } catch (error) {
        console.log(error)
        dispatch(getGroupFail(error.response.data.message))
    }
}

export const getAllGroups = () => async(dispatch) => {
    try {
        dispatch(getAllGroupsRequest())
        const {data} = await axios.get(`${Hey_Server}/api/group/get`, {
            withCredentials: true
        })
        dispatch(getAllGroupsSuccess(data.allGroups))

    } catch (error) {
        console.log(error)
        dispatch(getAllGroupsFail(error.response.data.message))
        
    }
}

export const joinGroup = (groupId) => async(dispatch) => {
    console.log(groupId)
    try {
        
        const {data} = await axios.patch(`${Hey_Server}/api/group/join`, {groupId}, 
        {
            headers:{
              "Content-Type": "application/json"
            },
            withCredentials: true
          })
          console.log(data)
        toast.success(`${data.message} created`)

    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message || "Error Joining Group")
    }
}

