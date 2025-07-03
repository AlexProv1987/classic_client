import { useState } from "react"
import { axiosBaseURL } from "../https"
import { Session } from "../common/interfaces";
import { sessionManager } from "../utils/session-manager";

interface LoginProps {
    set_has_token: React.Dispatch<React.SetStateAction<Session | null>>;
}

interface LoginForm {
    username: string,
    password: string,
}

export const LogIn = (props: LoginProps) => {
    const [formObj, setFormObj] = useState<LoginForm>({
        username: '',
        password: '',
    })

    const [errors, setErrors] = useState<Partial<LoginForm>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormObj((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: '',
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Partial<LoginForm> = {};

        if (!formObj.username.trim()) newErrors.username = "Username is required.";
        if (!formObj.password.trim()) newErrors.password = "Password is required.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            axiosBaseURL.post("user_api/login_member/", {
                username: formObj.username.trim(),
                password: formObj.password.trim(),
            }).then(function (response) {
                sessionManager.setSession(response.data)
                props.set_has_token(response.data)   
            }).catch(function (error) {
                console.error('Login Failed')
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">
                    Username <span className="text-danger">*</span>
                </label>
                <input
                    type="text"
                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                    name="username"
                    value={formObj.username}
                    onChange={handleChange}
                />
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
            </div>

            <div className="mb-3">
                <label className="form-label">
                    Password <span className="text-danger">*</span>
                </label>
                <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    name="password"
                    value={formObj.password}
                    onChange={handleChange}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            <div className="d-grid mb-3">
                <button type="submit" className="btn btn-sm btn-primary">Log In</button>
            </div>
        </form>
    )
}