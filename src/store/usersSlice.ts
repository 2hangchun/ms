import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '@/utils/request'
import type { RootState } from './store'

// 为 slice state 定义一个类型
interface UserState {
    users: User[];
}

interface User {
    id: number;
    name: string;
    age: number;
    gender: string;
    email: string;
}

// 使用该类型定义初始 state
const initialState: UserState = {
    users: []
}


export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const response = await axiosInstance.get(`/users`);
        return response.data;
    } catch (error) {
        // 处理错误
        throw new Error('Failed to fetch user data');
    }
});


export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload.users
        })
    },
})
// export const { increment, decrement, incrementByAmount, incrementIfOdd } = counterSlice.actions
// 选择器等其他代码可以使用导入的 `RootState` 类型
export const selectUsers = (state: RootState) => state.users.users

export default usersSlice.reducer




