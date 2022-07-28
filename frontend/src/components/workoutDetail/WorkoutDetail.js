import './WorkoutDetail.scss'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function WorkoutDetail(props) {
    const dispatch = useDispatch()
    const workout = useSelector((state) => state.fitness.currentLift)
    const [selectedLift, setSelectedLift] = useState(null)
    const logger = () => {
        console.log(liftEntries)
    }
    const initialLifts = () => {
        let arr = []
        if(workout.lifts.length > 0){
            for (let entry of workout.lifts){
                arr.push({
                    name: entry.name,
                    reps: [...entry.reps],
                    weight: [...entry.weight]
                })
            }
        }
        return arr
    }
    const [liftEntries, setLiftEntries] = useState(initialLifts())

    const changeReps = (value,i) => {
        let arrLifts = [...liftEntries]
        console.log(arrLifts)
        console.log(selectedLift, arrLifts[selectedLift].reps[i])
        arrLifts[selectedLift].reps[i] = value
        
        setLiftEntries(arrLifts)
        console.log(liftEntries)
    }

    const changeWeights = (value,i) => {
        const arrLifts = [...liftEntries]
        arrLifts[selectedLift].weight[i] = parseInt(value)
        setLiftEntries(arrLifts)
    }
    return (
        <div>
            <div onClick={props.toggle} className='workout-detail-backdrop'>
            </div>
            <div className='workout-detail-modal'>
                <div className='info'>
                    <h1>{workout.name}</h1>
                    <h3>{workout.lifts.length} Movements</h3>
                    <h3>{workout.createdAt}</h3>
                    <input type='textarea' value={workout.notes}/>
                </div>
                <div className='movements-list'>
                    {workout.lifts.map((lift, i) => {
                        return (
                            <div onClick={() => {console.log(i); setSelectedLift(i)}} className='movement-item'>
                                <h3>{lift.name}</h3>
                                <h3>{lift.reps.length} sets of {lift.reps} @ RPE {lift.rpe}</h3> 
                            </div>
                        )
                    })}
                    <button onClick={logger}>Click</button>
                </div>
                {liftEntries[selectedLift] ? 
                <div className='movement-item-inputs'>
                    <h1>{liftEntries[selectedLift].name}</h1>
                    {[...Array(liftEntries[selectedLift].reps.length).keys()].map( (index) => {
                        return (
                            <div className='set-card' key={index}>
                                <h3 className='card-title'>Set {index + 1}</h3>
                                <input type='number' placeholder='Reps' onChange={(e) => {changeReps(e.target.value,index)}} value={liftEntries[selectedLift].reps[index] ? liftEntries[selectedLift].reps[index] : ''} /> Reps <br/>
                                <input type='number' placeholder='Weight (lbs)' onChange={(e) => {changeWeights(e.target.value,index)}} value={liftEntries[selectedLift].weight[index] ? liftEntries[selectedLift].weight[index] : ''}/> Lbs
                            </div>
                        )
                    })}
                </div> : null}
            </div>
        </div>
    )
}

export default WorkoutDetail;