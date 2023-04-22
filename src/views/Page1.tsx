import { Counter } from '@/components/Counter'
import { useAppDispatch, useAppSelector } from '@/types'
import { useEffect } from 'react'
import { incrementAsync } from '@/store/counterSlice'
import { fetchUsers, selectUsers } from '@/store/usersSlice'
import { axiosInstance } from '@/utils/request'



function Page1() {
  const users = useAppSelector(selectUsers)
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(incrementAsync(1))
  }

  const userList = users.map(user => {
    return (
      <li key={user.id}>
        name:{user.name}
        gender:{user.gender}
        age:{user.age}
        email:{user.email}
      </li>
    )
  })

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])




  return (
    <div>
      <span>page1页面</span>
      {users.length > 0 && userList}
      <button onClick={handleClick}>increase async</button>
      <Counter />
    </div>
  )
}

export default Page1
