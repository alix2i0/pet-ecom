import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '../../reducer/authSlice'


const Profile = () => {
    const dispatch  = useDispatch()
    const user = useSelector(state => state.user.user)

    useEffect(() => {
        dispatch(fetchUser())
    }, [])



  return (
    <div>
        <h1>Profile</h1>
        <p>Name: {user?.username}</p>
        <p>Email: {user?.email}</p>
    </div>
  )
}

export default Profile