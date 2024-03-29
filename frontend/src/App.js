import { Routes, Route } from 'react-router-dom'
import './App.scss';
import { Provider } from 'react-redux'
import store from './store'
import Home from './components/homePage/Home'
import DataPage from './components/dataPage/DataPage'
import Navbar from './components/navbar/Navbar'
import WorkoutsPage from './components/workoutsPage/WorkoutsPage'
import { saveToLocalStorage } from './localStorage';

store.subscribe(() => {
  const currentState = store.getState()
  saveToLocalStorage(currentState)
  console.log("Current State: ", currentState)
  console.log("Saved state!")
})

function App () {
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/data' element={<DataPage/>}/>
          <Route path='/workouts' element={<WorkoutsPage/>}/>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
