// type Period = 'Today'| 'This Week' | 'This Month'
// const periods: Period[] = ['Today','This Week','This Month']
// as const no final substitui essa declaração

export const periods = ['Today','This Week','This Month'] as const

export type Period = typeof periods[number]