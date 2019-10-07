import moment from 'moment'

export function formateTime (date) {
  return moment(date).format('L')
}