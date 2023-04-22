import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '@/utils/request'
import type { RootState } from './store'

// 为 slice state 定义一个类型
interface CounterState {
    value: number
}

// 使用该类型定义初始 state
const initialState: CounterState = {
    value: 0
}

// thunk creator函数
export const incrementAsync = (amount: number) => (dispatch: (arg0: { payload: number; type: "counter/incrementByAmount" }) => void) => {
    setTimeout(() => {
        dispatch(incrementByAmount(amount))
    }, 3000)
}


export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: state => {
            // Redux Toolkit 允许我们在 reducers 写 "可变" 逻辑。它
            // 并不是真正的改变状态值，因为它使用了 Immer 库
            // 可以检测到“草稿状态“ 的变化并且基于这些变化生产全新的
            // 不可变的状态
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        // 使用 PayloadAction 类型声明 `action.payload` 的内容
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
        incrementIfOdd: (state, action: PayloadAction<number>) => {
            if (state.value % 2 !== 0) {
                state.value += action.payload
            }
        }
    }
})
export const { increment, decrement, incrementByAmount, incrementIfOdd } = counterSlice.actions
// 选择器等其他代码可以使用导入的 `RootState` 类型
export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer


