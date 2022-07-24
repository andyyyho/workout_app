import './Home.scss'
import ModalAuth from '../modalAuth/ModalAuth'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

function Home() {
    let [showModal, setShowModal] = useState(false);
    let [modalType, setModalType] = useState(null);
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
                        <button id='login-btn' onClick={() => {setModalType(true); toggleModal();}}>Login</button>
                        <button id='register-btn' onClick={() => {setModalType(false); toggleModal();}}>Register</button>
                        </div>
                    :
                        <div className='welcome-msg'>
                            Hello, {username}
                        </div>
                }   
            </div>
            {showModal ? <ModalAuth type={modalType} toggle={toggleModal}/> :
            <div className="body-landing">
                <section className='info'>
                    <h2>Stay Orgainized. <br/> Track Progression.</h2>
                    <h4>Workout app aims to help motivate users of all experience level continue their journey into living a healthier and active lifestyle by allowing them to visualize and record their progress along the way</h4>
                    <button>Start Now</button>
                </section>
            </div>
            }
        </div>
    )
}

export default Home;