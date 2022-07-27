import './DataPage.scss'
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto';
import { useState } from 'react'
import { useSelector } from 'react-redux'

export const options = {
    maintainAspectRatio: false,
    responsive: true,
    parsing: {
        xAxisKey: 'date',
        yAxisKey: 'weight'
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
    layout: {
        padding: 20
    }
}; 

function DataPage () {
    const liftEntries = useSelector((state) => state.fitness.liftEntries)
    const initialState = liftEntries.slice(0, 3)
    const [graphedLifts, setGraphedLifts] = useState( initialState )

    const dataArr = []
    const labels = []
    const borderColors = ['rgb(255, 99, 132)', 'rgb(53, 162, 235)', 'rgb(20, 90, 200)']
    const backgroundColors = ['rgba(255, 99, 132, 0.5)', 'rgba(53, 162, 235, 0.5)', 'rgba(50, 140, 0, 0.5)']

    for (let i = 0; i < graphedLifts.length; i++) {
        if (graphedLifts[i]) {
            const liftObj = {
              label: graphedLifts[i].name,
              borderColor: borderColors[i],
              backgroundColor: backgroundColors[i],
            }
            
            const liftData = liftEntries.filter((curLift) => curLift.name === graphedLifts[i].name).map((el) => {
                const maxWeight = Math.max(...el.weight)
                labels.push(el.createdAt)
                return {weight: maxWeight, date: el.createdAt}
            })
            liftObj.data = liftData
            dataArr.push(liftObj)
        }
    }

    const data = {datasets: dataArr}
    const cacheObj = {}

    const lifts = liftEntries.map((lift) => {
        const tempArr = [graphedLifts[0].name, graphedLifts[1].name, graphedLifts[2].name]
        if (!tempArr.includes(lift.name) && !cacheObj[lift.name]) return <option key={lift._id} value={lift.name}>{lift.name}</option>
        else return -1
    }).filter((el) => el !== -1)

    const changeGraph = () => {
        let firstLift = document.getElementById('first-lift').value
        let secondLift = document.getElementById('second-lift').value
        let thirdLift = document.getElementById('third-lift').value

        for (const lift of liftEntries) {
          if (lift.name === firstLift) firstLift = lift
          else if (lift.name === secondLift) secondLift = lift
          else if (lift.name === thirdLift) thirdLift = lift
        }

        setGraphedLifts([firstLift, secondLift, thirdLift])
    }

    return(
        <div className='main-container'>
            <div className='header'>
                <h1>Your Progress</h1>
                <div id="user-welcome">
                    Hi, Andy
                </div>
            </div>
            <div className='main-body'>
                <div className='graph-controls'>
                    <form action="#" id = 'filter-form'>
                            <select id="first-lift">
                                <option key={graphedLifts[0]._id} value={graphedLifts[0].name}>{graphedLifts[0].name}</option>
                                {lifts}
                            </select>
                            <select id="second-lift">
                                <option key={graphedLifts[1]._id} value={graphedLifts[1].name}>{graphedLifts[1].name}</option>
                                {lifts}
                            </select>
                            <select id="third-lift">
                                <option key={graphedLifts[2]._id} value={graphedLifts[2].name}>{graphedLifts[2].name}</option>
                                {lifts}
                            </select>
                            <select id="date-lift">
                                <option value='7'>Past Week</option>
                                <option value='14'>Past 2 Weeks</option>
                                <option value='1'>Past Month</option>
                                <option value='3'>Past 3 Months</option>
                                <option value='All'>All Time</option>
                            </select>
                            <button type="submit" onClick={ (e) => {e.preventDefault(); changeGraph() }}>Submit</button>
                    </form>
                </div>
                <div className='graph'>
                    <Line options={options} data={data}/>
                </div>
            </div>

        </div>
    )
}

export default DataPage;