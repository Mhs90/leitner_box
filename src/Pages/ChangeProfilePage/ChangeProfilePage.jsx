import { customFetch } from '../../services/customFetch'
import './style.css'
import { useEffect, useState } from 'react'

export default function ChangeProfilePage() {
    const [userName, setUserName] = useState('daria')
    const [password, setPassword] = useState('57598790')
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('accessToken');

            if (!token) {
                window.location.href = '/signup';
                return;
            }

            try {
                const userData = await customFetch('/users');
                setUserName(userData.user_name);
                setPassword(userData.password);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault();
        await customFetch('/url', {
            method: 'PUT', body: JSON.stringify({
                user_name: userName,
                password: password
            })
        })
        window.location.href = '/'
    }

    return (
        <div className="background">
            <div id="changeContainer">
                <h2>تغییر پروفایل</h2>
                <form onSubmit={submitHandler}>
                    <label htmlFor="text">: نام کاربری</label>
                    <input type="text" placeholder='نام کاربری' value={userName} onChange={(e) => setUserName(e.target.value)} required />
                    <label htmlFor="pasword"> : رمز عبور</label>
                    <input type="password" placeholder='رمز عبور' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button>ثبت</button>
                </form>
            </div>
        </div>
    )
}