import toast from "react-hot-toast";
import { Hey_Server } from "../../main";
import { addGroupRequest, addGroupSuccess } from "../slice/group";
import axios from 'axios'

export const getGroups = (groupName, messages) => async(dispatch) => {
    try {
        // console.log(groupName, messages)
        dispatch(addGroupRequest())
        const {data} = await axios.post(`${Hey_Server}/api/group/add`, {
            groupName, messages
          },{
            headers:{
              "Content-Type": "application/json"
            },
            withCredentials: true
          })
          console.log(data)
        dispatch(addGroupSuccess(data.groups))

    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
}