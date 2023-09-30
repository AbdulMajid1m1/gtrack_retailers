import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { RiseLoader } from "react-spinners";
import { CurrentUserContext } from '../../Contexts/CurrentUserContext'
const VerifyCode = () => {
  const [activity, setActivity] = useState("");
  const [activityID, setActivityID] = useState([])
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [generated_otp, setGenerated_otp] = useState("");
  const [member_otp, setMember_otp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { updateCurrentUser } = useContext(CurrentUserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const selectedactivity = sessionStorage.getItem("selectedactivity") ?? "[]";
    const myValue = sessionStorage.getItem("otp") ?? "[]"; // Default value is an empty array string
    // const activity = sessionStorage.getItem('activity') ?? '[]'; // Default value is an empty array string
    const myEmail = sessionStorage.getItem("email") ?? "[]"; // Default value is an empty array string
    const mypassword = sessionStorage.getItem("password") ?? "[]"; // Default value is an empty array string
    
    // I get the selectedActivityID on the previes component
    const selectedActivityID = JSON.parse(sessionStorage.getItem('selectedactivityID'));
    console.log("Selected activity ID in AnotherComponent:", selectedActivityID);

    const parsedEmail = JSON.parse(myEmail);
    const parsedValue = JSON.parse(myValue); // Parse the retrieved value into an array
    const parsedpassword = JSON.parse(mypassword);
    const parsedSelected = JSON.parse(selectedactivity);
    
    // console.log(parsedactivityID)
    console.log(parsedSelected);
    console.log(parsedpassword);
    console.log(parsedValue);
    setGenerated_otp(parsedValue);
    setEmail(parsedEmail);
    setActivity(parsedSelected);
    setActivityID(selectedActivityID)
    setPassword(parsedpassword);
    setMember_otp(parsedValue);
  }, []);

  const handdleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    console.log(generated_otp);
    axios
      .post("https://gs1ksa.org/api/otp/confirmation", {
        email: email,
        activity: activity,
        activityID: activityID,
        password: password,
        generated_otp: generated_otp,
        member_otp: member_otp,
      })
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        Swal.fire("Dashboard", "Welcome To The Retailer Portal", "success");
        sessionStorage.setItem(
          "currentUser",
          JSON.stringify(response?.data?.memberData)
        );
        updateCurrentUser(response?.data?.memberData);

        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Wrong OTP!",
        });
      });
  };
  return (
    <div>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        {isLoading && (
          <div
            className="loading-spinner-background"
            style={{
              zIndex: 9999,
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "fixed",
            }}
          >
            <RiseLoader
              size={18}
              color={"#6439ff"}
              // height={4}
              loading={isLoading}
            />
          </div>
        )}

        <div className="bg-white rounded-md w-full border shadow-2xl p-10 max-w-lg">
          <form onSubmit={handdleSubmit}>
            <div className="flex flex-col space-y-4">
              <div className="text-center w-full bg-gray-100">
                <h1 className="text-lg text-blue-950">
                  Please Enter Verification Code*
                </h1>
              </div>
              <input
                onChange={(e) => setMember_otp(e.target.value)}
                value={member_otp}
                type="text"
                placeholder="Verify Code"
                className="border outline-blue-600 rounded-md w-full h-12 px-4"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold px-4 py-2 w-[30%]"
              >
                Verify Now
              </button>
              <p class="text-lg text-gray-900 w-5/6">Forgot Password?</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
