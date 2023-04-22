import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '@/utils/request'
import type { RootState } from './store'

// 为 slice state 定义一个类型
interface UserState {
    username: string,
    token: string,
}

interface LoginReq {
    username: string,
    uuid: string,
    password: string,
    code: string
}



// 使用该类型定义初始 state
const initialState: UserState = {
    token: '',
    username: ''
}


const login = (params: LoginReq): Promise<UserState> => axiosInstance.post('/login', params)

export const getLogin = createAsyncThunk('user/login', async (params: LoginReq) => {
    try {
        const response = await login(params);
        return response
    } catch (error) {
        // 处理错误
        throw new Error('Failed to fetch user data');
    }
});


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getLogin.fulfilled, (state, { payload }) => {
            localStorage.removeItem('uuid')
            localStorage.setItem('token', payload.token)
            return payload
        }),
            builder.addCase(getLogin.pending, (state, action) => {

            })
    },
})
// export const { increment, decrement, incrementByAmount, incrementIfOdd } = counterSlice.actions
// 选择器等其他代码可以使用导入的 `RootState` 类型
export const selectUser = (state: RootState) => state.user

export default userSlice.reducer




