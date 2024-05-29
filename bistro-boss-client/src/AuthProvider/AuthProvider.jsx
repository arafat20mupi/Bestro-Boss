import { createContext, useEffect, useState } from "react";
import {
    FacebookAuthProvider,
    GithubAuthProvider,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from "firebase/auth";
import auth from "../Firebase/firebase.config";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const axiosPublic = UseAxiosPublic();

    const GoogleProvider = new GoogleAuthProvider();
    const FacebookProvider = new FacebookAuthProvider();
    const GithubProvider = new GithubAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateUserProfile = (fullName, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: fullName,
            photoURL: photoURL
        })
            .then(() => {
                setUser((prevUser) => ({
                    ...prevUser,
                    displayName: fullName,
                    photoURL: photoURL
                }))
            })

    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, GoogleProvider);
    };

    const facebookSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, FacebookProvider);
    };

    const githubSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, GithubProvider);
    };

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
            if (user) {
                const userInfo = { email: user?.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('token', res.data.token);
                        }
                    })
                    .catch(err => {
                        console.error("Failed to get token", err);
                    });
            } else {
                localStorage.removeItem('token');
            }
        });

        return () => {
            unSubscribe();
        };
    }, [axiosPublic]);

    const authInfo = {
        user,
        createUser,
        signIn,
        logOut,
        googleSignIn,
        facebookSignIn,
        githubSignIn,
        resetPassword,
        loading,
         updateUserProfile,
        setReload
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
