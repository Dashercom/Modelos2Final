window.onload = updateClock;

var totalTime = 0;
function updateClock() {
  document.getElementById('countdown').innerHTML = totalTime;
  if(estado==1){
    alert('Final');
  }else if (estado==2) {
    alert('Puntaje: '+ totalTime);
  }else{
    totalTime+=1;
    setTimeout("updateClock()",1000);
  }
}
