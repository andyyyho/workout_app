import { Link } from 'react-router-dom'
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
                    <Link to='/'><Person/></Link>
                </li>
                <li>
                    <Link to='/workouts'><Journal/></Link>
                </li>
                <li>
                    <Link to='/data'><Graph/></Link>
                </li>
                <li>
                    <Link to='/calendar'><Calendar/></Link>
                </li>
            </ul>
            
            <div className='settings-button'>
                <Gear/>
            </div>
        </div>
        
    )
}

export default Navbar;