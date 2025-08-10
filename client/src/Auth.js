import { useState } from 'react';
import { auth } from './firebase'; 
// We now need the "signIn" function in addition to the "createUser" function
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created successfully!");
    } catch (err) {
      console.error("Firebase Error:", err);
      alert("Error creating account: " + err.message);
    }
  };

  // --- NEW FUNCTION ---
  const login = async () => {
    try {
      // This is the Firebase function for signing in a user
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully!");
    } catch (err) {
      console.error("Firebase Error:", err);
      alert("Error logging in: " + err.message);
    }
  };

  return (
    <div>
      <input 
        placeholder="Email..." 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        placeholder="Password..."
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <button onClick={signUp}>Sign Up</button>
      
      {/* --- NEW BUTTON --- */}
      <button onClick={login}>Login</button>
    </div>
  );
};