import axios from 'axios';
import React, { useEffect, useId, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { RiseLoader } from 'react-spinners';


const ActivityForm = () => {
  const [activityID, setActivityID] = useState([])
  const [activity, setActivity] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Password Hide show
  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  const navigate = useNavigate();

  useEffect(() => {

    const myEmail = sessionStorage.getItem('email') ?? []; // Default value is an empty array string
    const parsedEmail = JSON.parse(myEmail); // Parse the retrieved value into an array
    setEmail(parsedEmail);
    console.log(parsedEmail);
    
  }, []);
  
  const activitiesData = sessionStorage.getItem('activity') ?? []; // Default value is an empty array string
  const parsedActivites = JSON.parse(activitiesData); // Parse the retrieved value into an array

  
  const HandleActivity = (e) => {
    if (e.target.value) {
        const selectedActivity = JSON.parse(e.target.value);
        console.log("Selected activity:", selectedActivity.activity);
        console.log("Selected activity ID:", selectedActivity.activityID);

        setActivity(selectedActivity.activity);
        setActivityID(selectedActivity.activityID)
        sessionStorage.setItem('selectedactivity', JSON.stringify(selectedActivity.activity));
        sessionStorage.setItem('selectedactivityID', JSON.stringify(selectedActivity.activityID));
    } else {
        console.log("No activity selected");
        setActivity("");
        localStorage.removeItem('selectedactivity');
    }
}

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activity === "") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Select Activity',
        footer: '<a href="">Please Select Activity</a>'
      })
      return
    }
    if (password === "") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Enter Password',
        footer: '<a href="">Please Enter Password</a>'
      })
      return
    }



    setIsLoading(true);


    axios.post('https://gs1ksa.org/api/member/login', { email: email, activity: activity, password: password, activityID: activityID })
      .then((response) => {
        console.log(response)
        setIsLoading(false);

        sessionStorage.setItem('password', JSON.stringify(password))

        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IklyZmFuIiwiaWF0IjoxNTE2MjM5MDIyfQ.vx1SEIP27zyDm9NoNbJRrKo-r6kRaVHNagsMVTToU6A';
        axios.post('https://gs1ksa.org/api/send/otp', { email: email, activity: activity }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then((response) => {
            Swal.fire(
              'OTP',
              'OTP send to your registered',
              'success'
            )

            const otp = response.data.otp;
            sessionStorage.setItem('otp', JSON.stringify(otp));
            navigate('/verify')
          })

          .catch(err => {
            console.log(err)
            setIsLoading(false);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.response.data.message || 'Something went wrong!',
              footer: '<a href="">Please Put the Correct Password and Activity</a>'
            })
          })
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message || 'Something went wrong!',
          footer: '<a href="">Please Put the Correct Password and Activity</a>'
        })
      })

  }

  // Reset Password APi
  const HandleResetPassword = () => {

    setIsLoading(true);
    axios.post('https://gs1ksa.org/api/member/forgot/password',
      {
        email: email,
        activity: activity,
        activityID: activityID
      })
      .then((response) => {
        console.log(response)
        setIsLoading(false)

        navigate('/forgot-code')
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please Select the Valid Activity!',
          // footer: '<a href="">Please Put the Correct Password and Activity</a>'
        })
      })
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      {isLoading &&

        <div className='loading-spinner-background'
          style={{
            zIndex: 9999, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.5)',
            display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed'


          }}
        >
          <RiseLoader
            size={18}
            color={"#6439ff"}
            // height={4}
            loading={isLoading}
          />
        </div>
      }

      <div className="max-w-md w-full bg-white shadow-2xl rounded p-6 space-y-6">
        <div className="mb-4">
          {/* <p className="text-gray-600">Sign In</p> */}
          <h2 className="text-lg font-medium">Select Activity</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            {/* <label>Activity</label>
            <select
              onChange={HandleActivity}
              className='w-full p-4 text-sm bg-gray-50 mt-2 focus:outline-none border border-gray-200 rounded text-gray-600'>
              <option value=''>Select Activity</option>
              {parsedActivites?.map((item) => {
                return <option key={item.activityID}>{item.activity}</option>
              })}
            </select> */}
            <select onChange={HandleActivity} className='w-full p-4 text-sm bg-gray-50 mt-2 focus:outline-none border border-gray-200 rounded text-gray-600'>
              <option value=''>Select Activity</option>
              {parsedActivites?.map((item) => (
                  <option key={item.activityID} value={JSON.stringify(item)}>
                      {item.activity}
                  </option>
              ))}
          </select>
          </div>
          
          <div className='relative'>
            <label>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 text-sm bg-gray-50 mt-2 focus:outline-none border border-gray-200 rounded text-gray-600"
              // type="password"
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
            />
              {/* Hide and Show Button */}
             <button 
             type='button'
              className="absolute inset-y-0 right-0 bottom-0 top-6 flex items-center px-4 text-gray-600"
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
          </div>

          <div className='mt-8'>
            <p>Forgot Password? <span className='text-blue-600 hover:text-blue-900 font-semibold cursor-pointer' onClick={HandleResetPassword}>Click Here To Reset</span></p>
          </div>
          <div className='flex justify-end'>
            <button type='submit' className="w-[30%] py-4 mt-2 bg-blue-900 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ActivityForm