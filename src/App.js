import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import { FcManager } from "react-icons/fc";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// Firebase
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyBqyPa812IokH0HaWlOmq0zp2HwM21B08Y",
  authDomain: "trying-auth-20242.firebaseapp.com",
  projectId: "trying-auth-20242",
  storageBucket: "trying-auth-20242.appspot.com",
  messagingSenderId: "367275291523",
  appId: "1:367275291523:web:0e56d2f814415666c73cb6",
  measurementId: "G-8M5GF47XP1",
};

initializeApp(firebaseConfig);

// firebase Config

function App() {
  const [info, setinfo] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    success: "",
    error: "",
  });

  const handelOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value);
    // console.log("info before stattus",info)
    const newUser = { ...info, [name]: value };
    // newUser[name] = value;
    setinfo(newUser);
    console.log("newuser stattus", info);
  };

  const dataSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, info.email, info.password)
      .then((userCredential) => {
        // Signed in
       // const user = userCredential.user;
        // ...
        const newUser = { ...info };
        newUser.success = "success";
        newUser.error = "";
        setinfo(newUser);
      })
      .catch((error) => {
        const newUser = { ...info };
        newUser.error = error.message;
        setinfo(newUser);

       // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
    console.log(info.email);
    console.log(info.password);
    console.log(info.address);
  };

  return (
    // Remove this area and start your code
    <div className="container d-flex align-items-center justify-center h-screen">
      <div className="border p-5 shadow-md w-4/12">
        <FcManager className="m-auto" />
        <form action="" className="" onSubmit={dataSubmit}>
          <input
            type="text"
            id="name"
            placeholder="Your name"
            className="form-control mt-2 "
            required
            onChange={handelOnChange}
            name="name"
          />
          <input
            type="email"
            id="name"
            placeholder="Your Email address"
            className="form-control mt-2 "
            required
            onChange={handelOnChange}
            name="email"
          />

          <input
            type="password"
            placeholder="Address"
            className="form-control mt-2"
            required
            name="address"
            onChange={handelOnChange}
          />
          <input
            type="password"
            placeholder="password"
            className="form-control mt-2"
            required
            name="password"
            onChange={handelOnChange}
          />

          <button type="submit" className="btn btn-primary form-control mt-2  ">
            <FontAwesomeIcon
              className="mr-1"
              icon={faReact}
              rotation={90}
              spin
            />
            Log In
          </button>
        </form>
      </div>

      <div>
        <p className="text-green-500">{info.success}</p>
        <p className="text-red-500">{info.error}</p>
      </div>
    </div>
    // Remove this area and start your code
  );
}

export default App;
