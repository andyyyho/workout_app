import './DataPage.scss'
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2'

export const options = {
    maintainAspectRatio: false,
    responsive: true,
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
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  export const data = {
    labels,
    datasets: [ 
      {
        label: 'Dataset 1',
        data: labels.map(() => Math.random() * 100),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => 20),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

const workoutsList = ['Bench', 'Squat', 'Deadlift']

function DataPage () {
    const workouts = workoutsList.map((workout) => {
        return <option key={workout._id} value={workout}>{workout}</option>
    })
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
                    <form>
                        <select>
                            {workouts}
                        </select>
                        <select>
                            <option value='7'>Past Week</option>
                            <option value='14'>Past 2 Weeks</option>
                            <option value='30'>Past Month</option>
                            <option value='90'>Past 3 Months</option>
                            <option value='All'>All Time</option>
                        </select>
                        <button>Submit</button>
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