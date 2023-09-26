import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const ForgotPassword = () => {
    const navigate = useNavigate();

  const [activity , setActivity] = useState("")
  const [email , setEmail] = useState("")
  const [code, setCode] = useState("")
  const [activityID, setActivityID] = useState([])
 
  useEffect(() => {
    const selectedactivity = sessionStorage.getItem('selectedactivity') ?? '[]';
    const myValue = sessionStorage.getItem('activity') ?? '[]'; // Default value is an empty array string
    const myEmail = sessionStorage.getItem('email') ?? '[]'; // Default value is an empty array string
    const parsedEmail = JSON.parse(myEmail); // Parse the retrieved value into an array
    const parsedSelected = JSON.parse(selectedactivity);
    const parsedValue = JSON.parse(myValue); // Parse the retrieved value into an array
    
    // ActivityID get in sesstionStorage
    // const parsedactivityID = parsedValue.map(item => item.activityID); // Extract activity names from objects
    // I get the selectedActivityID on the previes component
    const selectedActivityID = JSON.parse(sessionStorage.getItem('selectedactivityID'));
    console.log("Selected activity ID in AnotherComponent:", selectedActivityID);
    
    setActivity(parsedSelected);
    setEmail(parsedEmail);
    setActivityID(selectedActivityID)
    
    console.log(parsedEmail)
    console.log(parsedSelected)
    // console.log(parsedEmail)
    // console.log(email)
    // console.log(activity)
}, []);

    const handdleSubmit = (e) => {
        e.preventDefault();

        axios.post('https://gs1ksa.org/api/member/verify/forgot/password/code',
         {
            email : email,
            activity : activity,
            activityID: activityID,
            code : code
        })
        .then((response) => {
            console.log(response)

            navigate('/new-password')
        })
        .catch(err => {
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'The Verification Code is Not Correct!',
                // footer: '<a href="">Please Put the Correct Password and Activity</a>'
              })
        })
    }
  return (
    <div>
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white rounded-md w-full border shadow-2xl p-10 max-w-lg">
            <form onSubmit={handdleSubmit}>
                <div className="flex flex-col space-y-4">
                    <label>Verification Code*</label>
                <input
                       onChange={(e) => setCode(e.target.value)}
                        type="text"
                         placeholder="Verification Code"
                          className="border outline-blue-600 rounded-md w-full h-12 px-4" 
                />
                <div className='flex justify-end'>
                    <button type='submit' className="bg-blue-900 hover:bg-blue-700 text-white rounded-md font-semibold px-4 py-2 w-[30%]">Verify</button>
                </div>
        </div>        
            </form>
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword