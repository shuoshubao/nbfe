/*!
* @nbfe/tools v0.2.14
* (c) 2019-2022 shuoshubao <759979885@qq.com>
* Released under the ISC License.
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash')) :
    typeof define === 'function' && define.amd ? define(['exports', 'lodash'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.tools = {}, global.lodash));
})(this, (function (exports, lodash) { 'use strict';

    var version = "0.2.14";

    var Pagination = {
      // Options.jsx
      items_per_page: '条/页',
      jump_to: '跳至',
      jump_to_confirm: '确定',
      page: '页',
      // Pagination.jsx
      prev_page: '上一页',
      next_page: '下一页',
      prev_5: '向前 5 页',
      next_5: '向后 5 页',
      prev_3: '向前 3 页',
      next_3: '向后 3 页'
    };
    var CalendarLocale = {
      locale: 'zh_CN',
      today: '今天',
      now: '此刻',
      backToToday: '返回今天',
      ok: '确定',
      timeSelect: '选择时间',
      dateSelect: '选择日期',
      weekSelect: '选择周',
      clear: '清除',
      month: '月',
      year: '年',
      previousMonth: '上个月 (翻页上键)',
      nextMonth: '下个月 (翻页下键)',
      monthSelect: '选择月份',
      yearSelect: '选择年份',
      decadeSelect: '选择年代',
      yearFormat: 'YYYY年',
      dayFormat: 'D日',
      dateFormat: 'YYYY年M月D日',
      dateTimeFormat: 'YYYY年M月D日 HH时mm分ss秒',
      previousYear: '上一年 (Control键加左方向键)',
      nextYear: '下一年 (Control键加右方向键)',
      previousDecade: '上一年代',
      nextDecade: '下一年代',
      previousCentury: '上一世纪',
      nextCentury: '下一世纪'
    };
    var timePickerLocale = {
      placeholder: '请选择时间',
      rangePlaceholder: ['开始时间', '结束时间']
    };
    var DatePicker = {
      lang: _.extend({
        placeholder: '请选择日期',
        yearPlaceholder: '请选择年份',
        quarterPlaceholder: '请选择季度',
        monthPlaceholder: '请选择月份',
        weekPlaceholder: '请选择周',
        rangePlaceholder: ['开始日期', '结束日期'],
        rangeYearPlaceholder: ['开始年份', '结束年份'],
        rangeMonthPlaceholder: ['开始月份', '结束月份'],
        rangeWeekPlaceholder: ['开始周', '结束周']
      }, CalendarLocale),
      timePickerLocale: _.extend({}, timePickerLocale)
    };
    DatePicker.lang.ok = '确 定';
    var Calendar = {
      lang: _.extend({
        placeholder: '请选择日期',
        yearPlaceholder: '请选择年份',
        quarterPlaceholder: '请选择季度',
        monthPlaceholder: '请选择月份',
        weekPlaceholder: '请选择周',
        rangePlaceholder: ['开始日期', '结束日期'],
        rangeYearPlaceholder: ['开始年份', '结束年份'],
        rangeMonthPlaceholder: ['开始月份', '结束月份'],
        rangeWeekPlaceholder: ['开始周', '结束周']
      }, CalendarLocale),
      timePickerLocale: _.extend({}, timePickerLocale)
    };
    Calendar.lang.ok = '确 定';
    var typeTemplate = '${label}不是一个有效的${type}';
    var antdLocaleZhCN = {
      locale: 'zh-cn',
      // locales for all components
      global: {
        placeholder: '请选择'
      },
      Pagination: Pagination,
      DatePicker: DatePicker,
      TimePicker: timePickerLocale,
      Calendar: Calendar,
      Table: {
        filterTitle: '筛选',
        filterConfirm: '确定',
        filterReset: '重置',
        filterEmptyText: '无筛选项',
        selectAll: '全选当页',
        selectInvert: '反选当页',
        selectNone: '清空所有',
        selectionAll: '全选所有',
        sortTitle: '排序',
        expand: '展开行',
        collapse: '关闭行',
        triggerDesc: '点击降序',
        triggerAsc: '点击升序',
        cancelSort: '取消排序'
      },
      Modal: {
        okText: '确定',
        cancelText: '取消',
        justOkText: '知道了'
      },
      Popconfirm: {
        cancelText: '取消',
        okText: '确定'
      },
      Transfer: {
        searchPlaceholder: '请输入搜索内容',
        itemUnit: '项',
        itemsUnit: '项',
        remove: '删除',
        selectCurrent: '全选当页',
        removeCurrent: '删除当页',
        selectAll: '全选所有',
        removeAll: '删除全部',
        selectInvert: '反选当页'
      },
      Upload: {
        uploading: '文件上传中',
        removeFile: '删除文件',
        uploadError: '上传错误',
        previewFile: '预览文件',
        downloadFile: '下载文件'
      },
      Empty: {
        description: '暂无数据'
      },
      Icon: {
        icon: '图标'
      },
      Text: {
        edit: '编辑',
        copy: '复制',
        copied: '复制成功',
        expand: '展开'
      },
      PageHeader: {
        back: '返回'
      },
      Form: {
        optional: '（可选）',
        defaultValidateMessages: {
          "default": '字段验证错误${label}',
          required: '请输入${label}',
          "enum": '${label}必须是其中一个[${enum}]',
          whitespace: '${label}不能为空字符',
          date: {
            format: '${label}日期格式无效',
            parse: '${label}不能转换为日期',
            invalid: '${label}是一个无效日期'
          },
          types: {
            string: typeTemplate,
            method: typeTemplate,
            array: typeTemplate,
            object: typeTemplate,
            number: typeTemplate,
            date: typeTemplate,
            "boolean": typeTemplate,
            integer: typeTemplate,
            "float": typeTemplate,
            regexp: typeTemplate,
            email: typeTemplate,
            url: typeTemplate,
            hex: typeTemplate
          },
          string: {
            len: '${label}须为${len}个字符',
            min: '${label}最少${min}个字符',
            max: '${label}最多${max}个字符',
            range: '${label}须在${min}-${max}字符之间'
          },
          number: {
            len: '${label}必须等于${len}',
            min: '${label}最小值为${min}',
            max: '${label}最大值为${max}',
            range: '${label}须在${min}-${max}之间'
          },
          array: {
            len: '须为${len}个${label}',
            min: '最少${min}个${label}',
            max: '最多${max}个${label}',
            range: '${label}数量须在${min}-${max}之间'
          },
          pattern: {
            mismatch: '${label}与模式不匹配${pattern}'
          }
        }
      },
      Image: {
        preview: '预览'
      }
    };
    /**
     * antd 的 中文语言包
     * @see https://ant.design/docs/react/i18n-cn
     * @return {Object} antd 的 中文语言包
     *
     * @example
     *
     * // <ConfigProvider locale={getAntdLocaleZhCN()}>
     */

    var getAntdLocaleZhCN = function getAntdLocaleZhCN() {
      return antdLocaleZhCN;
    };

    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);

      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);

        if (enumerableOnly) {
          symbols = symbols.filter(function (sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        }

        keys.push.apply(keys, symbols);
      }

      return keys;
    }

    function _objectSpread2(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};

        if (i % 2) {
          ownKeys(Object(source), true).forEach(function (key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function (key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }

      return target;
    }

    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }

      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }

    function _asyncToGenerator(fn) {
      return function () {
        var self = this,
            args = arguments;
        return new Promise(function (resolve, reject) {
          var gen = fn.apply(self, args);

          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }

          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }

          _next(undefined);
        });
      };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }

    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }

    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }

    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }

    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }

    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

      if (_i == null) return;
      var _arr = [];
      var _n = true;
      var _d = false;

      var _s, _e;

      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }

    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;

      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

      return arr2;
    }

    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    /**
     * 重复数组
     * @param  {Array}  [arr=[]] 数组
     * @return {Boolean}     数组是否存在重复项
     * @example
     *
     * isUniq();
     * // => true
     *
     * @example
     *
     * isUniq([1, 2, 3]);
     * // => true
     *
     * @example
     *
     * isUniq([1, 2, 3, 2]);
     * // => false
     */

    var isUniq = function isUniq() {
      var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return _.uniq(arr).length === arr.length;
    };
    /**
     * 空字符串
     * @param  {*} value 值
     * @return {Boolean}     是否是空字符串
     * @example
     *
     * isEmptyString('');
     * // => true
     *
     * @example
     *
     * isEmptyString(null);
     * // => false
     *
     * @example
     *
     * isEmptyString([]);
     * // => false
     */

    var isEmptyString = function isEmptyString(value) {
      return value === '';
    };
    /**
     * 空值: null undefined ''
     * @param  {*} value [description]
     * @return {Boolean}     [description]
     * @example
     *
     * isEmptyValue(null);
     * // => true
     * isEmptyValue(undefined);
     * // => true
     * isEmptyValue('');
     * // => true
     * isEmptyValue([]);
     * // => false
     * isEmptyValue(false);
     * // => false
     * isEmptyValue(123);
     * // => false
     */

    var isEmptyValue = function isEmptyValue(value) {
      return [_.isNull, _.isUndefined, isEmptyString].some(function (v) {
        return v(value);
      });
    };
    /**
     * Promise
     * @param  {*} value [description]
     * @return {Boolean}     是否是Promise
     * @example
     *
     * const p1 = new Promise((resolve, reject) => {
     *
     * });
     * isPromise(p1);
     * // => false
     *
     * isPromise(1);
     * // => false
     */

    var isPromise = function isPromise(value) {
      return _.isObject(value) && _.isFunction(value.then);
    };
    /**
     * Blob
     * @param  {*} value [description]
     * @return {Boolean}     是否是Blob类型
     * @example
     *
     * isBlob(new Blob());
     * // => true
     *
     * @example
     *
     * isBlob(123);
     * // => false
     */

    var isBlob = function isBlob(value) {
      return Object.prototype.toString.call(value) === '[object Blob]';
    };
    /**
     * 空数组
     * @param  {*} arr 值
     * @return {Boolean}     是否是空数组
     * @example
     *
     * isEmptyArray([]);
     * // => true
     *
     * @example
     *
     * isEmptyArray([1, 2]);
     * // => false
     *
     * @example
     *
     * isEmptyArray('abc');
     * // => false
     */

    var isEmptyArray = function isEmptyArray(arr) {
      return _.isArray(arr) && arr.length === 0;
    };
    /**
     * 空对象
     * @param  {*} obj 值
     * @return {Boolean}     是否是空对象 {}
     * @example
     *
     * isEmptyObject({});
     * // => true
     *
     * @example
     *
     * isEmptyObject({ a: 1 });
     * // => false
     *
     * @example
     *
     * isEmptyObject(null);
     * // => false
     */

    var isEmptyObject = function isEmptyObject(obj) {
      return obj && isEmptyArray(Object.keys(obj));
    };
    /**
     * 全真
     * @param  {...*} args 值
     * @return {Boolean}         数组每一项都是truthy
     * @example
     *
     * isEveryTruthy(1, 2, 3);
     * // true
     *
     * @example
     * isEveryTruthy([1, 2, 3]);
     * // true
     *
     * @example
     * isEveryTruthy(0, 2, 3);
     * // false
     *
     * @example
     * isEveryTruthy(1 > 0, 2 != 1, 3);
     * // true
     */

    var isEveryTruthy = function isEveryTruthy() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _.flatten(args).every(Boolean);
    };
    /**
     * 全假
     * @param  {...*} args 值
     * @return {Boolean}         数组每一项都是falsy
     * @example
     *
     * isEveryFalsy(false, '', 0);
     * // => true
     *
     * @example
     *
     * isEveryFalsy([false, '', 0]);
     * // => true
     *
     * @example
     *
     * isEveryFalsy(false, '', 2 > 1);
     * // => false
     */

    var isEveryFalsy = function isEveryFalsy() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return _.flatten(args).every(function (v) {
        return !Boolean(v);
      });
    };
    /**
     * 部分真
     * @param  {...*} args 值
     * @return {Boolean}         部分真
     * @example
     *
     * isSomeTruthy(1, 2, 3);
     * // => true
     *
     * @example
     *
     * isSomeTruthy([1, 2]);
     * // => true
     *
     * @example
     *
     * isSomeTruthy(0, null);
     * // => false
     *
     * @example
     *
     * isSomeTruthy([]);
     * // => false
     *
     * @example
     *
     * isSomeTruthy([0, false]);
     * // => false
     */

    var isSomeTruthy = function isSomeTruthy() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return _.flatten(args).some(Boolean);
    };
    /**
     * 部分假
     * @param  {...*} args 值
     * @return {Boolean}         部分假
     * @example
     *
     * isSomeFalsy(0, 1, 2);
     * // => true
     *
     * @example
     *
     * isSomeFalsy([0, null]);
     * // => true
     *
     * @example
     *
     * isSomeFalsy(1, 2, true, 'false');
     * // => false
     */

    var isSomeFalsy = function isSomeFalsy() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return _.flatten(args).some(function (v) {
        return !Boolean(v);
      });
    };

    /**
     * 只保留对象的部分属性(删除之外的属性)
     * @param  {Object} [data] 数据源
     * @param  {Array}  [keys] 需要保留的属性列表
     * @return {*}      修改数据源
     * @example
     *
     * var data = { a: 1, b: 2, c: 3 }
     * reserveProperties(data, ['a'])
     * console.log(data);
     *
     * // => { a: 1 };
     *
     */

    var reserveProperties = function reserveProperties() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      Object.keys(data).filter(function (v) {
        return !keys.includes(v);
      }).forEach(function (v) {
        delete data[v];
      });
    };
    /**
     * 批量删除属性
     * @param  {Object} [data] 数据源
     * @param  {Array}  [keys] 需要删除的属性列表
     * @return {*}      修改数据源
     * @example
     *
     * var data = { a: 1, b: 2, c: 3 };
     * removeProperties(data, ['a']);
     * console.log(data);
     * // => { b: 2, c: 3 };
     */

    var removeProperties = function removeProperties() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      keys.forEach(function (v) {
        delete data[v];
      });
    };
    /**
     * 批量删除属性值为空的属性
     * @param  {Object} [data] 数据源
     * @return {*}      修改数据源
     * @example
     *
     * var data = { a: '', b: 0, c: false, d: null, e: { a: 0 } };
     * removeEmptyProperties(data, ['a']);
     * console.log(data);
     * // => { b: 0, c: false, e: { a: 0 } };
     */

    var removeEmptyProperties = function removeEmptyProperties() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      Object.entries(data).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        if (isEmptyValue(v)) {
          delete data[k];
        }
      });
    };
    /**
     * 产生一个值全为空的对象
     * @param  {Array}  [keys]      属性列表
     * @param  {String} [emptyText] 空值
     * @return {Object}           [值全为空的对象]
     * @example
     *
     * produceEmptyObject(['a', 'b']);
     * // => { a: '', b: '' }
     *
     * @example
     *
     * produceEmptyObject(['a', 'b'], null);
     * // => { a: null, b: null }
     */

    var produceEmptyObject = function produceEmptyObject() {
      var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var emptyText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      return _.flatten(keys).reduce(function (prev, cur) {
        prev[cur] = emptyText;
        return prev;
      }, {});
    };
    /**
     * 将数据中的空值替换为默认值
     * @param  {Object} data     数据源
     * @param  {Object} formater [{ key, value }]
     * @return {*}      修改数据源
     * @example
     *
     * const data = {
     *     a: 1,
     *     b: null,
     *     c: '',
     *     d: ' '
     * };
     * const formater1 = {
     *     a: '',
     *     b: -1,
     *     c: -1
     * };
     * formatEmptyToDefault(data, formater1);
     * console.log(data);
     * // => { a: 1, b: -1, c: -1, d: ' ' }
     */

    var formatEmptyToDefault = function formatEmptyToDefault() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var formater = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      Object.entries(data).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            k = _ref4[0],
            v = _ref4[1];

        Object.entries(formater).forEach(function (_ref5) {
          var _ref6 = _slicedToArray(_ref5, 2),
              k2 = _ref6[0],
              v2 = _ref6[1];

          if (k2 === k) {
            if (isEmptyValue(v)) {
              data[k] = v2;
            }
          }
        });
      });
    };
    /**
     * 将 promise变成一个只有 resolved 态
     * @param  {Promise} promise Promise实例
     * @param  {any} [params]  需要传入的参数
     * @return {Promise<Boolean>}         Promise 执行结果
     * @example
     *
     * // nothing
     */

    var booleanPromise = function booleanPromise(promise, params) {
      return new Promise(function (resolve) {
        var tempPromise;

        if (params) {
          tempPromise = promise(params);
        } else {
          tempPromise = promise();
        }

        tempPromise.then(function () {
          resolve(true);
        })["catch"](function () {
          resolve(false);
        });
      });
    };

    var WeekTextMap = ['日', '一', '二', '三', '四', '五', '六'];
    /**
     * 日期格式化
     * 参考: [dayjs.format](https://dayjs.gitee.io/docs/zh-CN/display/format)
     * @param  {Number|String|Date} date        [description]
     * @param  {String} [format='YYYY-MM-DD']      format
     * @param  {String} [invalidText='--'] [description]
     * @return {String}             [description]
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

    var formatTime = function formatTime(date) {
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD';
      var invalidText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '--';

      if (+date <= 0) {
        return invalidText;
      }

      var dt = new Date(+date || +new Date(date));
      var year = dt.getFullYear();
      var month = dt.getMonth() + 1;
      var day = dt.getDate();
      var hour = dt.getHours();
      var minute = dt.getMinutes();
      var second = dt.getSeconds();
      var week = "\u661F\u671F".concat(WeekTextMap[dt.getDay()]);
      var parse = {
        YYYY: year,
        MM: month,
        DD: day,
        HH: hour,
        mm: minute,
        ss: second,
        w: week
      };
      parse.yyyy = parse.YYYY;
      parse.dd = parse.DD;
      parse.hh = parse.HH; // 补零

      Object.entries(parse).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        parse[k] = String(v).padStart(2, 0);
      }); // 上午|下午

      parse.a = hour / 12 >= 1 ? 'pm' : 'am';
      parse.A = parse.a.toUpperCase();
      return Object.entries(parse).reduce(function (prev, _ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            k = _ref4[0],
            v = _ref4[1];

        return prev.replace(k, v);
      }, format);
    };
    /**
     * moment/locale/zh-cn.js 中文语言包
     * @param  {Moment} moment  moment
     * @return {*}        注册中文语言包
     * @example
     *
     * import * as moment from 'moment';
     * defineMomentLocaleZhCn(moment);
     */

    var defineMomentLocaleZhCn = function defineMomentLocaleZhCn(moment) {
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
        meridiemHour: function meridiemHour(hour, meridiem) {
          if (hour === 12) {
            hour = 0;
          }

          if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
            return hour;
          } else if (meridiem === '下午' || meridiem === '晚上') {
            return hour + 12;
          } else {
            // '中午'
            return hour >= 11 ? hour : hour + 12;
          }
        },
        meridiem: function meridiem(hour, minute, isLower) {
          var hm = hour * 100 + minute;

          if (hm < 600) {
            return '凌晨';
          } else if (hm < 900) {
            return '早上';
          } else if (hm < 1130) {
            return '上午';
          } else if (hm < 1230) {
            return '中午';
          } else if (hm < 1800) {
            return '下午';
          } else {
            return '晚上';
          }
        },
        calendar: {
          sameDay: '[今天]LT',
          nextDay: '[明天]LT',
          nextWeek: function nextWeek(now) {
            if (now.week() !== this.week()) {
              return '[下]dddLT';
            } else {
              return '[本]dddLT';
            }
          },
          lastDay: '[昨天]LT',
          lastWeek: function lastWeek(now) {
            if (this.week() !== now.week()) {
              return '[上]dddLT';
            } else {
              return '[本]dddLT';
            }
          },
          sameElse: 'L'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
        ordinal: function ordinal(number, period) {
          switch (period) {
            case 'd':
            case 'D':
            case 'DDD':
              return number + '日';

            case 'M':
              return number + '月';

            case 'w':
            case 'W':
              return number + '周';

            default:
              return number;
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
          dow: 1,
          // Monday is the first day of the week.
          doy: 4 // The week that contains Jan 4th is the first week of the year.

        }
      });
    };

    var getDecLength = function getDecLength(num) {
      var _String$split = String(num).split('.'),
          _String$split2 = _slicedToArray(_String$split, 2),
          _String$split2$ = _String$split2[1],
          dec = _String$split2$ === void 0 ? '' : _String$split2$;

      return dec.length;
    };

    var removeDot = function removeDot(num) {
      return +String(num).replace('.', '');
    };

    var mulTwo = function mulTwo(a, b) {
      var decAll = getDecLength(a) + getDecLength(b);
      return removeDot(a) * removeDot(b) / Math.pow(10, decAll);
    };

    var plusTwo = function plusTwo(a, b) {
      var decMax = Math.max(getDecLength(a), getDecLength(b));
      var temp = Math.pow(10, decMax);
      return (mulTwo(a, temp) + mulTwo(b, temp)) / temp;
    };
    /**
     * 浮点数计算-加法
     * @alias add
     * @param  {...Number} [args] 加数
     * @return {Number} 运算之和
     * @example
     *
     * plus(0.1, 0.2)
     * // => 0.3
     *
     * @example
     *
     * plus(0.1, 0.1, 0.1)
     * // => 0.3
     *
     * @example
     *
     * plus([0.1, 0.1, 0.1])
     * // => 0.3
     */


    var plus = function plus() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _.flatten(args).reduce(function (prev, cur) {
        return plusTwo(prev, cur);
      }, 0);
    };
    /**
     * 浮点数计算-减法
     * @alias sub
     * @param  {Number} a 减数
     * @param  {Number} b 被减数
     * @return {Number} 运算之差
     * @example
     *
     * minus(0.3, 0.1)
     * // => 0.2
     */

    var minus = function minus(a, b) {
      return plus(a, mulTwo(b, -1));
    };
    /**
     * 浮点数计算-乘法
     * @alias times
     * @param  {...Number} [args] 乘数
     * @return {Number} 运算之积
     * @example
     *
     * mul(0.1, 0.2)
     * // => 0.02
     *
     * @example
     *
     * mul(0.1, 0.1, 0.1)
     * // => 0.001
     *
     * @example
     *
     * mul([0.1, 0.1, 0.1])
     * // => 0.001
     */

    var mul = function mul() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return _.flatten(args).reduce(function (prev, cur) {
        return mulTwo(prev, cur);
      }, 1);
    };
    /**
     * 浮点数计算-除法
     * @alias dividedBy
     * @param  {Number} a 除数
     * @param  {Number} b 被除数
     * @return {Number} 运算之差
     * @example
     *
     * div(0.3, 0.1)
     * // => 3
     */

    var div = function div(a, b) {
      var decMax = Math.max(getDecLength(a), getDecLength(b));
      var temp = Math.pow(10, decMax);
      return mulTwo(a, temp) / mulTwo(b, temp);
    };

    /**
     * 睡眠函数
     * 可用于模拟接口请求, 或者 setTimeout 的替代形式
     * @param  {Number} [time] 等待时长(秒)
     * @example
     *
     * await sleep()
     * console.log(1)
     * // => 随机时间(2s-5s)后输出: 1
     *
     * @example
     * await sleep(3)
     * console.log(1)
     * // => 3秒后输出: 1
     */

    var sleep = function sleep() {
      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      var sleepTime = time < 0 ? _.random(2, 5) : time;
      return new Promise(function (resolve) {
        return setTimeout(resolve, sleepTime * 1e3);
      });
    };
    /**
     * 模拟接口请求
     * @param  {Object} [data] 返回数据
     * @return {Number} [time] 等待时长(秒)
     * @example
     *
     * const data = await fakeFetch({ a: 1 }, 1.5)
     * console.log(data);
     * // => 1.5秒后输出: { a: 1 }
     */

    var fakeFetch = function fakeFetch() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
      return new Promise(function (resolve) {
        sleep(time).then(function () {
          resolve(data);
        });
      });
    };

    /**
     * 将query字符串变成对象
     * @param  {String} [queryString] query字符串
     * @return {Object}             query对象
     * @example
     *
     * queryParse()
     * // => {}
     *
     * @example
     *
     * queryParse('')
     * // => {}
     *
     * @example
     *
     * queryParse('?')
     * // => {}
     *
     * @example
     *
     * queryParse('?a')
     * // => { a: null }
     *
     * @example
     *
     * queryParse('?a=1')
     * // => { a: '1' }
     *
     * @example
     *
     * queryParse('a=1')
     * // => { a: '1' }
     *
     * @example
     *
     * queryParse('a=true')
     * // => { a: 'true' }
     *
     * @example
     *
     * queryParse('a=1&b')
     * // => { a: '1', b: null }
     *
     * @example
     *
     * queryParse('a=1&b=2')
     * // => { a: '1', b: '2' }
     *
     * @example
     *
     * queryParse('a=1&b&c')
     * // => { a: '1', b: null, c: null }
     *
     * @example
     *
     * queryParse('a=1&b=2&c&d=2&d=3')
     * // => { a: '1', b: '2', c: null, d: ['2', '3'] }
     *
     * @example
     *
     * queryParse('a=1&b=2&c&d=2&d=3&d')
     * // => { a: '1', b: '2', c: null, d: ['2', '3', null] }
     */

    var queryParse = function queryParse() {
      var queryString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var query;

      if (queryString.startsWith('?')) {
        query = queryString.substring(1);
      } else {
        query = queryString;
      }

      if (isEmptyString(query)) {
        return {};
      }

      return query.split('&').reduce(function (prev, cur) {
        var _cur$split = cur.split('='),
            _cur$split2 = _slicedToArray(_cur$split, 2),
            k = _cur$split2[0],
            _cur$split2$ = _cur$split2[1],
            v = _cur$split2$ === void 0 ? null : _cur$split2$;

        var val = _.isNull(v) ? v : decodeURIComponent(v);

        if (_.isUndefined(prev[k])) {
          prev[k] = val;
        } else {
          prev[k] = _.flatten([prev[k], val]);
        }

        return prev;
      }, {});
    };
    /**
     * 将对象变成query字符串
     * @param  {Object} [params] query对象
     * @return {String}        query字符串
     * @example
     * queryStringify()
     * // => ''
     *
     * @example
     * queryStringify(null)
     * // => ''
     *
     * @example
     * queryStringify({})
     * // => ''
     *
     * @example
     * queryStringify({ a: 1 })
     * // => 'a=1'
     *
     * @example
     * queryStringify({ a: '1' })
     * // => 'a=1'
     *
     * @example
     * queryStringify({ a: 1, b: 2 })
     * // => 'a=1&b=2'
     *
     * @example
     * queryStringify({ a: 1, b: null })
     * // => 'a=1&b'
     *
     * @example
     * queryStringify({ a: 1, b: null, c: null })
     * // => 'a=1&b&c'
     *
     * @example
     * queryStringify({ a: 1, b: undefined, c: null })
     * // => 'a=1&c'
     *
     * @example
     * queryStringify({ a: true })
     * // => 'a=true'
     *
     * @example
     * queryStringify({ a: true, b: false })
     * // => 'a=true&b=false'
     *
     * @example
     * queryStringify({ a: 1, b: 2, c: null, d: [2, 3] })
     * // => 'a=1&b=2&c&d=2&d=3'
     *
     * @example
     * queryStringify({ a: 1, b: 2, c: null, d: [2, undefined, 3, null] })
     * // => 'a=1&b=2&c&d=2&d=3&d'
     */

    var queryStringify = function queryStringify() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return Object.entries(params || {}).reduce(function (prev, cur) {
        var _cur = _slicedToArray(cur, 2),
            k = _cur[0],
            v = _cur[1];

        if (_.isUndefined(v)) {
          return prev;
        }

        if (_.isNull(v)) {
          prev.push(k);
        } else {
          var list = _.flatten([v]).filter(function (v2) {
            return !_.isUndefined(v2);
          }).map(function (v2) {
            var val = encodeURIComponent(v2);
            return _.isNull(v2) ? k : [k, val].join('=');
          });
          prev.push.apply(prev, _toConsumableArray(list));
        }

        return prev;
      }, []).join('&');
    };

    /**
     * 获取参数
     * @param  {String} str query字符串
     * @param  {String} key query的key
     * @return {String|Object}     完整的query对象或者单个的query值
     * @example
     *
     * getParams('a=1&b=2&c&d=2&d=3')
     * // => { a: '1', b: '2', c: null, d: ['2', '3'] }
     *
     * @example
     *
     * getParams('a=1&b=2&c&d=2&d=3', 'a')
     * // => '1'
     */

    var getParams = function getParams(str, key) {
      var params = queryParse(str);

      if (isEmptyValue(key)) {
        return params;
      }

      return params[key];
    };
    /**
     * 获取 search 参数
     * @param  {String} key [description]
     * @return {String|Object}     [description]
     * @example
     *
     * // 假设当前的url为 http://aa.com/abc/d?a=1&b=2
     * search()
     * // => { a: '1', b: '2' }
     *
     * search('a')
     * // => '1'
     */

    var search = function search() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      // 从hash里解析 search 参数 (router 模式)
      var _split = (window.location.search || window.location.hash).split('?'),
          _split2 = _slicedToArray(_split, 2),
          _split2$ = _split2[1],
          str = _split2$ === void 0 ? '' : _split2$;

      return getParams(str, key);
    };
    /**
     * 拼接url
     * @param  {String} [url='']    基础url
     * @param  {Object} [params={}] query参数
     * @return {String}        拼接的完整url
     * @example
     *
     * stringifyUrl('', { a: 1 })
     * // => '?a=1'
     *
     * @example
     *
     * stringifyUrl('abc', { a: 1 })
     * // => 'abc?a=1'
     *
     * @example
     *
     * stringifyUrl('http://aa.com/abc/d', { a: 1 })
     * // => 'http://aa.com/abc/d?a=1'
     */

    var stringifyUrl = function stringifyUrl() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var args = Object.entries(params).reduce(function (prev, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        if (!_.isNil(v) && v !== '') {
          prev[k] = v;
        }

        return prev;
      }, {});

      if (isEmptyObject(args)) {
        return url;
      }

      return [url, queryStringify(args)].join('?');
    };
    /**
     * 更新 url 某个参数
     * @param  {Object} params 新的query参数
     * @param  {String} url    基础url
     * @return {String}        更新query后的完整url
     * @example
     *
     * updateUrlQuery({ a: 1 }, '');
     * // => '?a=1'
     *
     * @example
     *
     * updateUrlQuery({ a: 2 }, 'http://aa.com/abc/d?a=1')
     * // => 'http://aa.com/abc/d?a=2'
     */

    var updateUrlQuery = function updateUrlQuery() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var baseUrl = url.split('?')[0];
      var query = getParams(url.split('?')[1] || '');
      return stringifyUrl(baseUrl, _objectSpread2(_objectSpread2({}, query), params));
    };
    /**
     * 跳转页面
     * @param  {String} url     基础url
     * @param  {Object} [params={}]  query参数
     * @param  {Object} [options={}] a链接的属性
     * @return {*}         跳转页面
     * @example
     *
     * linkTo('http://aa.com/abc/d', { a: 1 })
     * // => 打开页面 http://aa.com/abc/d?a=1
     *
     * @example
     *
     * linkTo('http://aa.com/abc/d', { a: 1 }, { target: '_blank' })
     * // => 新标签打开页面 http://aa.com/abc/d?a=1
     */

    var linkTo = function linkTo() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var defaultOptions = {
        target: '_self',
        // a 标签属性
        isNewTab: false,
        // 是否在新 Tab打开（窗口、tab页）
        rel: 'noreferrer',
        // a 标签属性
        download: '' // a 标签属性

      };

      var computedOptions = _objectSpread2(_objectSpread2({}, defaultOptions), options);

      if (computedOptions.isNewTab) {
        computedOptions.target = '_blank';
      }

      var target = computedOptions.target,
          rel = computedOptions.rel,
          download = computedOptions.download;
      var href = stringifyUrl(url, params);
      var elmentA = document.createElement('a');
      elmentA.target = target;
      elmentA.href = href;

      if (rel) {
        elmentA.rel = rel;
      }

      if (download) {
        if (download === true) {
          elmentA.setAttribute('download', '');
        } else {
          elmentA.setAttribute('download', download);
        }
      }

      elmentA.setAttribute('hidden', 'hidden');
      document.body.appendChild(elmentA);
      elmentA.click();
      document.body.removeChild(elmentA);
    };
    /**
     * 解析 url
     * @param  {String} [url=''] url字符串
     * @return {Object}     { 'protocol', 'host', 'pathname', 'port', 'search', 'hash', 'origin', 'hostname' }
     * @example
     *
     * parseUrl('http://aa.com/abc/d?a=1');
     * // => {"protocol": "http:", "host": "aa.com", "pathname": "/abc/d", "port": "", "search": "?a=1", "hash": "", "origin": "http://aa.com", "hostname": "aa.com"}
     */

    var parseUrl = function parseUrl() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var elmentA = document.createElement('a');
      elmentA.href = url;
      var result = _.pick(elmentA, ['protocol', 'host', 'pathname', 'port', 'search', 'hash', 'origin', 'hostname']);
      elmentA = null;
      return result;
    };
    /**
     * 获取完整 url
     * @param  {String} url 相对路径
     * @return {String}     完整的url
     * @example
     *
     * // 假设当前的url为 http://aa.com/abc/d?a=1&b=2
     * getFullUrl('/abc')
     * // => http://aa.com/abc
     */

    var getFullUrl = function getFullUrl() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      if (!url) {
        return '';
      }

      var elmentA = document.createElement('a');
      elmentA.href = url;
      var result = elmentA.href;
      elmentA = null;
      return result;
    };

    /**
     * 给元素批量设置属性
     * @param  {HTMLElement} element   dom元素
     * @param  {Object} [attrs] 属性
     * @return {*}       undefined
     * @example
     *
     * setAttrs(eDiv, { id: 1, class: 'abc' })
     * // => <div id="1" class="abc"></div>
     */

    var setAttrs = function setAttrs(element) {
      var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      Object.entries(attrs).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        element.setAttribute(k, v);
      });
    };
    /**
     * 下载 blob
     * @param  {*} blob    blob数据
     * @param  {Object} [options] a链接的属性
     * @return {*}       undefined
     * @example
     *
     * downloadBlob(blobData, { download: 'demo.png' })
     * // => 浏览器下载文件
     */

    var downloadBlob = function downloadBlob(blob) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var fileReader = new FileReader();
      fileReader.readAsDataURL(blob);

      fileReader.onload = function (e) {
        var elmentA = document.createElement('a');
        var href = e.target.result;
        setAttrs(elmentA, _objectSpread2(_objectSpread2({}, options), {}, {
          href: href
        }));
        document.body.appendChild(elmentA);
        elmentA.click();
        document.body.removeChild(elmentA);
      };
    };
    /**
     * 下载文件
     * @param  {String} url    [description]
     * @param  {Object} config [description]
     * @return {*}       undefined
     * @example
     *
     * download('https://github.githubassets.com/favicons/favicon.png', { download: 'favicon.ico' })
     * // => 浏览器下载文件
     */

    var download = function download() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var elmentA = document.createElement('a');
      document.body.append(elmentA);
      var downloadFileName = _.last(url.split('/'));
      setAttrs(elmentA, _objectSpread2({
        href: url,
        download: downloadFileName,
        target: '_blank',
        rel: 'noopener noreferrer'
      }, config));
      setStyle(elmentA, {
        display: 'none !important'
      });
      elmentA.click();
      document.body.removeChild(elmentA);
    }; // 当值为数字时, 加上单位 `px` 的css属性

    var DefaultUnitsPxProperties = ['font-size', 'margin', 'padding', 'border']; // margin, padding, border

    ['top', 'right', 'bottom', 'left'].forEach(function (v) {
      DefaultUnitsPxProperties.push(v);
      DefaultUnitsPxProperties.push(['margin', v].join('-'));
      DefaultUnitsPxProperties.push(['padding', v].join('-'));
      DefaultUnitsPxProperties.push(['border', v, 'width'].join('-'));
    }); // max min

    ['width', 'height'].forEach(function (v) {
      DefaultUnitsPxProperties.push(v);
      DefaultUnitsPxProperties.push(['max', v].join('-'), ['min', v].join('-'));
    });
    /**
     * 给cssom加上单位px
     * @param  {Object} [cssom] [description]
     * @return {Object}       带有'px'单位的 cssom
     * @example
     *
     * convertCssom({ width: 100, height: 200 })
     * // => { width: '100px', height: '200px' }
     *
     * @example
     *
     * convertCssom({ width: 100, minHeight: 100, marginTop: 10, paddingBottom: 10 })
     * // => { width: '100px', 'min-height': '100px', 'margin-top': '10px', 'padding-bottom': '10px' }
     */

    var convertCssom = function convertCssom() {
      var cssom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return Object.entries(cssom).reduce(function (prev, _ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            k = _ref4[0],
            v = _ref4[1];

        var key = _.kebabCase(k); // 对于一些特定属性, 当值为数字时, 加上单位 px

        if (_.isNumber(v) && DefaultUnitsPxProperties.includes(key)) {
          prev[key] = "".concat(v, "px");
        } else {
          prev[key] = v;
        }

        return prev;
      }, {});
    };
    /**
     * 给元素批量设置样式
     * @param  {HTMLElement} element   dom元素
     * @param  {StyleSheet} cssom   cssom
     * @return {*}       undefined
     * @example
     *
     * setStyle(eDiv, { width: 100, color: 'red' })
     * // => <div style="width: 100px; color: red;"></div>
     */

    var setStyle = function setStyle(element, cssom) {
      var computedCssom = convertCssom(cssom);
      Object.entries(computedCssom).forEach(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            k = _ref6[0],
            v = _ref6[1];

        element.style[k] = v;
      });
    };
    /**
     * 获取 cssText
     * @param  {StyleSheet} cssom   cssom
     * @return {String}       cssText 字符串
     * @example
     *
     * getCssText({ width: 100, color: 'red' })
     * // => 'width: 100px; color: red;'
     */

    var getCssText = function getCssText() {
      var cssom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (isEmptyObject(cssom)) {
        return '';
      }

      var computedCssom = convertCssom(cssom);
      var cssText = Object.entries(computedCssom).reduce(function (prev, _ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
            k = _ref8[0],
            v = _ref8[1];

        prev.push([k, v].join(': '));
        return prev;
      }, []).join('; ');
      return [cssText, ';'].join('');
    };
    /**
     * 获取字符串在浏览器中所占的长度
     * @param  {String} word  字符串
     * @param  {StyleSheet} cssom   cssom
     * @return {Number}       字符串在浏览器中所占的长度
     *
     * @example
     * getWordWidth('四个汉字')
     * // => 56
     *
     * @example
     * getWordWidth('汉字abc123')
     * // => 78
     */

    var getWordWidth = function getWordWidth() {
      var word = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var cssom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var eleSpan = document.createElement('span');
      var defaultCssom = {
        visibility: 'hidden',
        whiteSpace: 'nowrap',
        fontSize: 14
      };
      eleSpan.style.cssText = getCssText(_objectSpread2(_objectSpread2({}, defaultCssom), cssom));
      document.body.appendChild(eleSpan);
      eleSpan.innerText = word;
      var width = eleSpan.offsetWidth;
      document.body.removeChild(eleSpan);
      return Math.ceil(Number.parseFloat(width));
    };
    /**
     * 复制文本
     * @param  {*} element   [description]
     * @param  {Object} attrs [description]
     * @return {*}       undefined
     * @example
     *
     * copyText('abc')
     * // => 复制内容到粘贴板
     *
     * @example
     *
     * copyText('abc\n123')
     * // => 复制内容到粘贴板
     */

    var copyText = function copyText() {
      var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    };
    /**
     * classNames
     * @see https://www.npmjs.com/package/classnames
     * @param  {...*} args   每个className的描述
     * @return {String}       className 字符串
     * @example
     *
     * classNames('foo', 'bar')
     * // => 'foo bar'
     *
     * @example
     *
     * classNames('foo', { bar: true })
     * // => 'foo bar'
     *
     * @example
     *
     * classNames({ 'foo-bar': true })
     * // => 'foo-bar'
     *
     * @example
     *
     * classNames({ 'foo-bar': false })
     * // => ''
     *
     * @example
     *
     * classNames({ foo: true }, { bar: true })
     * // => 'foo bar'
     *
     * @example
     *
     * classNames({ foo: true, bar: true })
     * // => 'foo bar'
     */

    var classNames = function classNames() {
      var classNameList = [];

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _.flattenDeep([args]).forEach(function (v) {
        if (_.isObject(v)) {
          Object.entries(v).forEach(function (_ref9) {
            var _ref10 = _slicedToArray(_ref9, 2),
                k2 = _ref10[0],
                v2 = _ref10[1];

            if (v2) {
              classNameList.push(k2);
            }
          });
        } else {
          classNameList.push(String(v || '').trim());
        }
      });
      return _.uniq(classNameList.filter(Boolean)).join(' ');
    };
    /**
     * 给 className 加后缀
     * 适用于开发组件库时, 给className加作用域
     * @param  {String} [baseClassName='']   基准 ClassName
     * @param  {Object} [suffixConfig={}]   classNames 对象
     * @param  {Object} [config={separator: '-'}]   classNames 对象
     * @return {String}       className 字符串
     * @example
     *
     * suffixClassNames('table', { bordered: true, shadow: false })
     * // => 'table table-bordered'
     */

    var suffixClassNames = function suffixClassNames() {
      var baseClassName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var suffixConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var computedConfig = _objectSpread2({
        separator: '-'
      }, config);

      var classNameList = [baseClassName];
      Object.entries(suffixConfig).forEach(function (_ref11) {
        var _ref12 = _slicedToArray(_ref11, 2),
            k = _ref12[0],
            v = _ref12[1];

        if (v) {
          classNameList.push([baseClassName, k].join(computedConfig.separator));
        }
      });
      return classNames(classNameList);
    };

    /**
     * 通过 value 获取 label
     * @param  {*} value     [description]
     * @param  {Array}  [data=[{ value, label }]]      数据源
     * @param  {String} [emptyText='--'] 空值
     * @return {String}           value对应的label
     * @example
     *
     * const data = [{ value: 5, label: '优秀' }, { value: 4, label: '良好' }, { value: 3, label: '及格' }]
     * getLabelByValue(5, data)
     * // => '优秀'
     *
     * @example
     * getLabelByValue('5', data)
     * // => '优秀'
     *
     * @example
     * getLabelByValue(null, data)
     * // => '--'
     *
     * @example
     * getLabelByValue(null, data, '暂无')
     * // => '暂无'
     */

    var getLabelByValue = function getLabelByValue(value) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var emptyText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '--';
      var item = data.find(function (v) {
        return String(v.value) === String(value);
      });

      if (item) {
        return item.label;
      }

      return emptyText;
    };
    /**
     * 将 json 转换成 [{ value, label }]
     * @param  {Object} [data={}] json数据
     * @return {Array}      标准的枚举数据格式 [{ value, label }]
     * @example
     *
     * const data = { 优秀: 5, 良好: 4, 及格: 3 }
     * convertJsonToEnum(data)
     * // => [{ value: 5, label: '优秀' }, { value: 4, label: '良好' }, { value: 3, label: '及格' }]
     */

    var convertJsonToEnum = function convertJsonToEnum() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return Object.entries(data).reduce(function (prev, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        prev.push({
          value: k,
          label: v
        });
        return prev;
      }, []);
    };
    /**
     * 通过 label 获取 value
     * @see getLabelByValue
     * @param  {*} value     [description]
     * @param  {Array}  [data=[{ value, label }]]      数据源
     * @param  {String} [emptyText='--'] 空值
     * @return {String}           value对应的label
     * @example
     *
     * const data = [{ value: 5, label: '优秀' }, { value: 4, label: '良好' }, { value: 3, label: '及格' } }]
     * getValueByLabel('优秀', data)
     * // => 5
     */

    var getValueByLabel = function getValueByLabel(label) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var emptyText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '--';
      var tempData = data;

      if (_.isPlainObject(data)) {
        tempData = convertJsonToEnum(data);
      }

      var item = tempData.find(function (v) {
        return String(v.label) === String(label);
      });

      if (item) {
        return item.value;
      }

      return emptyText;
    };
    /**
     * 将任意数据返回转换成 Enum [{ value, label }]
     * @param  {Object} res     数据源
     * @param  {Object} [options]={} { path = '', valueKey = 'value', labelKey = 'label', renderLabel = node => node.label }
     * @return {Array}         标准的枚举数据格式 [{ value, label }]
     * @example
     *
     * const res = { code: 1, data: { list: [{ code: 5, desc: '优秀' }, { code: 4, desc: '良好' }, { code: 3, desc: '及格' } }] }, message: 'success' }
     * convertDataToEnum(res, { path: 'data.list', valueKey: 'code', labelKey: 'desc' })
     * // => [{ value: 5, label: '优秀' }, { value: 4, label: '良好' }, { value: 3, label: '及格' }]
     */

    var convertDataToEnum = function convertDataToEnum(res) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (isEmptyValue(res)) {
        return [];
      }

      var _options$path = options.path,
          path = _options$path === void 0 ? '' : _options$path,
          _options$valueKey = options.valueKey,
          valueKey = _options$valueKey === void 0 ? 'value' : _options$valueKey,
          _options$labelKey = options.labelKey,
          labelKey = _options$labelKey === void 0 ? 'label' : _options$labelKey,
          _options$renderLabel = options.renderLabel,
          renderLabel = _options$renderLabel === void 0 ? function (node) {
        return node.label;
      } : _options$renderLabel;
      var list = path ? _.get(res, path, []) : res;
      return list.map(function (v) {
        // 数组的每一项是基本类型: number | string
        if (!_.isPlainObject(v)) {
          return {
            value: v,
            label: v
          };
        }

        var value = _.get(v, valueKey);
        var label = renderLabel(_objectSpread2(_objectSpread2({}, v), {}, {
          value: value,
          label: _.get(v, labelKey)
        }));
        return _objectSpread2(_objectSpread2({}, v), {}, {
          value: value,
          label: label
        });
      });
    };
    /**
     * 将任意数据返回转换成 Cascader: [{ value, label, children: [{ value, label }]}]
     * @param  {Object} res    数据源
     * @param  {Object} [options]={} { path = '', valueKey = 'value', labelKey = 'label', childrenKey = 'children', renderLabel = node => node.label }
     * @return {Array}         标准的枚举数据格式 [{ value, label }]
     * @example
     *
     * const res = { code: 1, data: { list: [{ code: 5, desc: '优秀' }, { code: 4, desc: '良好' }, { code: 3, desc: '及格', list: [ { code: 3.5, desc: '一般' } ] } }] }, message: 'success' }
     * convertDataToCascader(res, { path: 'data.list', valueKey: 'code', labelKey: 'desc', childrenKey: 'list' })
     * // => [{ value: 5, label: '优秀' }, { value: 4, label: '良好' }, { value: 3, label: '及格', children: [{ value: 3.5, label: '一般' }] }]
     */

    var convertDataToCascader = function convertDataToCascader(res, config) {
      var _config$path = config.path,
          path = _config$path === void 0 ? '' : _config$path,
          _config$valueKey = config.valueKey,
          valueKey = _config$valueKey === void 0 ? 'value' : _config$valueKey,
          _config$labelKey = config.labelKey,
          labelKey = _config$labelKey === void 0 ? 'label' : _config$labelKey,
          _config$childrenKey = config.childrenKey,
          childrenKey = _config$childrenKey === void 0 ? 'children' : _config$childrenKey,
          _config$renderLabel = config.renderLabel,
          renderLabel = _config$renderLabel === void 0 ? function (node) {
        return node.label;
      } : _config$renderLabel;

      var convertData = function convertData(data) {
        return data.reduce(function (prev, cur) {
          var item = {
            value: cur[valueKey],
            label: cur[labelKey],
            children: []
          };
          item.label = renderLabel(item);

          if (cur[childrenKey]) {
            item.children = convertData(cur[childrenKey]);
          }

          prev.push(item);
          return prev;
        }, []);
      };

      var list = path ? _.get(res, path, []) : res;
      return convertData(list);
    };
    /**
     * 从集合中取值
     * 比 getLabelByValue 更宽松, 容错, 默认值
     * @see getLabelByValue
     * @param  {*} value      值
     * @param  {Array}  data 数据源
     * @param  {Object} options    { key = '', valueKey = '', emptyText = '--' }
     * @return {*}            值
     * @example
     *
     * const data = [{ code: 5, desc: '优秀' }, { code: 4, desc: '良好' }, { code: 3, desc: '及格' } }];
     * getValueInCollection('优秀', data, { key: 'code', valueKey: 'desc' })
     * // => 5
     *
     * @example
     *
     * const data = [{ code: 5, desc: '优秀' }, { code: 4, desc: '良好' }, { code: 3, desc: '及格' } }];
     * getValueInCollection(5, data, { valueKey: 'code', key: 'desc' })
     * // => '优秀'
     */

    var getValueInCollection = function getValueInCollection(value) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var _options$key = options.key,
          key = _options$key === void 0 ? '' : _options$key,
          _options$valueKey2 = options.valueKey,
          valueKey = _options$valueKey2 === void 0 ? '' : _options$valueKey2,
          _options$emptyText = options.emptyText,
          emptyText = _options$emptyText === void 0 ? '--' : _options$emptyText;
      var item = data.find(function (v) {
        return String(value) === String(v[key]);
      });

      if (item) {
        return item[valueKey];
      }

      return emptyText;
    };

    /**
     * base64 转成 blob
     * @param  {String} b64Data     base64数据
     * @param  {String} contentType blob的contentType
     * @param  {Number} [sliceSize=512]   [字符串切割比例]
     * @return {Blob}             blob数据
     */
    var b64toBlob = function b64toBlob(b64Data) {
      var contentType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'image/jpeg';
      var sliceSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 512;
      var byteCharacters = atob(b64Data.split(';base64,')[1]);
      var byteArrays = [];

      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);
        var byteNumbers = new Array(slice.length);

        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      return new Blob(byteArrays, {
        type: contentType
      });
    };

    /**
     * 千分位展示
     * @param  {Number} num 数值
     * @return {String}     千分位字符串
     * @example
     *
     * thousands(123);
     * // => '123'
     *
     * @example
     *
     * thousands(1234);
     * // => '1,234'
     *
     * @example
     *
     * thousands(1234567);
     * // => '1,234,567'
     */
    var thousands = function thousands(num) {
      var data = +num || 0;

      if (!data) {
        return num;
      }

      var _String$split = String(num).split('.'),
          _String$split2 = _slicedToArray(_String$split, 2),
          _int = _String$split2[0],
          dec = _String$split2[1];

      var formatInt = _int.replace(/(?=(?!^)(\d{3})+$)/g, ',');

      if (+dec) {
        return [formatInt, dec].join('.');
      }

      return formatInt;
    };
    /**
     * 取区间值
     * @param  {Number} value 数值
     * @param  {Number} min   最小值
     * @param  {Number} max   最大值
     * @return {Number}       区间值
     * @example
     *
     * getValueInRange(1, 2, 7);
     * // => 2
     * @example
     *
     * getValueInRange(3, 2, 7);
     * // => 3
     *
     * @example
     *
     * getValueInRange(12, 2, 7);
     * // => 7
     */

    var getValueInRange = function getValueInRange(value, min, max) {
      if (value < min) {
        return min;
      }

      if (value > max) {
        return max;
      }

      return value;
    };

    var Formatters = /*#__PURE__*/function () {
      function Formatters() {
        _classCallCheck(this, Formatters);
      }

      _createClass(Formatters, [{
        key: "text",
        // 不作处理
        value: function text(value) {
          return value;
        } // 百分比

      }, {
        key: "percentage",
        value: function percentage(value) {
          if (_.isNumber(value)) {
            var temp = Number(mul(value, 1e2).toFixed(2));
            return "".concat(temp, "%");
          }

          return value;
        } // 数字千分位

      }, {
        key: "number",
        value: function number(value) {
          return thousands(value);
        }
      }]);

      return Formatters;
    }();
    /**
     * 文本格式化
     * @type {Formatters}
     */


    var formatters = new Formatters();

    /**
     * 百分比html
     * 正: 绿; 负: 红
     * @param  {Number} value  值
     * @param  {Object} config { emptyText = '--', // 空文本 reverse = false, // 颜色切换 disabled = false // 不使用颜色 }
     * @return {String}        html 字符串
     * @example
     *
     * getPercentageHtml(0.23)
     * // => '<span style="color: #00b365;">23%</span>'
     *
     * @example
     *
     * getPercentageHtml(-0.23)
     * // => '<span style="color: #00b365;">-23%</span>'
     *
     * @example
     *
     * getPercentageHtml(0.23, { disabled: true })
     * // => '23%'
     */

    var getPercentageHtml = function getPercentageHtml(value) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _config$emptyText = config.emptyText,
          emptyText = _config$emptyText === void 0 ? '--' : _config$emptyText,
          _config$reverse = config.reverse,
          reverse = _config$reverse === void 0 ? false : _config$reverse,
          _config$disabled = config.disabled,
          disabled = _config$disabled === void 0 ? false : _config$disabled;
      var tempValue = formatters.percentage(value);
      var greenColor = '#00b365';
      var redColor = '#f5483b';

      if (value > 0) {
        if (disabled) {
          return tempValue;
        }

        return "<span style=\"color: ".concat(reverse ? redColor : greenColor, ";\">").concat(tempValue, "</span>");
      }

      if (value < 0) {
        if (disabled) {
          return tempValue;
        }

        return "<span style=\"color: ".concat(reverse ? greenColor : redColor, ";\">").concat(tempValue, "</span>");
      }

      if (value === 0) {
        return tempValue;
      }

      return String(emptyText);
    }; // 自闭合标签

    var voidHtmlTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'];
    var attrKeyAlias = {
      className: 'class'
    };
    var gernerateElementText = function gernerateElementText() {
      var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var text = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var attrsText = Object.entries(attrs).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        var key = attrKeyAlias[k] || k;
        return [key, "\"".concat(v, "\"")].join('=');
      }).join(' ');

      if (voidHtmlTags.includes(tagName)) {
        return "<".concat(tagName, " ").concat(attrsText, " />");
      }

      return "<".concat(tagName, " ").concat(attrsText, ">").concat(text, "</").concat(tagName, ">");
    };
    var createElement = function createElement() {
      var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      if (_.isString(children) || _.isNumber(children)) {
        return gernerateElementText(tagName, attrs, children);
      }

      if (children.length === 0) {
        return gernerateElementText(tagName, attrs, '');
      }

      return gernerateElementText(tagName, attrs, children.map(function (v) {
        return createElement.apply(void 0, _toConsumableArray(v));
      }).join(''));
    }; // 解析url: [文案|链接]

    var linkReg = /\[(.+?)\|(.+?)\]/g;
    /**
     * 字符串转链接
     * @param  {String} str  字符串
     * @return {String[]}    html 字符串
     * @example
     *
     * getTooltipHtml('abc')
     * // => 'abc'
     *
     * @example
     *
     * getTooltipHtml('aa[链接|cc.co]bb')
     * // => 'aa<a heref="cc.co" style="color: #fff; fontWeight: bold; textDecoration: underline">链接</a>bb'
     */

    var getTooltipHtml = function getTooltipHtml() {
      var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return _.flatten([str]).filter(Boolean).map(String).map(function (v) {
        return v.replace(/\\n/g, '<br>');
      }).map(function (v) {
        return v.replace(linkReg, function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var text = args[1],
              href = args[2];
          return gernerateElementText('a', {
            href: href,
            target: '_blank',
            style: {
              color: '#fff',
              fontWeight: 'bold',
              textDecoration: 'underline'
            }
          }, text);
        });
      });
    };

    /**
     * 获取图片的尺寸
     * @param  {String} url [description]
     * @return {Object}     [description]
     * @example
     *
     * (async() => {
     *   const size = await getImageSize('https://github.githubassets.com/favicons/favicon.png');
     *   console.log(size);
     * })();
     *
     * // => { width: 24, height: 24 }
     */

    var getImageSize = function getImageSize() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return new Promise(function (reslove) {
        var img = new Image();
        img.src = url;
        img.onload = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  reslove(_.pick(img, ['width', 'height']));

                case 1:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));
        img.onerror = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  reslove({
                    width: 0,
                    height: 0
                  });

                case 1:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));
      });
    };
    /**
     * 将图片的 http-url 变成 base64
     * @param  {String} url [description]
     * @return {String}     [description]
     */

    var changeImageUrlToBase64 = function changeImageUrlToBase64(url) {
      if (url.startsWith('data:image')) {
        return url;
      }

      return new Promise(function (reslove) {
        var img = new Image();
        img.src = url;
        img.onload = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          var canvas, ctx, width, height;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  canvas = document.createElement('canvas');
                  ctx = canvas.getContext('2d');
                  width = img.width, height = img.height;
                  canvas.width = width;
                  canvas.height = height;
                  ctx.drawImage(img, 0, 0, width, height);
                  reslove(canvas.toDataURL('image/jpeg'));

                case 7:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));
      });
    };

    /**
     * setState => promise
     * @param  {*} context  [description]
     * @param  {Object} newState 新的状态
     * @return {*}          无
     * @example
     *
     * this.setState({ a: 1 }, () => {
     *   console.log('do something here');
     * });
     * // 等价于
     * await setAsyncState(this, { a: 1 });
     * console.log('do something here');
     */
    var setAsyncState = function setAsyncState(context, newState) {
      return new Promise(function (resolve) {
        context.setState(newState, resolve);
      });
    };

    var ValidatorRules = function ValidatorRules() {
      var _this = this;

      _classCallCheck(this, ValidatorRules);

      _defineProperty(this, "required", function () {
        var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        return {
          required: true,
          message: "".concat(text, "\u4E0D\u80FD\u4E3A\u7A7A")
        };
      });

      _defineProperty(this, "selectRequired", function () {
        var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        return {
          required: true,
          message: "\u8BF7\u9009\u62E9".concat(text),
          transform: function transform(value) {
            if (_.isNumber(value)) {
              return String(value);
            }

            return value;
          }
        };
      });

      _defineProperty(this, "multipleRequired", function () {
        var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        return [_objectSpread2(_objectSpread2({}, _this.selectRequired(text)), {}, {
          transform: function transform(value) {
            if (_.isUndefined(value)) {
              return '';
            }

            return value.join('');
          }
        }), {
          validator: function validator(rule, value, callback) {
            if (_.isEmpty(value)) {
              return callback(new Error("\u8BF7\u9009\u62E9".concat(text)));
            }

            return callback();
          }
        }];
      });

      _defineProperty(this, "cascaderRequired", function () {
        var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        return {
          required: true,
          message: "\u8BF7\u9009\u62E9".concat(text),
          transform: function transform(value) {
            if (_.isUndefined(value)) {
              return '';
            }

            return value.join('');
          }
        };
      });

      _defineProperty(this, "min", function () {
        var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return {
          min: num,
          message: "".concat(text, "\u6700\u5C11").concat(num, "\u4E2A\u5B57\u7B26")
        };
      });

      _defineProperty(this, "max", function () {
        var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return {
          max: num,
          message: "".concat(text, "\u6700\u591A").concat(num, "\u4E2A\u5B57\u7B26")
        };
      });

      _defineProperty(this, "numberRange", function () {
        var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var messageFuc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ValidatorRules.numberRangeMessageFunc;
        return function (rule, value, callback) {
          var val = Number(value);
          var results = [];
          Object.entries(config).forEach(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                k = _ref2[0],
                v = _ref2[1];

            var _find = _.find(ValidatorRules.numberRangeValidatorList, {
              key: k
            }),
                description = _find.description,
                validate = _find.validate;

            if (!validate(val, v)) {
              if (k === 'decimalLength') {
                results.push(description(v));
              } else {
                results.push(messageFuc(description, v));
              }
            }
          });

          if (!isEmptyArray(results)) {
            callback(new Error("".concat(text, ": ").concat(results[0])));
          }

          callback();
        };
      });

      // 只能是中文
      this.chinese = {
        message: '只能输入中文',
        pattern: /^[\u4e00-\u9fa5]+$/
      }; // 英文 + 下划线

      this.letterAndUnderline = {
        message: '只能是英文、下划线',
        pattern: /^[a-zA-Z_]+$/
      };
    } // 数字范围: 错误信息拼接函数
    ;
    /**
     * 校验规则
     * 校验库参考: [async-validator](https://www.npmjs.com/package/async-validator)
     * @type {Array.<ValidatorRules>}
     * @example
     *
     * rules.required('Form.Item label')
     * rules.selectRequired('Form.Item label')
     * rules.multipleRequired('Form.Item label')
     * rules.cascaderRequired('Form.Item label')
     * rules.min('Form.Item label', 1)
     * rules.max('Form.Item label', 5)
     * rules.numberRange('Form.Item label', {  })
     * // 数字范围的抽象描述
     * [
     *     {
     *         key: 'eq',
     *         description: '等于',
     *         validate: (a, b) => {
     *             return a === b;
     *         }
     *     },
     *     {
     *         key: 'ne',
     *         description: '不等于',
     *         validate: (a, b) => {
     *             return a !== b;
     *         }
     *     },
     *     {
     *         key: 'gt',
     *         description: '大于',
     *         validate: (a, b) => {
     *             return a > b;
     *         }
     *     },
     *     {
     *         key: 'lt',
     *         description: '小于',
     *         validate: (a, b) => {
     *             return a < b;
     *         }
     *     },
     *     {
     *         key: 'ge',
     *         description: '大于等于',
     *         validate: (a, b) => {
     *             return a >= b;
     *         }
     *     },
     *     {
     *         key: 'le',
     *         description: '小于等于',
     *         validate: (a, b) => {
     *             return a <= b;
     *         }
     *     },
     *     // 小数位数限制
     *     {
     *         key: 'decimalLength',
     *         description: value => {
     *             return ['最多', value, '位小数'].join('');
     *         },
     *         validate: (a, b) => {
     *             const [, decimal = ''] = String(a).split('.');
     *             return decimal.length <= b;
     *         }
     *     }
     * ]
     */


    _defineProperty(ValidatorRules, "numberRangeMessageFunc", function (description, value) {
      return ['应', description, value].join('');
    });

    _defineProperty(ValidatorRules, "numberRangeValidatorList", [{
      key: 'eq',
      description: '等于',
      validate: function validate(a, b) {
        return a === b;
      }
    }, {
      key: 'ne',
      description: '不等于',
      validate: function validate(a, b) {
        return a !== b;
      }
    }, {
      key: 'gt',
      description: '大于',
      validate: function validate(a, b) {
        return a > b;
      }
    }, {
      key: 'lt',
      description: '小于',
      validate: function validate(a, b) {
        return a < b;
      }
    }, {
      key: 'ge',
      description: '大于等于',
      validate: function validate(a, b) {
        return a >= b;
      }
    }, {
      key: 'le',
      description: '小于等于',
      validate: function validate(a, b) {
        return a <= b;
      }
    }, // 小数位数限制
    {
      key: 'decimalLength',
      description: function description(value) {
        return ['最多', value, '位小数'].join('');
      },
      validate: function validate(a, b) {
        var _String$split = String(a).split('.'),
            _String$split2 = _slicedToArray(_String$split, 2),
            _String$split2$ = _String$split2[1],
            decimal = _String$split2$ === void 0 ? '' : _String$split2$;

        return decimal.length <= b;
      }
    }]);

    var rules = new ValidatorRules();

    /**
     * trim 所有空白
     * @param  {String} str 字符串
     * @return {String}     去掉所有空白的字符串
     * @example
     *
     * trimAll(' a b c ');
     * // => 'abc'
     */

    var trimAll = function trimAll() {
      var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return str.replace(/\s+/g, '');
    };
    /**
     * 帕斯卡
     * @param  {String} str 字符串
     * @return {String}     帕斯卡形式的字符串
     * @example
     *
     * pascalCase('a b c');
     * // => 'ABC'
     *
     * @example
     *
     * pascalCase('a-b-c');
     * // => 'ABC'
     *
     * @example
     *
     * pascalCase('a_b_c');
     * // => 'ABC'
     *
     * @example
     *
     * pascalCase('a,b,c');
     * // => 'ABC'
     *
     * @example
     *
     * pascalCase('aBc');
     * // => 'ABc'
     */

    var pascalCase = function pascalCase() {
      var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return _.upperFirst(_.camelCase(str));
    };

    var getUa = function getUa() {
      return window.navigator.userAgent;
    };
    /**
     * isAndroid
     * @return {Boolean} 是否是Android
     * @example
     *
     * isAndroid();
     * // => false
     */


    var isAndroid = function isAndroid() {
      var ua = getUa();
      ['Android', 'Adr'].some(function (v) {
        return ua.includes(v);
      });
    };
    /**
     * isIOS
     * @return {Boolean} 是否是IOS
     * @example
     * isIOS();
     * // => true
     */

    var isIOS = function isIOS() {
      var ua = getUa();
      return Boolean(ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/));
    };
    /**
     * isIPhone
     * @return {Boolean} 是否是IPhone
     * @example
     * isIPhone();
     * // => true
     */

    var isIPhone = function isIPhone() {
      var ua = getUa();
      return /\biPhone\b|\biPod\b/i.test(ua);
    };
    /**
     * isIPhoneX
     * @return {Boolean} 是否是IPhoneX
     * @example
     * isIPhoneX();
     * // => true
     */

    var isIPhoneX = function isIPhoneX() {
      var _window$screen = window.screen,
          width = _window$screen.width,
          height = _window$screen.height;

      if (!isIPhone()) {
        return false;
      }

      return height === 812 && width === 375 || height === 896 && width === 414;
    };

    /**
     * Utf8数组 转 字符串
     * 参考链接:
     * 链接1: [https://stackoverflow.com/questions/8936984/uint8array-to-string-in-javascript](https://stackoverflow.com/questions/8936984/uint8array-to-string-in-javascript)
     * 链接2:  [https://gist.github.com/wumingdan/759564f6cb887a55bceb](https://gist.github.com/wumingdan/759564f6cb887a55bceb)
     * @param  {Utf8Array} array Utf8数组
     * @return {String}       Utf8 数组转 字符串
     * @example
     *
     * var arr = new Uint8Array(5);
     * arr[0] = 0x3d;
     * arr[1] = 0x35f;
     * arr[2] = 0x35f;
     * arr[3] = 0x35e;
     * arr[4] = 0x35e;
     *
     * Utf8ArrayToString(arr);
     * // => '=__^^'
     */
    var Utf8ArrayToString = function Utf8ArrayToString(array) {
      var out = '';
      var i = 0;
      var len = array.length;
      var c;
      var char2;
      var char3;

      while (i < len) {
        c = array[i++];

        switch (c >> 4) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
            // 0xxxxxxx
            out += String.fromCharCode(c);
            break;

          case 12:
          case 13:
            // 110x xxxx   10xx xxxx
            char2 = array[i++];
            out += String.fromCharCode((c & 0x1f) << 6 | char2 & 0x3f);
            break;

          case 14:
            // 1110 xxxx  10xx xxxx  10xx xxxx
            char2 = array[i++];
            char3 = array[i++];
            out += String.fromCharCode((c & 0x0f) << 12 | (char2 & 0x3f) << 6 | (char3 & 0x3f) << 0);
            break;
        }
      }

      return out;
    };

    /**
     * 将 element-ui Form组件 的 validate 变成一个始终是resolved状态的promise, 不用写try-catch或者回调函数的形式
     * @param  {Function} [.validate] 校验方法
     * @return {Promise<Boolean>} 校验结果
     * @example
     *
     * const isValid = await validateFn(this.$refs.form.validate)
     * // => false
     */
    var pifyValidate = function pifyValidate(validateFn) {
      return new Promise(function (resolve) {
        validateFn(function (valid) {
          resolve(valid);
        });
      });
    };

    exports.Utf8ArrayToString = Utf8ArrayToString;
    exports.add = plus;
    exports.b64toBlob = b64toBlob;
    exports.booleanPromise = booleanPromise;
    exports.changeImageUrlToBase64 = changeImageUrlToBase64;
    exports.classNames = classNames;
    exports.convertCssom = convertCssom;
    exports.convertDataToCascader = convertDataToCascader;
    exports.convertDataToEnum = convertDataToEnum;
    exports.convertJsonToEnum = convertJsonToEnum;
    exports.copyText = copyText;
    exports.createElement = createElement;
    exports.defineMomentLocaleZhCn = defineMomentLocaleZhCn;
    exports.div = div;
    exports.dividedBy = div;
    exports.download = download;
    exports.downloadBlob = downloadBlob;
    exports.fakeFetch = fakeFetch;
    exports.formatEmptyToDefault = formatEmptyToDefault;
    exports.formatTime = formatTime;
    exports.formatters = formatters;
    exports.gernerateElementText = gernerateElementText;
    exports.getAntdLocaleZhCN = getAntdLocaleZhCN;
    exports.getCssText = getCssText;
    exports.getFullUrl = getFullUrl;
    exports.getImageSize = getImageSize;
    exports.getLabelByValue = getLabelByValue;
    exports.getParams = getParams;
    exports.getPercentageHtml = getPercentageHtml;
    exports.getTooltipHtml = getTooltipHtml;
    exports.getValueByLabel = getValueByLabel;
    exports.getValueInCollection = getValueInCollection;
    exports.getValueInRange = getValueInRange;
    exports.getWordWidth = getWordWidth;
    exports.isAndroid = isAndroid;
    exports.isBlob = isBlob;
    exports.isEmptyArray = isEmptyArray;
    exports.isEmptyObject = isEmptyObject;
    exports.isEmptyString = isEmptyString;
    exports.isEmptyValue = isEmptyValue;
    exports.isEveryFalsy = isEveryFalsy;
    exports.isEveryTruthy = isEveryTruthy;
    exports.isIOS = isIOS;
    exports.isIPhone = isIPhone;
    exports.isIPhoneX = isIPhoneX;
    exports.isPromise = isPromise;
    exports.isSomeFalsy = isSomeFalsy;
    exports.isSomeTruthy = isSomeTruthy;
    exports.isUniq = isUniq;
    exports.linkTo = linkTo;
    exports.minus = minus;
    exports.mul = mul;
    exports.parseUrl = parseUrl;
    exports.pascalCase = pascalCase;
    exports.pifyValidate = pifyValidate;
    exports.plus = plus;
    exports.produceEmptyObject = produceEmptyObject;
    exports.queryParse = queryParse;
    exports.queryStringify = queryStringify;
    exports.removeEmptyProperties = removeEmptyProperties;
    exports.removeProperties = removeProperties;
    exports.reserveProperties = reserveProperties;
    exports.rules = rules;
    exports.search = search;
    exports.setAsyncState = setAsyncState;
    exports.setAttrs = setAttrs;
    exports.setStyle = setStyle;
    exports.sleep = sleep;
    exports.stringifyUrl = stringifyUrl;
    exports.sub = minus;
    exports.suffixClassNames = suffixClassNames;
    exports.thousands = thousands;
    exports.times = mul;
    exports.trimAll = trimAll;
    exports.updateUrlQuery = updateUrlQuery;
    exports.version = version;
    exports.voidHtmlTags = voidHtmlTags;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
