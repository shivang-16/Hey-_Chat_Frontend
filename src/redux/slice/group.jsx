import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    groups: []
}

const groupSlice = createSlice({
    name:"Group",
    initialState,
    reducers:{
        addGroupRequest: (state) => {
          state.loading = true
        },
        addGroupSuccess: (state, action) => {
          state.loading = false;
          state.groups = action.payload
        },
        addGroupFail: (state, action) =>{
            state.loading = false;
            state.error = action.payload
        }
    }
})

export const { addGroupRequest, addGroupSuccess, addGroupFail } = groupSlice.actions
export default groupSlice.reducer