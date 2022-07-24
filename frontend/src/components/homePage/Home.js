import './Home.scss'
import ModalAuth from '../modalAuth/ModalAuth'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

function Home() {
    let [showModal, setShowModal] = useState(false);
    const username = useSelector((state) => state.user.username)

    useEffect(() => {
        if (username) setShowModal(false)
    }, [username])
    
    const toggleModal = () => {
        setShowModal(!showModal)
        console.log("Toggling Modal", showModal)
    }
    
    return(
        <div className='main-container'>
            <div className='header'>
                <h1>Workout</h1>
                {!username 
                    ?   <div className='button-group'>
                        <button id='login-btn' onClick={toggleModal}>Login</button>
                        <button id='register-btn' onClick={toggleModal}>Register</button>
                        </div>
                    :
                        <div className='welcome-msg'>
                            Hello, {username}
                        </div>
                }   
            </div>
            {showModal ? <ModalAuth toggle={toggleModal}/> :
            <div className="body-landing">
                <div className='container-1'>
                    <div>
                        <img alt='' />
                        Monitor your progress like never before
                    </div>
                </div>
                <div className='container-2'>
                    <div>
                        <img alt='' />
                        Get analytical data on your lifts
                    </div>
                </div>
                <div className='container-3'>
                    <div>
                        <img alt='' />
                        Save workouts and routines with ease
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default Home;