/**
 * Created by zdchen on 2017/7/6 0006.
 */
  //取整数
function filterNumber(value) {
    return Math.floor(value);
  }

  //时间戳转为yy-mm-dd hh:mm:ss格式
function timeStrToData(value,type) {
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
  }

  //时间戳转为yy-mm-dd格式
function timeStrToDataNew(value,type) {
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
  }

  //yy-mm-dd转为时间戳
function dateToTimeStr(value, str) {
    value = value.replace(/-/g, "/");
    var stringTime = value + str;
    var timestamp2 = Date.parse(new Date(stringTime));
    return timestamp2;
  }

export {
  filterNumber,
  timeStrToData,
  timeStrToDataNew,
  dateToTimeStr
}
