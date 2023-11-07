/**
 * @description 格式化名称
 */
import moment from 'moment';
const formatTime = (time: number) => {
  let format = '';
  if (time >= 10) {
    format = time.toString();
  } else {
    format = '0' + time.toString();
  }
  return format;
};

/**
 * 格式化更新时间，比如 Date.now() => 更新于xx天前或者刚刚修改
 * @param {number} time 时间戳
 * @returns
 */
export const formatTransformUpdateTime = (time?: number): string => {
  if (!time) return '';
  const currentTime = Date.now();
  const mUpdateTime = moment(time);
  const mCurrentTime = moment(currentTime);
  const diffYears = mCurrentTime.diff(mUpdateTime, 'year');
  const diffMonths = mCurrentTime.diff(mUpdateTime, 'month');
  if (diffMonths > 12) {
    return '更新于' + diffYears + '年前';
  } else {
    const diffDays = mCurrentTime.diff(mUpdateTime, 'day');
    if (diffDays > 30) {
      return '更新于' + diffMonths + '月前';
    } else {
      const diffHours = mCurrentTime.diff(mUpdateTime, 'hour');
      if (diffHours >= 24) {
        return '更新于' + diffDays + '天前';
      } else {
        const diffMinutes = mCurrentTime.diff(mUpdateTime, 'minute');
        if (diffMinutes >= 60) {
          return '更新于' + diffHours + '小时前';
        } else {
          if (diffMinutes >= 1) {
            return '更新于' + diffMinutes + '分钟前';
          } else {
            return '刚刚修改';
          }
        }
      }
    }
  }
};

/**
 * @description 时间换算
 * @example  new Date() -> 2023/02/14
 */
export function formatDate(
  date?: Date,
  unit?: string,
  ops?: {
    showYear?: boolean;
    showMonth?: boolean;
    showDay?: boolean;
    showHours?: boolean;
    showMinutes?: boolean;
    showSeconds?: boolean;
  }
) {
  const _ops = {
    showYear: true,
    showMonth: true,
    showDay: true,
    showHours: true,
    showMinutes: true,
    showSeconds: true,
    ...ops,
  };
  const _date = date || new Date();
  const year = _date.getFullYear().toString();
  const month = formatTime(_date.getMonth() + 1);
  const day = formatTime(_date.getDate());
  const hours = formatTime(_date.getHours());
  const minutes = formatTime(_date.getMinutes());
  const seconds = formatTime(_date.getSeconds());
  let timeString = '';
  if (_ops?.showYear) timeString += `${year}${unit}`;
  if (_ops?.showMonth) timeString += `${month}${unit}`;
  if (_ops?.showDay) timeString += `${day}${unit}`;
  if (_ops?.showHours) timeString += `${hours}${unit}`;
  if (_ops?.showMinutes) timeString += `${minutes}${unit}`;
  if (_ops?.showSeconds) timeString += `${seconds}${unit}`;
  return timeString.slice(0, timeString.lastIndexOf(unit || ''));
}
/**
 * @description 时间数值换算
 * @example 6002s -> 01:40:02
 */
export function formatSeconds(time?: number): string {
  const inputSecondTime = Math.floor(parseFloat((time || 0)?.toString()) * 10) / 10;
  let min = 0; // 初始化分
  let h = 0; // 初始化小时
  let secondTime = 0;
  let result = '';
  //如果秒数大于60，将秒数转换成整数
  min = Math.floor(inputSecondTime / 60);
  secondTime = Math.floor(inputSecondTime % 60); // 向下取整
  if (min > 60) {
    // 如果分钟大于60，将分钟转换成小时
    h = Math.floor(min / 60);
    min = parseInt((min % 60).toString(), 10); // 获取小时后取佘的分，获取分钟除以60取佘的分
  }
  if (h === 0) {
    result = `${min.toString().padStart(2, '0')}:${secondTime.toString().padStart(2, '0')}`;
  } else {
    result = `${h.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${secondTime.toString().padStart(2, '0')}`;
  }
  return result;
}

/**
 * @description 时间数值换算
 * @example 6002s -> 100:02
 */
export function transformMinuteSeconds(duration: number) {
  return `${formatTime(Math.floor(duration / 60))}:${formatTime(Math.floor(duration % 60))}`;
}

/**
 *   更新时间＜1小时显示：更新于 X分钟前
 *   更新时间≥1小时且＜1天显示：更新于 X小时前
 *   更新时间≥1天且＜1年显示：更新于 X天前
 *   更新时间≥1年显示：更新于 X年前
 */
export function transformTimeGrade(time: number) {
  let str = '更新于 ';
  const oldTime = new Date(time);
  const nowTime = new Date();
  // 10位数的时间戳是以秒为单位；13位数的时间戳是以毫秒为单位。
  const isSecondCompany = String(nowTime.getTime()).length === 10;
  const spendTimeMinute = isSecondCompany ? (nowTime.getTime() - oldTime.getTime()) / 60 : (nowTime.getTime() - oldTime.getTime()) / 60000;
  const spendHour = spendTimeMinute / 60;
  const spendDay = spendHour / 24;
  if (spendHour < 1) {
    str += (Math.floor(spendTimeMinute) <= 0 ? 1 : Math.floor(spendTimeMinute)) + '分钟前';
  } else if (spendHour >= 1 && spendHour < 24) {
    str += Math.floor(spendHour) + '小时前';
  } else if (nowTime.getFullYear() > oldTime.getFullYear()) {
    if (nowTime.getMonth() > oldTime.getMonth() || (nowTime.getMonth() === oldTime.getMonth() && nowTime.getDay() > nowTime.getDay())) {
      str += nowTime.getFullYear() - oldTime.getFullYear() + '年前';
    }
  } else {
    str += Math.floor(spendDay) + '小时前';
  }
  return str;
}
