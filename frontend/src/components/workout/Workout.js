import React from 'react';
import { RiDeleteBin7Line as Bin } from 'react-icons/ri'
import { AiOutlineEdit as Edit } from 'react-icons/ai'
import './Workout.scss'
function Workout(props) {
    return (
        <div className='workout-list-item'>
            <div className='main-content'> 
                <h3>{props.name}</h3>
                <div className='btn-group'>
                    <Edit/>
                    <Bin id='remove-btn'/>
                </div>
            </div>
        </div>
    )
}

export default Workout;