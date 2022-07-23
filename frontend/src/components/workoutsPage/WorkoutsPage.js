import './WorkoutsPage.scss';
import Routine from '../routine/Routine'
import Workout from '../workout/Workout'
import { IoAddOutline as Add } from 'react-icons/io5'
import CircularProgress from '../circularProgress/CircularProgress.js';
function WorkoutsPage() {

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
                </div>
                <div className='new-workout-card'>
                    <h2>Start new workout</h2>
                    <form>
                        <select className='workout-form'>
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="mercedes">Mercedes</option>
                            <option value="audi">Audi</option>
                        </select>
                        <button id='begin-btn'>Begin Workout</button>
                    </form>
                </div>
                <div className='goal-track'>
                    {/* <CircularProgress/> */}
                    0 days this week
                </div>
                <div className='streak-track'>
                    2 weeks
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