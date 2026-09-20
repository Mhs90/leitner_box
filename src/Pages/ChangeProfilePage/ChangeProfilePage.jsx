import { customFetch } from '../../services/customFetch'
import './style.css'
import { useEffect, useState } from 'react'

export default function ChangeProfilePage() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('accessToken');

            if (!token) {
                window.location.href = '/signup';
                return;
            }
        };

        fetchData();
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault();
        const numbers = /[0-9]/;
        const letters = /[a-z]/;
        const capitalLetters = /[A-Z]/;
        if (!numbers.test(password) || !letters.test(password) || !capitalLetters.test(password)) {
            alert('رمز عبور باید شامل اعداد و حروف انگلیسی کوچک و بزرگ باشد')
            return;
        }
        if (password.length < 8) {
            alert('رمز عبور باید حداقل 8 کاراکتر باشد')
            return;
        }
        if (password !== repeatPassword) {
            alert('رمز عبور را به درستی تکرار کنید')
            return;
        }
        const renameData = await customFetch(`/rename?new_name=${userName}`, {
            method: 'PUT'
        })
        localStorage.setItem('accessToken', renameData.new_token)
        localStorage.setItem('leitner_user_name', userName)
        const changePasswordData =await customFetch(`/change_password?new_password=${password}`, {
            method: 'PUT'
        })
        window.location.href = '/'
    }

    return (
        <div className="background">
            <div id="changeContainer">
                <h2>تغییر پروفایل</h2>
                <form onSubmit={submitHandler}>
                    <label htmlFor="text">:نام کاربری جدید </label>
                    <input type="text" placeholder='نام کاربری جدید' value={userName} onChange={(e) => setUserName(e.target.value)} required />
                    <label htmlFor="pasword"> : رمز عبور جدید</label>
                    <input type="password" placeholder='رمز عبور جدید' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <label htmlFor="pasword"> :تکرار رمز عبور جدید</label>
                    <input type="password" placeholder='تکرار رمز عبور جدید' value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} required />
                    <button>ثبت</button>
                </form>
            </div>
        </div>
    )
}