import moment from 'moment-timezone'

export function contestTime(start_date, start_time) {
  const contestTimespan = moment.tz(start_date + " " + start_time, "Asia/Jakarta").unix();
  const currentTimespan = moment.tz("Asia/Jakarta").unix();
  const leftTime = contestTimespan - currentTimespan;
  const duration = moment.duration(leftTime, 'seconds');

  let durationTime = moment.duration(duration.asSeconds() - 1, 'seconds');
  if(durationTime.seconds()<0) {
    return "00:00:00:00"
  } else {
    let d = duration.days();
    let h = duration.hours();
    let m = duration.minutes();
    let s = duration.seconds();
    if(duration.days()<10) {d = '0'+ duration.days();}
    if(duration.hours()<10) {h = '0'+ duration.hours();}
    if(duration.minutes()<10) {m = '0'+ duration.minutes();}
    if(duration.seconds()<10) {s = '0'+ duration.seconds();}
    return d+":"+h+":"+m+":"+s
  }

}