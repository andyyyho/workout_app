import './ModalAuth.scss'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser, registerUser } from '../../slices/userSlice'

function ModalAuth(props) {
    const dispatch = useDispatch()
    const [formType, setFormType] = useState(props.type)
    const [error, setError] = useState('')

    const login = () => {
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        if (!username || !password) {setError('Cannot login with missing field(s)'); return}
        dispatch(loginUser({username, password}))
    }

    const register = () => {
        const username = document.getElementById('username').value
        const email = document.getElementById('email').value
        const name = document.getElementById('name').value
        const password = document.getElementById('password').value
        const confirmPassword = document.getElementById('confirm-password').value

        if (!username || !email || !name || !password || !confirmPassword) {
            setError('Cannot register with missing field(s)')
            return
        }

        if (password !== confirmPassword) {setError('Passwords do not match!'); return}
        else setError('')

        dispatch(registerUser({username, email, name, password, confirmPassword}))
    }

    const toggleLogin = () => {
       setFormType(true)
       setError('')
    }
    const toggleRegister = () => {
        setFormType(false)
        setError('')
    }
    
    return ( 
        <div>
            <div onClick={props.toggle} className='backdrop'>
            </div>
            <div className='popup'>
            <div className='popup-header-nav'>
                <h3 className={formType ? 'active-modal-tab' : ''} onClick={toggleLogin}>Login</h3>
                <h3 className={!formType ? 'active-modal-tab' : ''} onClick={toggleRegister}>Register</h3>
            </div>
            {formType ? 
            <form className='form-group'>
                <label htmlFor='username'>Username</label>
                <input id='username'/>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password'/>
                {error && 
                    <div className='error-msg'>
                        {error}
                    </div>}
                <button id='auth-submit' onClick={e => { e.preventDefault(); login() }}>Login</button>
            </form>
            :
            <form className='form-group'>
                <label htmlFor='username'>Username</label>
                <input id='username'/>
                <label htmlFor='email'>Email</label>
                <input id='email'/>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password'/>
                <label htmlFor='confirm-password'>Confirm Password</label>
                <input type='password' id='confirm-password'/>
                {error && 
                    <div className='error-msg'>
                        {error}
                    </div>}
                <p>Already have an account? <span className='already-acc' onClick={toggleLogin}>Login Here.</span></p>
                <button id='auth-submit' onClick={e =>  {e.preventDefault(); register() }}>Register</button>
            </form>
            }
        </div>
    </div>
    )
}

export default ModalAuth;