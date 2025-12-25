function updateESTTime(){
  var el=document.getElementById('est-time');
  if(!el)return;
  try{
    var d=new Date();
    var formatter=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',hour:'numeric',minute:'2-digit',hour12:true});
    var parts=formatter.formatToParts(d);
    var h='',m='',ampm='';
    for(var i=0;i<parts.length;i++){
      if(parts[i].type==='hour')h=parts[i].value;
      if(parts[i].type==='minute')m=parts[i].value;
      if(parts[i].type==='dayPeriod')ampm=parts[i].value.toUpperCase();
    }
    var month=d.getMonth();
    var tz=(month>=2&&month<=9)?'EDT':'EST';
    el.textContent=h+':'+m+' '+ampm+' '+tz;
  }catch(e){
    el.textContent='--:-- EST';
  }
}
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',updateESTTime);
}else{
  updateESTTime();
}
setInterval(updateESTTime,60000);

