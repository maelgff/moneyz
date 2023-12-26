import React, { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import { Account } from './Homepage'
import { month } from '../months'
import { ScriptableContext } from 'chart.js'

interface Props {
	bankAccounts: Account[] | undefined
}

export const AccountsEvolution: React.FC<Props> = ({ bankAccounts }) => {
	const labels = [month[new Date().getMonth() - 1], month[new Date().getMonth()]]

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
				position: 'top' as const,
			},
			title: {
				display: false,
			},
		},
		scales: {
			x: {
				grid: {
					display: false,
				},
			},
			y: {
				grid: {
					display: false,
				},
			},
		},
	}

	const bnpAccount = useMemo(() => {
		return bankAccounts?.find((acc: Account) => acc.account_name === 'BNP')
	}, [bankAccounts])

	const boursoAccount = useMemo(() => {
		return bankAccounts?.find((acc: Account) => acc.account_name === 'Bourso')
	}, [bankAccounts])

	const naloAccount = useMemo(() => {
		return bankAccounts?.find((acc: Account) => acc.account_name === 'Nalo')
	}, [bankAccounts])

	const data = {
		labels,
		datasets: [
			{
				label: 'BNP',
				data: [bnpAccount?.last_amount, bnpAccount?.amount],
				backgroundColor: (context: ScriptableContext<'bar'>) => {
					const ctx = context.chart.ctx
					const gradient = ctx.createLinearGradient(0, 0, 0, 200)
					gradient.addColorStop(0, '#c8d0be')
					gradient.addColorStop(1, '#a8eb12')
					return gradient
				},
				borderRadius: Number.MAX_VALUE,
			},
			{
				label: 'Boursobank',
				data: [boursoAccount?.last_amount, boursoAccount?.amount],
				backgroundColor: (context: ScriptableContext<'bar'>) => {
					const ctx = context.chart.ctx
					const gradient = ctx.createLinearGradient(0, 0, 0, 200)
					gradient.addColorStop(0, '#ff96cf')
					gradient.addColorStop(0.25, '#ff919e')
					gradient.addColorStop(0.5, '#ffa45e')
					gradient.addColorStop(0.75, '#fec812')
					return gradient
				},
				borderRadius: Number.MAX_VALUE,
			},
			{
				label: 'Nalo',
				data: [naloAccount?.last_amount, naloAccount?.amount],
				backgroundColor: (context: ScriptableContext<'bar'>) => {
					const ctx = context.chart.ctx
					const gradient = ctx.createLinearGradient(0, 0, 0, 200)
					gradient.addColorStop(0, '#051937')
					gradient.addColorStop(0.5, '#004d7a')
					gradient.addColorStop(1, '#008793')
					return gradient
				},
				borderRadius: Number.MAX_VALUE,
			},
		],
	}
	return <Bar data={data} options={options} />
}
