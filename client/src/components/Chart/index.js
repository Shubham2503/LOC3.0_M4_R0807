import React from 'react'
import Chart from "react-google-charts";

const Chart_comp = (props) => {
    return (
        <Chart
            width={'500px'}
            height={'150px'}
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={[
                ['Calori', 'Calori Gained', 'Calori Lost'],
                ['Calori', props.gain, props.loss],
            ]}
            options={{
                // Material chart options
                chart: {
                    title: 'Calori calculation',
                },
                bars: 'horizontal',
                axes: {
                    y: {
                        0: { side: 'right' },
                    },
                },
            }}
        />
    )
}

export default Chart_comp