export default {
  /**
   * 规则：表示以1开头，第二位可能是0/3/4/5/7/8等的任意一个，在加上后面的\d表示数字[0-9]的9位，总共加起来11位结束
   * @param value 输入
   */
  checkPhone(value) {
    const reg = /^1(0|3|4|5|7|8)\d{9}$/;
    return reg.test(value);
  },
  /**
   * 规则：8-16位数字、字母或下划线
   * @param value 输入
   */
  checkPw(value) {
    const reg = /^[0-9A-Za-z_]{8,16}$/;
    return reg.test(value);
  },
};
