import { Routes, Route } from 'react-router-dom'
import './App.scss';
import Home from './components/homePage/Home'
import DataPage from './components/dataPage/DataPage'
import Navbar from './components/navbar/Navbar'
import WorkoutsPage from './components/workoutsPage/WorkoutsPage';

function App () {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/data' element={<DataPage/>}/>
        <Route path='/workouts' element={<WorkoutsPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
