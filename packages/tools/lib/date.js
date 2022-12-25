/**
 * 日期格式化
 * 参考: [dayjs.format](https://dayjs.gitee.io/docs/zh-CN/display/format)
 * @param  {Number|String|Date} date        日期
 * @param  {String} [format='YYYY-MM-DD']      格式化
 * @param  {String} [invalidText='--'] 解析错误时的返回
 * @return {String}             日期格式文本
 * @example
 *
 * formatTime(1628659676589);
 * // => '2021-08-11'
 *
 * @example
 *
 * formatTime(1628659676589, 'YYYY-MM-DD HH:mm');
 * // => '2021-08-11 13:27'
 *
 * @example
 *
 * formatTime(1628659676589, 'YYYY-MM-DD HH:mm:ss');
 * // => '2021-08-11 13:27:56'
 *
 * @example
 *
 * formatTime(new Date('2021-08-11 13:27:56'));
 * // => '2021-08-11'
 *
 * @example
 *
 * formatTime('2021-08-11 13:27:56');
 * // => '2021-08-11'
 *
 * @example
 *
 * formatTime(null);
 * // => '--'
 */
export const formatTime = (date, format = 'YYYY-MM-DD', invalidText = '--') => {
  const WeekTextMap = ['日', '一', '二', '三', '四', '五', '六']
  if (+date <= 0) {
    return invalidText
  }
  const dt = new Date(+date || +new Date(date))
  const year = dt.getFullYear()
  const month = dt.getMonth() + 1
  const day = dt.getDate()
  const hour = dt.getHours()
  const minute = dt.getMinutes()
  const second = dt.getSeconds()
  const week = `星期${WeekTextMap[dt.getDay()]}`
  const parse = {
    YYYY: year,
    MM: month,
    DD: day,
    HH: hour,
    mm: minute,
    ss: second,
    w: week
  }

  parse.yyyy = parse.YYYY
  parse.dd = parse.DD
  parse.hh = parse.HH

  // 补零
  Object.entries(parse).forEach(([k, v]) => {
    parse[k] = String(v).padStart(2, 0)
  })

  // 上午|下午
  parse.a = hour / 12 >= 1 ? 'pm' : 'am'
  parse.A = parse.a.toUpperCase()

  return Object.entries(parse).reduce((prev, [k, v]) => {
    return prev.replace(k, v)
  }, format)
}

/**
 * moment/locale/zh-cn.js 中文语言包
 * @param  {Moment} moment  moment
 * @return {*}        注册中文语言包
 * @example
 *
 * const moment = require('moment');
 * defineMomentLocaleZhCn(moment);
 */
export const defineMomentLocaleZhCn = moment => {
  moment.defineLocale('zh-cn', {
    months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
    weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
    weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'YYYY/MM/DD',
      LL: 'YYYY年M月D日',
      LLL: 'YYYY年M月D日Ah点mm分',
      LLLL: 'YYYY年M月D日ddddAh点mm分',
      l: 'YYYY/M/D',
      ll: 'YYYY年M月D日',
      lll: 'YYYY年M月D日 HH:mm',
      llll: 'YYYY年M月D日dddd HH:mm'
    },
    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
    meridiemHour(hour, meridiem) {
      if (hour === 12) {
        // eslint-disable-next-line no-param-reassign
        hour = 0
      }
      if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
        return hour
      }
      if (meridiem === '下午' || meridiem === '晚上') {
        return hour + 12
      }
      // '中午'
      return hour >= 11 ? hour : hour + 12
    },
    meridiem(hour, minute) {
      const hm = hour * 100 + minute
      if (hm < 600) {
        return '凌晨'
      }
      if (hm < 900) {
        return '早上'
      }
      if (hm < 1130) {
        return '上午'
      }
      if (hm < 1230) {
        return '中午'
      }
      if (hm < 1800) {
        return '下午'
      }
      return '晚上'
    },
    calendar: {
      sameDay: '[今天]LT',
      nextDay: '[明天]LT',
      nextWeek(now) {
        if (now.week() !== this.week()) {
          return '[下]dddLT'
        }
        return '[本]dddLT'
      },
      lastDay: '[昨天]LT',
      lastWeek(now) {
        if (this.week() !== now.week()) {
          return '[上]dddLT'
        }
        return '[本]dddLT'
      },
      sameElse: 'L'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
    ordinal(number, period) {
      switch (period) {
        case 'd':
        case 'D':
        case 'DDD':
          return `${number}日`
        case 'M':
          return `${number}月`
        case 'w':
        case 'W':
          return `${number}周`
        default:
          return number
      }
    },
    relativeTime: {
      future: '%s后',
      past: '%s前',
      s: '几秒',
      ss: '%d 秒',
      m: '1 分钟',
      mm: '%d 分钟',
      h: '1 小时',
      hh: '%d 小时',
      d: '1 天',
      dd: '%d 天',
      w: '1 周',
      ww: '%d 周',
      M: '1 个月',
      MM: '%d 个月',
      y: '1 年',
      yy: '%d 年'
    },
    week: {
      // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
      dow: 1, // Monday is the first day of the week.
      doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
  })
}
