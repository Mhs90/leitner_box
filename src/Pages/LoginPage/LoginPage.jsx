import { Link } from 'react-router-dom'
import './style.css'
import { useState } from 'react'

export default function LoginPage() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_name: userName,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                if (data.token) {
                    localStorage.setItem('accessToken', data.token);
                    window.location.href = '/leitner';
                } else {
                    alert('توکنی دریافت نشد');
                }
            } else {
                alert(data.message || 'نام کاربری یا رمز عبور اشتباه است');
            }
        } catch (error) {
            console.error('Connection error:', error);
            alert('خطا در ارتباط با سرور');
        }
    }

    return (
        <div className="background">
            <div id="loginContainer">
                <h2>ورود</h2>
                <form onSubmit={submitHandler}>
                    <label htmlFor="text">: نام کاربری</label>
                    <input type="text" placeholder='نام کاربری' value={userName} onChange={(e) => setUserName(e.target.value)} required/>
                    <label htmlFor="pasword"> : رمز عبور</label>
                    <input type="password" placeholder='رمز عبور' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <button>ورود</button>
                </form>
                <p>اکانت نداری؟ <Link to='/signup'>ثبت نام</Link></p>
            </div>
        </div>
    )
}