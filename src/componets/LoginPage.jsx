import React, { useState } from "react";
import { auth } from "../firebase.confg";
import { GoogleAuthProvider, signInWithPopup, } from "firebase/auth";
import './Login.css'

const provider = new GoogleAuthProvider();
function LoginPage() {
    async function SignIn() {
        try {
            const result = await signInWithPopup(auth, provider)
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log(user);
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        };
    }

    return (
        <div className="justify-content-center">
            <h1>WELCOME TO STEVEN'S GAME APP</h1>
            <h1>PLEASE SIGN IN</h1>
            <button className="font-size50 " onClick={SignIn}>Sign In</button>
        </div>

    )
};

export default LoginPage;