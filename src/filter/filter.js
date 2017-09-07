import Vue from 'vue'

/****************************定义过滤组件******************************/
//取整数
Vue.filter('filterNumber', function (value) {
  return Math.floor(value);
});
//过滤已勾选商品的选项
Vue.filter('filterGoods', function (value) {
  var goodsArr = BM.goodsArr,
    len = goodsArr.length;
  if(!len) return value;
  for(var i = 0; i<len; i++){
  }
  return value.split('').reverse().join('')
});
//时间戳转为yy-mm-dd hh:mm:ss格式
Vue.filter('timeStrToData', function (value,type) {
  if(!value){return '';}
  value = value.toString().length < 13 ? value*1000 : value;
  var date = new Date(value),
    month = date.getMonth()+ 1,
    Y = '',
    M = '',
    D = '',
    H = date.getHours(),
    Mi = date.getMinutes(),
    S = date.getSeconds();
  Y = date.getFullYear() + '-';
  M = (month < 10 ? '0'+month : date.getMonth()+1) + '-';
  D = date.getDate();
  D = D < 10 ? '0' + D : D;
  H = H < 10?'0' + H:H;
  Mi = Mi < 10?'0' + Mi:Mi;
  S = S < 10?'0' + S:S;
  switch (type)
  {
    case "y":
      return (Y + M + D);
      break;
    default:
      return (Y + M + D + " " + H + ":" + Mi + ":" + S);
  }
});
//时间戳转为yy-mm-dd格式
Vue.filter('timeStrToDataNew', function (value,type) {
  if(!value){return '';}
  value = value.toString().length < 13 ? value*1000 : value;
  var date = new Date(value),
    month = date.getMonth()+ 1,
    Y = '',
    M = '',
    D = '',
    Y = date.getFullYear() + '-';
  M = (month < 10 ? '0'+month : date.getMonth()+1) + '-';
  D = date.getDate();
  D = D < 10 ? '0' + D : D;
  switch (type)
  {
    case "y":
      return (Y + M + D);
      break;
    default:
      return (Y + M + D );
  }
});
