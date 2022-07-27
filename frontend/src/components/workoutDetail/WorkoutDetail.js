import './WorkoutDetail.scss'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

function WorkoutDetail(props) {
    const dispatch = useDispatch()
    const [workout, setWorkout] = useState(props.workout)
    const logger = () => {
        console.log(workout)
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
                    {workout.lifts.map((lift) => {
                        return (
                            <div className='movement-item'>
                                <h2>{lift.name}</h2>
                            </div>
                        )
                    })}
                    <button onClick={logger}>Click</button>
                </div>
            </div>
        </div>
    )
}

export default WorkoutDetail;