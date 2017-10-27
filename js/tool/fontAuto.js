document.write('<script language="javascript" src="https://junoriaz.github.io/WdsApp/pubset/set.js"></script>');
function fontAuto(){
var winW=document.documentElement.clientWidth;
if(winW>=750)
	document.documentElement.style.fontSize="625%";
else
	document.documentElement.style.fontSize=(winW/750*625)+"%";
}
fontAuto();
window.onresize=fontAuto;

