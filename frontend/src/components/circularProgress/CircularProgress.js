import './CircularProgress.scss'

function CircularProgress(props) {

    
    return (
        <div className='circ-container'>
            <div className='outer-ring'>
                <div className='inner-ring'>
                    <div id='progress-num'>
                        {props.value + ' ' + props.label}
                    </div>
                </div>
            </div>

            <svg width="100%" height="100%" viewBox="0 0 160 160">
                <defs>
                    <linearGradient id='linear-prog-gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
                        <stop offset='0%' stopColor='#323cff'/>
                        <stop offset='100%' stopColor='#b867ff'/>
                    </linearGradient>
                </defs>
                <circle className={'circle-' + props.value}  cx="80" cy="80" r="70" />
            </svg>
        </div>
    )
}

export default CircularProgress;