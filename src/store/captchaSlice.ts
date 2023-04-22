import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '@/utils/request'
import type { RootState } from './store'

// 为 slice state 定义一个类型
interface CaptchaState {
    img: string,
    uuid: string
}


// 使用该类型定义初始 state
const initialState: CaptchaState = {
    img: '',
    uuid: ''
}

const getCaptcha = (): Promise<CaptchaState> => axiosInstance.get('/captcha')

export const fetchCaptcha = createAsyncThunk('captcha/fetchCaptcha', async () => {
    try {
        const response = await getCaptcha();
        return response
    } catch (error) {
        // 处理错误
        throw new Error('Failed to fetch user data');
    }
});


export const captchaSlice = createSlice({
    name: 'captcha',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchCaptcha.fulfilled, (state, { payload }) => {
            localStorage.setItem('uuid', payload.uuid)
            return payload
        })
    },
})
// export const { increment, decrement, incrementByAmount, incrementIfOdd } = counterSlice.actions
// 选择器等其他代码可以使用导入的 `RootState` 类型
export const selectCaptcha = (state: RootState) => state.captcha

export default captchaSlice.reducer




