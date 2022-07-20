import './ModalAuth.scss'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser, registerUser } from '../../slices/userSlice'

function ModalAuth(props) {
    const dispatch = useDispatch()
    const [formType, setFormType] = useState(true)

    const login = () => {
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        dispatch(loginUser({username, password}))
    }

    const toggleLogin = () => {
       setFormType(true)
       console.log('clicked login')
    }
    const toggleRegister = () => {
        setFormType(false)
        console.log('clicked register')
    }
    
    return ( 
        <div className='backdrop'>
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
                    <button onClick={e => { e.preventDefault(); login() }}>Continue</button>
                </form>
                :
                <form className='form-group'>
                    <label htmlFor='username'>Username</label>
                    <input id='username'/>
                    <label htmlFor='email'>Email</label>
                    <input id='email'/>
                    <label htmlFor='name'>Name</label>
                    <input id='name'/>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password'/>
                    <label htmlFor='confirm-password'>Confirm Password</label>
                    <input type='password' id='confirm-password'/>
                    <p>Already have an account? Login Here.</p>
                    <button>Continue</button>
                </form>
                }
                <button onClick={props.toggle}>Close</button>
            </div>
        </div>
    )
}

export default ModalAuth;