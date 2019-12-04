let formatter = {
  /*时间格式转化，输出时间字符串*/
  dateFormat(obj,format,show) {
    if (!obj) return null;
    let istype = this.isType(obj);
    let returnVal=null;
    let temp=null;
    switch (istype){
      case 0:
        returnVal=obj;
        break;
      case 1:
        temp=(obj.slice(0,19));
        temp=temp.replace(/-/g,"/").replace(/T/g," ");
        returnVal=new Date(Date.parse(temp)+8*1000*60*60);
        break;
      case 2:
        temp=(obj.slice(0,19));
        temp=temp.replace(/-/g,"/");
        returnVal=new Date(Date.parse(temp));
        break;
      case 3:
        returnVal=new Date(Number(obj));
        break;
      case 4:
        returnVal=new Date(obj.time);
        break;
      default:
        returnVal = obj;
        break;
    }
    /*如果是 不足一小时 显示多少分钟前
   如果 不足24小时 显示 多少小时前
   如果 48小时 > time ＞ 24小时 显示1天前*/
    if(show){
      let now=new Date()  //获取当前时间
      let showTime=''
      let surplusTime=now.getTime()-returnVal.getTime();
      if(surplusTime<1000*60){
        showTime=`刚刚`
      }else if(surplusTime<1000*60*60){
        showTime=`${Math.floor(surplusTime/(1000*60))}分钟前`
      }else if(surplusTime<1000*24*60*60){
        showTime=`${Math.floor(surplusTime/(1000*60*60))}小时前`
      }else if(1000*24*60*60<surplusTime && surplusTime<1000*48*60*60){
        showTime=`1天前`
      }else{
        if(format){
          showTime=this.timeJoin(returnVal,format)
        }else{
          showTime=returnVal
        }
      }
      return showTime
    } else if(format){
      return this.timeJoin(returnVal,format);
    }else{
      return returnVal;
    }

  },
  // 判断传入日期的类型
  isType(value){
    if(typeof value === "string") {
      if(value.indexOf('T')>-1) {  /*1888-09-10T10:11*/
        return 1;
      }else if(value.indexOf('-')>-1){ /*1888-09-10 10:11*/
        return 2;
      }else if(value.indexOf('/')>-1){ /*1888/09/10 10:11*/
        return 2;
      }else{
        return 3
      }
    } else if(typeof value === "object") {
      if(value.time) {
        return 4;
      } else {
        return 5;
      }
    } else  if(typeof value === "number"){
      return 3;
    }else{
      return 0;
    }
  },
  // 不同時間格式转化
  timeJoin(str,format){
    let s = str;
    let n=new Date();
    let time = s.getFullYear() + '-' + ((s.getMonth() + 1) > 9 ? (s.getMonth() + 1) : ('0' + (s.getMonth() + 1))) + '-' + ( s.getDate() > 9 ? s.getDate() : ('0' + s.getDate())) + ' ' + ( s.getHours() > 9 ? s.getHours() : ('0' + s.getHours())) + ':' + ( s.getMinutes() > 9 ? s.getMinutes() : ('0' + s.getMinutes()))  + ':' + ( s.getSeconds() > 9 ? s.getSeconds() : ('0' + s.getSeconds()));
    if(format==='yyyy-MM-dd'){
      time = s.getFullYear() + '-' + ((s.getMonth() + 1) > 9 ? (s.getMonth() + 1) : ('0' + (s.getMonth() + 1))) + '-' + ( s.getDate() > 9 ? s.getDate() : ('0' + s.getDate()));
    }
    if(format==='年月日'){
      time = s.getFullYear() + '年' + ((s.getMonth() + 1) > 9 ? (s.getMonth() + 1) : ('0' + (s.getMonth() + 1))) + '月' + ( s.getDate() > 9 ? s.getDate() : ('0' + s.getDate()))+ '日';
    }
    if(format==='MM-dd hh:mm'){
      time = ((s.getMonth() + 1) > 9 ? (s.getMonth() + 1) : ('0' + (s.getMonth() + 1))) + '-' + ( s.getDate() > 9 ? s.getDate() : ('0' + s.getDate())) + ' ' + ( s.getHours() > 9 ? s.getHours() : ('0' + s.getHours())) + ':' + ( s.getMinutes() > 9 ? s.getMinutes() : ('0' + s.getMinutes()));
      if(s.getFullYear()!==n.getFullYear()){
        time =s.getFullYear() + '-'+time
      }
    }
    if(format==='MM-dd'){
      time = ((s.getMonth() + 1) > 9 ? (s.getMonth() + 1) : ('0' + (s.getMonth() + 1))) + '.' + ( s.getDate() > 9 ? s.getDate() : ('0' + s.getDate()));
      if(s.getFullYear()!==n.getFullYear()){
        time =s.getFullYear() + '.'+time
      }
    }
    if(format==='年月日时'){
      time = ((s.getMonth() + 1) > 9 ? (s.getMonth() + 1) : ('0' + (s.getMonth() + 1))) + '月' + ( s.getDate() > 9 ? s.getDate() : ('0' + s.getDate())) + '日 ' + ( s.getHours() > 9 ? s.getHours() : ('0' + s.getHours())) + ':' + ( s.getMinutes() > 9 ? s.getMinutes() : ('0' + s.getMinutes()));
      if(s.getFullYear()!==n.getFullYear()){
        time =s.getFullYear() + '年'+time
      }
    }
    if(format==='yy.MM.dd hh:mm'){
      let year=s.getFullYear().toString().slice(2)
      time = year+ '.' + ((s.getMonth() + 1) > 9 ? (s.getMonth() + 1) : ('0' + (s.getMonth() + 1))) + '.' + ( s.getDate() > 9 ? s.getDate() : ('0' + s.getDate())) + ' ' + ( s.getHours() > 9 ? s.getHours() : ('0' + s.getHours())) + ':' + ( s.getMinutes() > 9 ? s.getMinutes() : ('0' + s.getMinutes()));
    }

    if(format==='yyyy.MM.dd hh:mm'){
      let year=s.getFullYear().toString()
      time = year+ '.' + ((s.getMonth() + 1) > 9 ? (s.getMonth() + 1) : ('0' + (s.getMonth() + 1))) + '.' + ( s.getDate() > 9 ? s.getDate() : ('0' + s.getDate())) + ' ' + ( s.getHours() > 9 ? s.getHours() : ('0' + s.getHours())) + ':' + ( s.getMinutes() > 9 ? s.getMinutes() : ('0' + s.getMinutes()));
    }
    return time;
  }
}

module.exports = formatter
