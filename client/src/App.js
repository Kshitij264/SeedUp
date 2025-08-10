import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
// --- NEW --- Import icons
import { FaSignOutAlt, FaHome } from 'react-icons/fa';

function App() {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userDocRef = doc(db, "users", currentUser.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    setUserRole(userDocSnap.data().role);
                }
                setUser(currentUser);
            } else {
                setUser(null);
                setUserRole(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <div className="App">
                <nav>
                    <h1>SeedUp</h1>
                    {user && (
                        <div className="nav-links">
                            <Link to="/"> <FaHome /> Home </Link>
                            <span>Welcome, {user.email} ({userRole})</span>
                            <button onClick={logout}> <FaSignOutAlt /> Logout</button>
                        </div>
                    )}
                </nav>
                <Routes>
                    <Route path="/" element={user ? <Home userRole={userRole} /> : <Navigate to="/login" />} />
                    <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;