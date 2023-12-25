import { ChartData, ScriptableContext } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

interface Props {
	bnpAmount: number
	boursoAmount: number
	naloAmount: number
}

export const Repartition: React.FC<Props> = ({ bnpAmount, boursoAmount, naloAmount }) => {
	const chartData: ChartData<'doughnut', number[], string> = {
		labels: ['BNP', 'Bourso', 'Nalo'],
		datasets: [
			{
				label: 'Users Gained ',
				data: [bnpAmount, boursoAmount, naloAmount],
				backgroundColor: (context: ScriptableContext<'doughnut'>) => {
					const ctx = context.chart.ctx
					const gradient = ctx.createLinearGradient(0, 0, 0, 200)
					gradient.addColorStop(0, '#c8d0be')
					gradient.addColorStop(1, '#a8eb12')
					if (context.dataIndex === 0) return gradient
					const gradient2 = ctx.createLinearGradient(0, 0, 0, 200)
					gradient2.addColorStop(0, '#ff96cf')
					gradient2.addColorStop(0.25, '#ff919e')
					gradient2.addColorStop(0.5, '#ffa45e')
					gradient2.addColorStop(0.75, '#fec812')
					if (context.dataIndex === 1) return gradient2
					const gradient3 = ctx.createLinearGradient(0, 0, 0, 200)
					gradient3.addColorStop(0, '#051937')
					gradient3.addColorStop(0.5, '#004d7a')
					gradient3.addColorStop(1, '#008793')
					return gradient3
				},
				borderColor: 'black',
				borderWidth: 0,
			},
		],
	}
	return (
		<Doughnut
			data={chartData}
			options={{
				responsive: true,
				cutout: 90,
				plugins: {
					title: {
						display: false,
					},
					tooltip: {
						callbacks: {
							label: (context) => `Amount available : ${context.parsed} €`,
						},
					},
					legend: {
						position: 'bottom',
					},
				},
			}}
		/>
	)
}
