module.exports = {
  checkDateFormat:function(dateList,format){
    var cnt = 0;    
    for(var i = 0;i < dateList.length;i++){
      var regEx = /^\d{4}-\d{2}-\d{2}$/;
      if(!dateList[i].match(regEx)){
        break;
      }
      var d = new Date(dateList[i]);
      if(!d.getTime() && d.getTime() !== 0){
        break;
      }
      if(d.toISOString().slice(0,10) === dateList[i]){
        cnt++;
      }
    }
    if(cnt == dateList.length){
      return true;
    }else{
      return false;
    }
  }

}
