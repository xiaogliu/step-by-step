export default {
  /**
   * 检测手机号
   * 规则：表示以1开头，第二位可能是0/3/4/5/7/8等的任意一个，在加上后面的\d表示数字[0-9]的9位，总共加起来11位结束
   * @param numb 输入
   */
  checkPhone(numb) {
    const reg = /^1(0|3|4|5|7|8)\d{9}$/;
    return reg.test(numb);
  },
  /**
   * 检测密码
   * 规则：8-16位数字、字母或下划线
   * @param value 输入
   */
  checkPw(value) {
    const reg = /^[0-9A-Za-z_]{8,16}$/;
    return reg.test(value);
  },
  /**
   * 检测身份证号
   * 规则：身份证号码为15位或者18位，15位时全为数字，
   * 18位前17位为数字，最后一位是校验位，可能为数字，也可能为字母
   * @param value 输入
   */
  checkIDCardNumb(IDCardNumb) {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return reg.test(IDCardNumb);
  },
  /**
   * 检测银行卡号
   * 规则：16～19位数字
   * @param bankCardNumb 输入
   */
  checkBankCardNumb(bankCardNumb) {
    const reg = /^\d{16}|\d{17}|\d{18}|\d{19}$/;
    return reg.test(bankCardNumb);
  },
  /**
   * 检测支付密码
   * 规则：6位数字
   * @param payPW 输入
   */
  checkPayPW(payPW) {
    const reg = /^\d{6}$/;
    return reg.test(payPW);
  },
  /**
   * 正整数判断
   * @param value 输入
   */
  checkPositiveInteger(value) {
    const reg = /^[0-9]*[1-9][0-9]*$/;
    return reg.test(value);
  },
  /**
   * 最多小数点后两位数判断
   * @param value 输入
   */
  checkTwoDecimal(value) {
    const reg = /^[0-9]+(.[0-9]{1,2})?$/;
    return reg.test(value);
  },
  /**
   * 格式化利率
   * @param: name 属性名
   */
  formatInterestRate(num) {
    if (num) {
      return (num * 100).toFixed(1);
    }
    return '--';
  },
  /**
   * 格式化金额
   * @param cent 待转化金额，单位为分，必须为整数
   */
  formatCent(cent) {
    if (Number(cent) || Number(cent) === 0) {
      const yuan = (cent / 100).toFixed(2);
      let intPart = yuan.split('.')[0];
      const len = intPart.length;
      let mod = len % 3;
      const group = len / 3;
      const intPartArray = [];
      if (mod === 0) {
        mod = 3;
      }
      intPartArray.push(yuan.slice(0, mod));
      for (let i = 0; i < group - 1; i++) {
        const begin = mod + i * 3;
        const end = begin + 3;
        intPartArray.push(intPart.slice(begin, end));
      }
      intPart = intPartArray.join(',');
      return `${intPart}.${yuan.split('.')[1]}`;
    }
    // 初始化时显示 '--'
    return '--';
  },
  /**
   * 转换时间时间戳
   * @param ts 时间戳，单位为秒
   * @param supreme，当传入true时，显示时分秒，传入false时，不显示时分秒，默认显示
   */
  timeShiftFormat(ts, supreme = true, redPacket = false) {
    if (ts) {
      // 如果是两位数的时分,前面加个0
      const formatNumber = num => {
        let numb = num;
        if (numb < 10) {
          numb = `0${numb}`;
        }
        return numb;
      };
      const d = new Date(ts * 1000);
      const year = d.getFullYear();
      const month = formatNumber(d.getMonth() + 1);
      const date = formatNumber(d.getDate());
      const hour = formatNumber(d.getHours());
      const minute = formatNumber(d.getMinutes());
      const seconds = formatNumber(d.getSeconds());
      let s = '';
      if (supreme) {
        // 带有时分秒
        s = `${year}-${month}-${date} ${hour}:${minute}:${seconds}`;
      } else if (redPacket) {
        // 点为分隔符
        s = `${year}.${month}.${date}`;
      } else {
        // 中划线为分隔符
        s = `${year}-${month}-${date}`;
      }
      return s;
    }
    return '--';
  },

  /**
   * 获取视图宽高，更好的兼容性
   */
  getViewport() {
    if (document.compatMode === 'BackCompat') {
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight,
      };
    }
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    };
  },
};
