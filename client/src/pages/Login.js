import { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AnimatedPage } from '../AnimatedPage';

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("business_person");
    const navigate = useNavigate();

    const signUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                role: role,
            });
            toast.success('Account created successfully!');
            navigate('/');
        } catch (err) {
            console.error(err);
            toast.error(err.message);
        }
    };

    const loginUser = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success('Logged in successfully!');
            navigate('/');
        } catch (err) {
            console.error(err);
            toast.error(err.message);
        }
    };

    return (
        <AnimatedPage>
            <div className="login-page-container">
                <div className="login-branding">
                    <h1>Welcome to SeedUp</h1>
                    <p>The platform where great ideas meet smart investment.</p>
                </div>
                <div className="form-container">
                    <h2>Login or Sign Up</h2>
                    <input
                        placeholder="Email..."
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Password..."
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div>
                        <label>I am a: </label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="business_person">Business Person</option>
                            <option value="investor">Investor</option>
                            <option value="banker">Banker</option>
                            <option value="business_advisor">Business Advisor</option>
                        </select>
                    </div>

                    <div className="button-group">
                        <button onClick={loginUser}>Login</button>
                        <button onClick={signUp}>Sign Up</button>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
};