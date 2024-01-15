import axios from "axios";
import { Hey_Server } from "../../main";
import { getChatFail, getChatRequest, getChatSuccess } from "../slice/chat";

export const getChat = (chatPayload) => async (dispatch) => {
  try {
    console.log(chatPayload);
    // dispatch(getChatRequest());
    const { data } = await axios.post(
      `${Hey_Server}/api/chat/save`,
      {
        chatPayload,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );
    // dispatch(getChatSuccess(data.result));
  } catch (error) {
    console.log(error);
    // dispatch(getChatFail(error.response.data.message));
  }
};

export const getChatBySenderAndReceiver = ({senderId, receiverId}) => async(dispatch) => {
  try {
    console.log(senderId, receiverId)
     dispatch(getChatRequest())
    const {data} = await axios.post(`${Hey_Server}/api/chat/get`, {
      senderId, receiverId
    },{
      headers:{
        "Content-Type": "application/json"
      },
      withCredentials: true
    } )
    dispatch(getChatSuccess(data.chat))
  } catch (error) {
    console.log(error)
    dispatch(getChatFail(error.response.data.message));
  }
}