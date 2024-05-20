import { createUserWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, onAuthStateChanged, signInWithPopup, signOut, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";
export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);


    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
        
    }

    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const signOutUser = () => {
        setLoading(true)
        signOut(auth)
    }
    const updateUser = (userData) => {
        setLoading(false);
        return updateProfile(auth.currentUser, userData);
    };
    
    const GoogleProvider = new GoogleAuthProvider();
    const createGoogleUser = () => {
        setLoading(true)
        return signInWithPopup(auth, GoogleProvider)
    }

    const githubProvider = new GithubAuthProvider();
    const createGithubUser = () => {
        setLoading(true)
        return signInWithPopup(auth, githubProvider)
    }

    
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, user => {
            setUser(user)
            setLoading(false)
        });
        return () => {
            unSubscribe();
        }
    }, [])



    const authInfo = {
        createUser,
        setUser,
        user,
        signOutUser,
        signInUser,
        loading,
        updateUser,
        createGithubUser,
        createGoogleUser,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;