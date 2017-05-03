// 用以处理时间的问题
export const timeProcess = (date) => {
  let handleTime = new Date(date)

  let hour = handleTime.getHours()
  let minute = handleTime.getMinutes()

  let processHour = hour < 10 ? '0' + hour : hour
  let processMinute = minute < 10 ? '0' + minute : minute

  return processHour + ':' + processMinute
}
