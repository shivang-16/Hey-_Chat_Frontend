import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    groups: []
}

const groupSlice = createSlice({
    name:"Group",
    initialState,
    reducers:{
        getGroupRequest: (state) => {
            state.loading= true;
        },
        getGroupSuccess: (state, action) => {
            state.loading = false;
            state.groups = action.payload
        },
        getGroupFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})

export const allGroupSlice = createSlice({
    name: "All Groups",
    initialState: {loading: false, allGroups: []},
    reducers: {
        getAllGroupsRequest: (state) => {
            state.loading = true;
        },
        getAllGroupsSuccess: (state, action) => {
            state.loading = false;
            state.allGroups = action.payload
        },
        getAllGroupsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})

export const { getGroupFail, getGroupRequest, getGroupSuccess } = groupSlice.actions
export const { getAllGroupsFail, getAllGroupsRequest, getAllGroupsSuccess } = allGroupSlice.actions
export default groupSlice.reducer