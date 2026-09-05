import { Link } from 'react-router-dom'
import './style.css'
import { useState } from 'react'

export default function SignupPage() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [checked, setChecked] = useState('box')

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
            })
            const data = await response.json()
            console.log(data);

            window.location.href = '/login'
        } catch (error) {
            console.error('Connection error:', error);
            alert('خطا در ارتباط با سرور');
        }

    }
    return (
        <>
            <div className="background">
                <div id="signupContainer">
                    <h2>ثبت نام</h2>
                    <form onSubmit={submitHandler}>
                        <label htmlFor="text">: نام کاربری</label>
                        <input type="text" placeholder='نام کاربری' value={userName} onChange={e => setUserName(e.target.value)} required />
                        <label htmlFor="pasword"> : رمز عبور</label>
                        <input type="password" placeholder='رمز عبور' value={password} onChange={e => setPassword(e.target.value)} required />
                        <label htmlFor="pasword"> : تکرار رمز عبور</label>
                        <input type="password" placeholder='تکرار رمز عبور' value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} required />
                        <label htmlFor="checkbox">آواتار خودت رو انتخاب کن</label>
                        <div className="radioContainer">
                            <div><input checked={checked === 'box'} type="radio" name='radi' value='box' /><img onClick={() => setChecked('box')} src="/assets/box.png" alt="box" className='avatar' /></div>
                            <div><input checked={checked === 'lumo'} type="radio" name='radi' value='lumo' /><img onClick={() => setChecked('lumo')} src="/assets/lumo.png" alt="lumo" className='avatar' /></div>
                            <div><input checked={checked === 'della'} type="radio" name='radi' value='della' /><img onClick={() => setChecked('della')} src="/assets/della.png" alt="della" className='avatar' /></div>
                            <div><input checked={checked === 'velo'} type="radio" name='radi' value='velo' /><img onClick={() => setChecked('velo')} src="/assets/velo.png" alt="velo" className='avatar' /></div>
                        </div> 
                        <button>ثبت نام</button>
                    </form>
                    <p>قبلا اکانت داشتی؟ <Link to='/login'>ورود</Link></p>
                </div>
            </div>
        </>
    )
}