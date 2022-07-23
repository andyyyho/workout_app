import { NavLink } from 'react-router-dom'
import { VscGraphLine as Graph, VscSettingsGear as Gear } from 'react-icons/vsc'
import { BsJournals as Journal } from 'react-icons/bs'
import { MdOutlinePerson as Person, MdCalendarToday as Calendar } from 'react-icons/md'
import { AiOutlineHome as Home, AiOutlineMenu as Menu } from 'react-icons/ai'
import './navbar.scss'

function Navbar() {
    return (
        <div className='navbar'>
            <div className='menu-button'>
                <Menu/>
            </div>
            
            <ul className='icons'>
                <li>
                    <NavLink to='/'><Person/></NavLink>
                </li>
                <li>
                    <NavLink to='/workouts'><Journal/></NavLink>
                </li>
                <li>
                    <NavLink to='/data'><Graph/></NavLink>
                </li>
                <li>
                    <NavLink to='/calendar'><Calendar/></NavLink>
                </li>
            </ul>
            
            <div className='settings-button'>
                <Gear/>
            </div>
        </div>
        
    )
}

export default Navbar;