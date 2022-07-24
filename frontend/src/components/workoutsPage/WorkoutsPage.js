import './WorkoutsPage.scss';
import Routine from '../routine/Routine'
import Workout from '../workout/Workout'
import { IoAddOutline as Add } from 'react-icons/io5'
import CircularProgress from '../circularProgress/CircularProgress.js';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkouts, getRoutines } from '../../slices/fitnessSlice';

function WorkoutsPage() {
    const dispatch = useDispatch()

    const routinesData = async () => {
      const data = await dispatch(getRoutines())
      console.log(data)
    }

    const data = useSelector((state) => state.fitness.routines)

    const routinesList = [
        {
            name: "First routine",
        },
        {
            name: "Second routine",
        },
        {
            name: "Third routine",
        },
        {
            name: "Fourth routine",
        },
        {
            name: "Fifth routine",
        },
        {
            name: "First routine",
        },
        {
            name: "Second routine",
        },
        {
            name: "Third routine",
        },
        {
            name: "Fourth routine",
        },
        {
            name: "Fifth routine",
        },
    ]

    const workoutsList = [
        {
            name: "First workout",
        },
        {
            name: "Second workout",
        },
        {
            name: "Third workout",
        },
        {
            name: "Fourth workout",
        },
        {
            name: "Fifth workout",
        },
    ]

    const routines = routinesList.map((r) => {
        return (
            <Routine key={r._id} name={r.name}/>
        )
    })

    const workouts = workoutsList.map((w) => {
        return (
            <Workout key={w._id} name={w.name}/>
        )
    })

    return (
        <div className='main-workouts-container'>
            <div className='main-content'>
                <div className='progress-graph'>
                    <h2>Your Progress</h2>
                    <button onClick={routinesData}>Click me</button>
                </div>
                <div className='new-workout-card'>
                    <h2>Start New Workout</h2>
                    <form>
                        <select className='workout-form'>
                            <option value="push">Push</option>
                            <option value="pull">Pull</option>
                            <option value="legs">Legs</option>
                            <option value="arms">Arms</option>
                        </select>
                        <button id='begin-btn'>Begin</button>
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
                        {routines}
                    </div>
                </div>
                <div className='past-workouts'>
                    <div className='title'>
                            <h2>Past Workouts</h2>
                    </div>
                    <div className='past-workouts-list-container'>
                        {workouts}
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default WorkoutsPage;