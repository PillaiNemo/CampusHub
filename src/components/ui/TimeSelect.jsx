import Select from './Select'

function buildSlots(startHour = 7, endHour = 21, stepMinutes = 15) {
  const slots = []
  for (let mins = startHour * 60; mins <= endHour * 60; mins += stepMinutes) {
    const h = Math.floor(mins / 60)
    const m = mins % 60
    const value = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
    const period = h < 12 ? 'AM' : 'PM'
    const h12 = h % 12 === 0 ? 12 : h % 12
    slots.push({ value, label: `${h12}:${String(m).padStart(2, '0')} ${period}` })
  }
  return slots
}

const TIME_OPTIONS = buildSlots()

export default function TimeSelect(props) {
  return <Select {...props} options={TIME_OPTIONS} placeholder={props.placeholder ?? 'Select time…'} />
}
