/**
 * 数字转换的公共逻辑
 *
 * @author  suyanping
 *
 */

const numChange = (num) => {
  if (num === '') {
    return '-';
  }

  const numList = String(num).split('.');
  const intNum = Number(numList[0]);
  const dotNum = numList[1];

  const reg = /\d{1,3}(?=(\d{3})+$)/g;
  const regNum = (`${intNum}`).replace(reg, '$&,');
  const newNum = dotNum ? `${regNum}.${dotNum}` : regNum;
  return newNum;
};

export default {
  numChange,
};

