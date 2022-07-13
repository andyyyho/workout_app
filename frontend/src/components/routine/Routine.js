import React from 'react';
import './Routine.scss';
import { RiDeleteBin7Line as Bin } from 'react-icons/ri'
import { AiOutlineEdit as Edit } from 'react-icons/ai'

function Routine(props) {
    return (
        <div className='routine-list-item'>
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

export default Routine
