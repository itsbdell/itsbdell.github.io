function updateESTTime(){
  var el=document.getElementById('est-time');
  if(!el)return;
  try{
    var d=new Date();
    var formatter=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',hour:'numeric',minute:'2-digit',second:'2-digit',hour12:true});
    var parts=formatter.formatToParts(d);
    var h='',m='',s='',ampm='';
    for(var i=0;i<parts.length;i++){
      if(parts[i].type==='hour')h=parts[i].value;
      if(parts[i].type==='minute')m=parts[i].value;
      if(parts[i].type==='second')s=parts[i].value;
      if(parts[i].type==='dayPeriod')ampm=parts[i].value.toUpperCase();
    }
    var month=d.getMonth();
    var tz=(month>=2&&month<=9)?'EDT':'EST';
    el.textContent=h+':'+m+':'+s+' '+ampm+' '+tz;
  }catch(e){
    el.textContent='--:--:-- EST';
  }
}
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',updateESTTime);
}else{
  updateESTTime();
}
setInterval(updateESTTime,1000);

// Weather icons (SVG matching location icon style)
var weatherIcons={
  sunny:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>',
  partlyCloudy:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path><circle cx="12" cy="12" r="3"></circle><path d="M12 5v2M12 17v2M5 12h2M17 12h2"></path></svg>',
  cloudy:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>',
  rainy:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path><line x1="12" y1="16" x2="12" y2="22"></line><line x1="9" y1="19" x2="9" y2="22"></line><line x1="15" y1="19" x2="15" y2="22"></line></svg>',
  stormy:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path><polyline points="13 12 11 16 13 16 11 22"></polyline></svg>',
  snowy:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path><circle cx="12" cy="17" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="15" cy="19" r="1"></circle></svg>'
};

function getWeatherIcon(weatherCode){
  // WMO weather code mapping
  if(weatherCode===0)return weatherIcons.sunny;
  if(weatherCode>=1&&weatherCode<=3)return weatherIcons.partlyCloudy;
  if(weatherCode>=45&&weatherCode<=48)return weatherIcons.cloudy;
  if(weatherCode>=51&&weatherCode<=67)return weatherIcons.rainy;
  if(weatherCode>=71&&weatherCode<=77)return weatherIcons.snowy;
  if(weatherCode>=80&&weatherCode<=99)return weatherIcons.stormy;
  return weatherIcons.cloudy; // default
}

function updateWeather(){
  var iconEl=document.getElementById('weather-icon');
  var tempEl=document.getElementById('weather-temp');
  if(!iconEl||!tempEl)return;
  // Brooklyn, NY coordinates
  var lat=40.6782;
  var lon=-73.9442;
  var url='https://api.open-meteo.com/v1/forecast?latitude='+lat+'&longitude='+lon+'&current=temperature_2m,weather_code&temperature_unit=fahrenheit';
  fetch(url).then(function(response){
    if(!response.ok)throw new Error('Weather fetch failed');
    return response.json();
  }).then(function(data){
    if(data&&data.current){
      var temp=Math.round(data.current.temperature_2m);
      var code=data.current.weather_code;
      iconEl.innerHTML=getWeatherIcon(code);
      tempEl.textContent=temp+'°F';
    }
  }).catch(function(e){
    iconEl.innerHTML='';
    tempEl.textContent='--°F';
  });
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',function(){
    updateESTTime();
    updateWeather();
  });
}else{
  updateESTTime();
  updateWeather();
}
setInterval(updateESTTime,1000);
setInterval(updateWeather,900000); // Update every 15 minutes

