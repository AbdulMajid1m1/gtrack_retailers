import axios from 'axios';
import React, { useEffect, useId, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const NewPassword = () => {
  const [activity , setActivity] = useState("")
  const [activityID, setActivityID] = useState([])
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const [newpassword , setNewPassword] = useState("")

  const navigate = useNavigate();

  
  useEffect(() => {
    const selectedactivity = sessionStorage.getItem('selectedactivity') ?? '[]';
    const myEmail = sessionStorage.getItem('email') ?? '[]'; // Default value is an empty array string
    const parsedEmail = JSON.parse(myEmail);
    const parsedSelected = JSON.parse(selectedactivity);
    
    // I get the selectedActivityID on the previes component
    const selectedActivityID = JSON.parse(sessionStorage.getItem('selectedactivityID'));
    console.log("Selected activity ID in AnotherComponent:", selectedActivityID);
    
    
    setEmail(parsedEmail)
    setActivity(parsedSelected)
    setActivityID(selectedActivityID)
    console.log(parsedEmail)
    console.log(parsedSelected)
}, []);


  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://gs1ksa.org/api/member/password/reset' , {

        email: email,
        activity: activity,
        activityID: activityID,
        password: password,
        password_confirmation: newpassword
        
    }).then((response) =>{
      console.log(response)
      Swal.fire(
          'New Password Created',
          'Member Password Created..',
          'success'
      )
      navigate('/activity-form') 
    })
    .catch(err => {
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something You type Went Wrong!',
        // footer: '<a href="">Please Put the Correct Password and Activity</a>'
      })
    })
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-2xl rounded p-6 space-y-6">
          <div className="mb-4">
          </div>
          <form onSubmit={handleSubmit}>
          <div>
            <label>Password</label>
              <input 
                onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 text-sm bg-gray-50 mt-2 focus:outline-none border border-gray-200 rounded text-gray-600" 
                    type="text"
                    placeholder="Password" 
              />
          </div>
          <div className='mt-6'>
            <label>Confirm Password</label>
              <input 
                onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-4 text-sm bg-gray-50 mt-2 focus:outline-none border border-gray-200 rounded text-gray-600" 
                    type="text"
                    placeholder="Confirm Password" 
              />
          </div>

          <div className='flex justify-start mt-4'>
              <button type='submit' className="w-[30%] py-4 mt-2 bg-blue-900 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200">Login</button>
          </div>

          <div className='mt-6'>
               <p>Login Again <span className='text-blue-600 font-semibold cursor-pointer' onClick={() => navigate('/')}>Login Now</span></p>   
          </div>
        </form>
      </div>
  </div>
  )
}

export default NewPassword