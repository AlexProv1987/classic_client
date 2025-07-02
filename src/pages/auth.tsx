import { useState } from "react"
import { LogIn } from "../auth-components/login"
import { ForgotPassword } from "../auth-components/forgot-pw"
import { SignUp } from "../auth-components/sign-up"
import { Session } from "../common/types"

type AuthPageProps = {
    set_has_token:React.Dispatch<React.SetStateAction<Session | null>>;
}

type AuthView = 'login' | 'forgot_password' | 'sign_up';

export const AuthPage = (props: AuthPageProps) => {
    const [choice, setChoice] = useState<AuthView>('login')

    const renderView = () => {
        switch (choice) {
            case 'login':
                return <LogIn set_has_token={props.set_has_token} />;
            case 'forgot_password':
                return <ForgotPassword />;
            case 'sign_up':
                return <SignUp />;
            default:
                return null;
        }
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
            {renderView()}
            <div className="mt-3">
                {choice === 'login' && (
                    <>
                        <button className="btn btn-link" onClick={() => setChoice('forgot_password')}>
                            Forgot Password?
                        </button>
                        <button className="btn btn-link" onClick={() => setChoice('sign_up')}>
                            Sign Up
                        </button>
                    </>
                )}
                {choice === 'forgot_password' && (
                    <button className="btn btn-link" onClick={() => setChoice('login')}>
                        Back to Login
                    </button>
                )}
                {choice === 'sign_up' && (
                    <button className="btn btn-link" onClick={() => setChoice('login')}>
                        Already have an account? Log In
                    </button>
                )}
            </div>
        </div>
    )
}