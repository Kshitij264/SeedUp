import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { SplashScreen } from './SplashScreen';
import { Sidebar } from './Sidebar';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { FaSignOutAlt, FaBars, FaHome } from 'react-icons/fa';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

function App() {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showSplash, setShowSplash] = useState(true);
    const [activeView, setActiveView] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const splashTimer = setTimeout(() => {
            setShowSplash(false);
        }, 2500);

        const authUnsubscribe = onAuthStateChanged(auth, async (currentUser) => {
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

        return () => {
            clearTimeout(splashTimer);
            authUnsubscribe();
        };
    }, []);

    const logout = async () => {
        try {
            await signOut(auth);
            setActiveView(null);
        } catch (err) {
            console.error(err);
        }
    };

    if (showSplash) {
        return <SplashScreen />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    const AppRoutes = () => {
        const location = useLocation();
        return (
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={user ? <Home userRole={userRole} activeView={activeView} /> : <Navigate to="/login" />} />
                    <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AnimatePresence>
        );
    };

    return (
        <Router>
            <Toaster position="top-center" reverseOrder={false} />
            {/* --- THE FIX --- The pop-out MOBILE sidebar is now completely separate */}
            {user && <Sidebar activeView={activeView} setActiveView={setActiveView} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} isMobile={true} />}
            
            <div className="App">
                {user && (
                    <nav>
                        <div className="nav-left">
                            <div className="hamburger-icon" onClick={() => setIsSidebarOpen(true)}>
                                <FaBars />
                            </div>
                            <h1>SeedUp</h1>
                        </div>
                        <div className="nav-links">
                            <button onClick={() => setActiveView(null)}>
                                <FaHome /> Home
                            </button>
                            <span>Welcome, {user.email} ({userRole})</span>
                            <button onClick={logout}> <FaSignOutAlt /> Logout</button>
                        </div>
                    </nav>
                )}
                
                <div className="main-layout">
                    {/* --- THE FIX --- The DESKTOP sidebar is in its own container */}
                    <div className="desktop-sidebar">
                        {user && <Sidebar activeView={activeView} setActiveView={setActiveView} />}
                    </div>
                    <div className="content">
                        <AppRoutes />
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;