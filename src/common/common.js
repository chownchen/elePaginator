
import Vue from 'vue'
import { Loading } from 'element-ui';

let BM = {
  ajax(that, type, url, data, sfn, efn, needLoading) {
    // 请求头添加token
    Vue.http.headers.common['Authorization'] = that.$store.getters.getToken
    let loadingInstance;
    that.$http[type](url, data, {
      timeout: 20000,
      before: function (request) {
        if(needLoading){
          loadingInstance = Loading.service({ fullscreen: true })
        }
      }
    })
      .then((data)=>{
        sfn(data)
        if(needLoading){
          setTimeout(()=>{
            loadingInstance.close()
          }, 300)

        }
      }, (err)=>{
        if(needLoading){
          loadingInstance.close()
        }
        efn(err)
      })
  },

  //过滤数据
  transformParam(list, option) {
    if( list.length > 0 ){
      var newArr = []
      var hasType1 = false
      list.forEach((item1, key1, arr1)=>{
        if(option.length > 0){
          option.forEach((item2, key2)=>{
            switch (item2.type){
              case 3:
                arr1[key1][item2.key + 'ElValue'] = ''

                for(var i = 0; i < item2.data.length; i++ ){
                  if( item2.data[i].key === item1[item2.key] ){
                    arr1[key1][item2.key + 'ElValue'] = item2.data[i].value
                    return;
                  }else {
                    arr1[key1][item2.key + 'ElValue'] = item2.data[item2.data.length - 1].value
                  }
                }
                break;

              case 2:
                //时间戳转换
                arr1[key1][item2.key + 'ElValue'] = BM.timeStrToData(arr1[key1][item2.key])
                break;

              case 1:
                hasType1 = true
                // 过滤展示
                if(item2.showIt) {
                  if(item1[item2.key] == item2.value){
                    newArr.push(item1)
                  }
                }else {
                  if(item1[item2.key] != item2.value){
                    newArr.push(item1)
                  }
                }
                break;

              case 4:
                // 自定义返回
                arr1[key1][item2.key + 'ElValue'] = item2.fn(arr1[key1][item2.key])
                break;
            }
          })
        }
    })
      if(hasType1){
        list = newArr
      }
    }
    return list;
  },

  //计时器
  timer(action, context, time) {
    var _timer;
    if ($.isFunction(action)) {
      (()=> {
        _timer = setInterval(()=>{
          if (!action(context)) {
            clearInterval(_timer);
          }
        }, 1000);
      })();
    }
  },

  //yy-mm-dd转为时间戳
  dateToTimeStr(value, str) {
    value = value.replace(/-/g, "/");
    var stringTime = value + str;
    var timestamp2 = Date.parse(new Date(stringTime));
    return timestamp2;
  },

  //时间戳转为yy-mm-dd 00:00:00
  timeStrToData(value) {
    if (!value) {
      return '';
    }
    value = value.toString().length < 13 ? value * 1000 : value;
    var date = new Date(value),
      month = date.getMonth() + 1,
      Y = '',
      M = '',
      D = '',
      H = date.getHours(),
      Mi = date.getMinutes(),
      S = date.getSeconds();
    Y = date.getFullYear() + '-';
    M = (month < 10 ? '0' + month : date.getMonth() + 1) + '-';
    D = date.getDate();
    D = D < 10 ? '0' + D : D;
    H = H < 10 ? '0' + H : H;
    Mi = Mi < 10 ? '0' + Mi : Mi;
    S = S < 10 ? '0' + S : S;
    return (Y + M + D + " " + H + ":" + Mi + ":" + S);
  },

  timeStrToDataNew(value) {
    if (!value) {
      return '';
    }
    value = value.toString().length < 13 ? value * 1000 : value;
    var date = new Date(value),
      month = date.getMonth() + 1,
      Y = '',
      M = '',
      D = '',
      Y = date.getFullYear() + '-';
    M = (month < 10 ? '0' + month : date.getMonth() + 1) + '-';
    D = date.getDate();
    D = D < 10 ? '0' + D : D;
    return (Y + M + D);
  },
}

export {
  BM
}





