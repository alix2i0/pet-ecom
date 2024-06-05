import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '../../src/services/reducer/authSlice'


const Profile = () => {
    const dispatch  = useDispatch()
    const user = useSelector(state => state.auth.auth)

    useEffect(() => {
        dispatch(fetchUser())
    }, [])
    const handleUpdate = async (updatedAdmin) => {
      try {
  
        const response = await axios.put('http://localhost:3000/admin/update', updatedAdmin);
        console.log('Profile updated successfully:', response);
        setAdmin(response.data.admin);
        localStorage.setItem("adminAuthenticated", JSON.stringify(response.data.admin));
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    };
    const deleteProfile = async () =>{
      try {
        const response = await axios.delete(`http://localhost:3000/admin/`,admin)
        console.log(response);
        if(response.statusText == "OK"){
          localStorage.setItem("adminAuthenticated", {});
          Navigate('/login')
        }
        else{
          console.error("Some Error")
        }
      } catch (error) {
        console.log("catch",error);
      }
    }
    const handleUpdateClick = () => {
      setOpenPopUp(true);
    };
    console.log("user",user);

  return (
        <div className='ml-64'>
          <div className="p-2 bg-white shadow mt-24">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="text-center order-last md:order-first mt-20 md:mt-0">
                <div>
                  <p className="font-bold text-gray-700 text-xl">0</p>
                  <p className="text-gray-400">Products</p>
                </div>
              </div>
              <div className="relative">
                <div className="w-48 h-48 bg-teal-400 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-slate-50" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                <button onClick={handleUpdateClick} className="text-white py-2 px-4 uppercase rounded bg-teal-400 hover:bg-teal-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                  update
                </button>
                <button onClick={deleteProfile} className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-red-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                  delete
                </button>
              </div>
            </div>
            <div className="mt-20 text-center border-b pb-12">
              <h1 className="text-4xl font-medium text-gray-700">{user?.username}</h1>
              <p className="font-light text-gray-600 mt-3">{user?.email}</p>
              <p className="mt-8 text-gray-500">Admin Manager - Pets Management</p>
              <p className="mt-2 text-gray-500">University of Computer Science</p>
            </div>
            <div className="mt-12 flex flex-col justify-center">
              <p className="text-gray-600 text-center font-light lg:px-16">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis autem eligendi aut voluptatem perspiciatis neque sit saepe possimus fuga voluptate inventore officia quibusdam delectus repudiandae aliquid fugit vel, nam maiores!</p>
            </div>
          </div>
        </div>
  )
}

export default Profile