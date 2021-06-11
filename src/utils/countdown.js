function padStart(str, len, pad) {
  if (String(str).length > len) return str
  return (Array(len).join(pad) + str).slice(-len);
}

/**
 * 倒计时
 * @param date
 * @returns {{hour: (*), day: number, minute: (*), second: (*)}|boolean}
 */
export default function (date) {
  // ios
  date = date.replace(/-/g, '/')
  let nowtime = new Date(), endtime = new Date(date)
  let lefttime = endtime.getTime() - nowtime.getTime()
  if (lefttime <= 0) {
    return false
  }
  let day = Math.floor(lefttime / (1000 * 60 * 60 * 24)),
    hour = Math.floor(lefttime / (1000 * 60 * 60) % 24),
    minute = Math.floor(lefttime / (1000 * 60) % 60),
    second = Math.floor(lefttime / 1000 % 60)
  return {
    day: day,
    hour: padStart(hour, 2, 0),
    minute: padStart(minute, 2, 0),
    second: padStart(second, 2, 0),
  }
}
