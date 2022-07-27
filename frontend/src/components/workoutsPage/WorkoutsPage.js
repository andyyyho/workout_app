import './WorkoutsPage.scss';
import Routine from '../routine/Routine'
import Workout from '../workout/Workout'
import { IoAddOutline as Add } from 'react-icons/io5'
import CircularProgress from '../circularProgress/CircularProgress.js';
import { useSelector } from 'react-redux';
import { useState } from 'react'
import WorkoutForm from '../workoutForm/workoutForm';

function WorkoutsPage() {

    const routinesList = useSelector((state) => state.fitness.routines)
    const workoutsList = useSelector((state) => state.fitness.workouts)
    const [session, setSession] = useState(false)
    const [routine, setRoutine] = useState(routinesList[0])
    
    const handleRoutine = (value) => {
        const selected = routinesList.find((routine) => {
            return value === routine._id 
        })
        setRoutine(selected)
    }
    const toggleSession = () => {
        console.log(routine)
        setSession(!session)
    }

    const checkRoutine = () => {
        console.log(routine)
    }

    return (

        <div className='main-workouts-container'>
            <div className='main-content'>
                <div className='progress-graph'>
                    <h2>Your Progress</h2>
                    {session ? <WorkoutForm toggle={toggleSession} routine={routine}/> : null}
                </div>
                <div className='new-workout-card'>
                    <h2>Start New Workout</h2>
                    <form>
                        <select onChange={(e) => handleRoutine(e.target.value)} className='workout-form'>
                            {routinesList.map((r) => {
                                return (
                                    <option value={r._id}>{r.name}</option>
                                )
                            })}
                        </select>
                        <button id='begin-btn' onClick={(e) => {e.preventDefault(); toggleSession()}}>Begin</button>
                    </form>
                </div>
                <div className='goal-track'>
                    <h2>This Week</h2>
                    <CircularProgress value={5} label='days'/>
                </div>
                <div className='highlight-reel'>
                    <h2>Highlights</h2>
                    <section>
                        <span>
                            <h3>Lift name</h3>
                            <h4>450lbs</h4>
                        </span>
                        <p>January, 1 2022</p>
                    </section>
                </div>
            </div>
            <div className='side-panel'>
                <div className='routines'>
                    <div className='title'>
                        <h2>Routines</h2>
                        <Add/>
                    </div>
                    <div className='routines-list-container'>
                        {routinesList.map((r) => {
                            return (
                                <Routine key={r._id} name={r.name}/>
                            )
                        })}
                    </div>
                </div>
                <div className='past-workouts'>
                    <div className='title'>
                            <h2>Past Workouts</h2>
                    </div>
                    <div className='past-workouts-list-container'>
                        {workoutsList.map((w) => {
                            return (
                                <Workout key={w._id} name={w.createdAt}/>
                            )
                        })}
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default WorkoutsPage;
