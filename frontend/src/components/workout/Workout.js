import React from 'react';
import { RiDeleteBin7Line as Bin } from 'react-icons/ri'
import { AiOutlineEdit as Edit } from 'react-icons/ai'
import './Workout.scss'
function Workout(props) {
    return (
        <div className='workout-list-item'>
            <div onClick={props.toggle} className='main-content'> 
                <h4>{props.name}</h4>
                <div className='btn-group'>
                    <Edit/>
                    <Bin id='remove-btn'/>
                </div>
            </div>
            <p>{props.date}</p>
        </div>
    )
}

export default Workout;