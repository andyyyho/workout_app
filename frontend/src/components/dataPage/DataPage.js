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
        yAxisKey: 'Max Weight'
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
    const username = useSelector((state) => state.user.username)
    const liftEntries = useSelector((state) => state.fitness.liftEntries)
    const initialState = liftEntries.slice(0, 3).concat('All')
    const [graphedLifts, setGraphedLifts] = useState( initialState )

    const dataArr = []
    const labels = []
    const borderColors = ['rgb(255, 99, 132)', 'rgb(53, 162, 235)', 'rgb(50, 140, 0)']
    const backgroundColors = ['rgba(255, 99, 132, 0.5)', 'rgba(53, 162, 235, 0.5)', 'rgba(50, 140, 0, 0.5)']

    const dateLimit = graphedLifts[3] === 'All' ? null : graphedLifts[3]

    if (liftEntries) {
        for (let i = 0; i < graphedLifts.length - 1; i++) {
            if (graphedLifts[i].name !== 'None') {
                const liftObj = {
                label: graphedLifts[i].name,
                borderColor: borderColors[i],
                backgroundColor: backgroundColors[i],
                }
                
                const liftData = liftEntries
                    .filter((curLift) => curLift.name === graphedLifts[i].name)
                    .filter((curLift) => {
                        if (dateLimit) {
                            let cutoffDate;

                            const datedAt = new Date(curLift.createdAt)
                            const curYear = datedAt.getFullYear()
                            const curMonth = datedAt.getMonth()
                            const curDay = datedAt.getDate()
                            if (dateLimit === '7' || dateLimit === '14') cutoffDate = new Date(curYear, curMonth, curDay - Number(dateLimit))
                            else if (dateLimit === '1' || dateLimit === '3') cutoffDate = new Date(curYear, curMonth - Number(dateLimit), curDay)

                            return datedAt >= cutoffDate
                        } else return true
                    })
                    .map((el) => {
                        const maxWeight = Math.max(...el.weight)
                        const formattedDate = el.createdAt.slice(5,7) + '/' + el.createdAt.slice(8, 10) 
                        labels.push(formattedDate)
                        return {"Max Weight": maxWeight, date: formattedDate, weights: el.weight, reps: el.reps}
                    })
                liftObj.data = liftData
                dataArr.push(liftObj)
            }
        }
    }

    const data = {datasets: dataArr}
    const cacheObj = {}

    const lifts = liftEntries.map((lift) => {
        const tempArr = [graphedLifts[0].name, graphedLifts[1].name, graphedLifts[2].name]
        if (!tempArr.includes(lift.name) && !cacheObj[lift.name]) {
            cacheObj[lift.name] = true
            return <option key={lift._id} value={lift.name}>{lift.name}</option>
        }
        else return -1
     }).filter((el) => el !== -1)

    const changeGraph = () => {
        let firstLift = document.getElementById('first-lift').value
        let secondLift = document.getElementById('second-lift').value
        let thirdLift = document.getElementById('third-lift').value
        let dateCutoff = document.getElementById('date-lift').value
        let index = 101

        console.log(firstLift, secondLift, thirdLift)
        if (firstLift === secondLift) secondLift = 'None'
        if (firstLift === thirdLift) thirdLift = 'None'
        if (secondLift === thirdLift) thirdLift = 'None'
        
        for (const lift of liftEntries) {
            if (lift.name === firstLift) firstLift = lift
            else if (lift.name === secondLift) {
                console.log("Setting second lift: ", lift)
                secondLift = lift
            }
            else if (lift.name === thirdLift) {
                console.log("Setting third lift: ", lift)
                thirdLift = lift
            }
        }

        if (secondLift === 'None') {
            secondLift = {_id: index, name: secondLift}
            index++
        }
        if (thirdLift === 'None') {
            thirdLift = {_id: index, name: thirdLift}
        }

        setGraphedLifts([firstLift, secondLift, thirdLift, dateCutoff])
    }

    return(
        <div className='main-container'>
            <div className='header'>
                <h1>Your Progress</h1>
                <div id="user-welcome">
                    Hi, { username }
                </div>
            </div>
            <div className='main-body'>
                <div className='graph-controls'>
                    <form action="#" id = 'filter-form'>
                            {graphedLifts[0] ? 
                                <select id="first-lift">
                                    {graphedLifts[0] && <option key={graphedLifts[0]._id} value={graphedLifts[0].name}>{graphedLifts[0].name}</option>}
                                    {lifts}
                                </select>
                                :
                                <div id='no-lifts-msg'>Enter workouts in order to track your data</div>
                            }
                            {graphedLifts[1] && 
                                <select id="second-lift">
                                    <option key={graphedLifts[1]._id} value={graphedLifts[1].name} selected>{graphedLifts[1].name}</option>
                                    {lifts}
                                    {graphedLifts[1].name !== 'None' && <option key="1" value="None">None</option>}
                                </select>
                            }
                            {graphedLifts[2] &&
                                <select id="third-lift">
                                    <option key={graphedLifts[2]._id} value={graphedLifts[2].name} selected>{graphedLifts[2].name}</option>
                                    {lifts}
                                    {graphedLifts[2].name !== 'None' && <option key="2" value="None">None</option>}
                                </select>
                            }
                            {(graphedLifts[0] || graphedLifts[1] || graphedLifts[2]) && 
                                <>
                                    <select id="date-lift">
                                        <option value='All'>All Time</option>
                                        <option value='7'>Past Week</option>
                                        <option value='14'>Past 2 Weeks</option>
                                        <option value='1'>Past Month</option>
                                        <option value='3'>Past 3 Months</option>
                                    </select>
                                    <button onClick={ (e) => {e.preventDefault(); changeGraph() }}>Submit</button>
                                </>
                            }
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