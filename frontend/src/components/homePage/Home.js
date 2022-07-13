import './Home.scss'

function Home() {
    return(
        <div className='main-container'>
            <div className='header'>
                <h1>Workout</h1>
                <div className='button-group'>
                    <button id='login-btn'>Login</button>
                    <button id='register-btn'>Register</button>
                </div>
            </div>
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
        </div>
    )
}

export default Home;