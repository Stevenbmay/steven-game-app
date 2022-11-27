import React, { useState } from "react";
import { auth } from "../firebase.confg";
import { GoogleAuthProvider, signInWithPopup, } from "firebase/auth";

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
        <div>
            <h2>login</h2>
            <button onClick={SignIn}>Sigh In</button>
        </div>

    )
};

export default LoginPage;