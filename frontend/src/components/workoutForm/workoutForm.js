import './workoutForm.scss'
import { useState } from 'react'
import { addWorkout } from '../../slices/fitnessSlice'
import { useDispatch } from 'react-redux'

function WorkoutForm(props) {
    const dispatch = useDispatch()
    const [routine, setRoutine] = useState(props.routine)
    const [index, setIndex] = useState(0)
    const initialLifts = () => {
        const arr = []
        for (const lift of routine.lifts){
            arr.push({
                name: lift.name,
                reps: Array(lift.sets).fill(lift.reps),
                weight: Array(lift.sets),
            })
        }
        return arr
    }
    const initialState = initialLifts()
    const [lifts, setLifts] = useState(initialState)


    const changeReps = (value,i) => {
        const arrLifts = [...lifts]
        arrLifts[index].reps[i] = value
        setLifts(arrLifts)
        console.log(lifts)
    }

    const changeWeights = (value,i) => {
        const arrLifts = [...lifts]
        arrLifts[index].weight[i] = parseInt(value)
        setLifts(arrLifts)
    }

    const exitSession = () => {
        setLifts(initialLifts)
        props.toggle()
    }

    const saveSession = () => {
        dispatch(addWorkout({
            name: routine.name,
            notes: '',
            lifts
        }))
        exitSession()
    }
    
    return (
        <div className='wf-backdrop'>          
            <div className='navigation-panel-wf'>
                <div className='routine-content'>
                    <h1>{routine.name.toUpperCase()}</h1>
                    <p>{routine.lifts.length} Movements</p>
            
                        {routine.lifts.map((lift, idx) => {
                            return (
                                <div onClick={() => {setIndex(idx)}} className={idx === index ? 'lift active-tab' : 'lift'}>
                                    <h2>{lift.name.toUpperCase()}</h2> 
                                    <h3>{lift.sets} sets of {lift.reps} @ RPE {lift.rpe}</h3> 
                                </div>
                            )
                        })}
                        <div className='session-buttons'>
                            <button onClick={exitSession}>Exit Without Saving Session</button>
                            <button>Save and End Session</button>
                        </div>
                        
               
                </div>
            </div>
            <div className='main-content'>
                <section id='workout-ip'>
                    <h1 className='side-label'>{routine['lifts'][index].name.toUpperCase()}<br/>
                    RPE: {routine['lifts'][index].rpe} | NUMBER OF REPS: {routine['lifts'][index].reps}</h1>
                    {[...Array(routine['lifts'][index].sets).keys()].map( (i) => {
                        return (
                            <div className='set-card' key={i}>
                                <h1>Set {i + 1}</h1>
                                <input id={lifts[index].name+'_set_rep'+ i} type='number' placeholder='Reps' onChange={(e) => {changeReps(e.target.value,i)}} value={lifts[index].reps[i] ? lifts[index].reps[i] : ''} /> <br/>
                                <input id={lifts[index].name+'_set_weight'+ i} type='number' placeholder='Weight (lbs)' onChange={(e) => {changeWeights(e.target.value,i)}} value={lifts[index].weight[i] ? lifts[index].weight[i] : ''}/>
                            </div>
                        ) 
                    })}
                </section>
            </div>
        </div>
    )
}

export default WorkoutForm;