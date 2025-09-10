import { useState } from "react";
import Input from "../components/Input";

export default function AuthPage({ onAuthSuccess }) {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async()=>{
    const endpoint = isSignup ? "https://11566182-3c07-424d-93fa-58cd18b332b8-00-5k32tb2of67a.picard.replit.dev:3001/api/auth/signup" : "https://11566182-3c07-424d-93fa-58cd18b332b8-00-5k32tb2of67a.picard.replit.dev:3001/api/auth/login";
    
    if (isSignup && (!name || !email || !password)) {
      alert("Please fill out all fields to sign up.");
      return;
    }
    if (!isSignup && (!email || !password)) {
      alert("Please enter your email and password to log in.");
      return;
    }

    const payload = isSignup ? {name, email, password} : {email, password};
    const methodType = isSignup ? "POST" : "GET"
    try{
      console.log("Sending signup data:", { name, email, password });
      const response = await fetch(endpoint, {
        method: methodType,
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (isSignup) {
        response.body = JSON.stringify(payload);
      }
      
      console.log("response received: ", response);
      if(response.ok){
        const data = await response.json();
        const token = data.token;
        console.log("token received: ", token);
        localStorage.setItem("authToken", token);
        onAuthSuccess();
      }else{
        console.error("Authentication failed");
      }
      console.log(response);
    }catch(err){
      console.error("Error during authentication:", err);
    }
  }

  return (
    <div className="w-96 p-6 bg-white rounded-lg shadow-lg mx-auto mt-20">
      <h2 className="text-xl font-bold mb-4 text-center">
        {isSignup ? "Sign Up" : "Login"}
      </h2>

      <div className="flex flex-col gap-4">
        {isSignup && <Input 
          label="Name" 
          placeholder="Enter your name" 
          value={name}
          onChange={(e)=>{
            setName(e.target.value)
            console.log("name: ", name)
          }}/>}
        <Input 
          label="Email" 
          type="email" 
          placeholder="Enter your email"
          value={email}
          onChange={(e)=>{
            setEmail(e.target.value)
            console.log("email: ", email)
          }}/>
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e)=>{
            setPassword(e.target.value)
            console.log("password: ", password)
          }}
        />

        <button
          className="bg-blue-500 text-white p-2 rounded-lg shadow hover:bg-blue-600 transition"
          onClick={()=>handleAuth()}
        >
          {isSignup ? "Create Account" : "Login"}
        </button>

        <p
          className="text-sm text-center mt-2 cursor-pointer text-blue-500"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? "Already a member? Login" : "New here? Sign Up"}
        </p>
      </div>
    </div>
  );
}
