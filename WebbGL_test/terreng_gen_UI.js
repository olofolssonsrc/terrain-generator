var settings = document.getElementsByClassName("setting");

var sliders = document.getElementsByClassName("slider");
	







var slider0 = settings[0].children[0];
var output0 = settings[0].children[2]
slider0.oninput = function() { output0.innerHTML = this.value;}

var slider1 = settings[1].children[0];
var output1 = settings[1].children[2]
slider1.oninput = function() { output1.innerHTML = this.value;}

var slider2 = settings[2].children[0];
var output2 = settings[2].children[2]
slider2.oninput = function() { output2.innerHTML = this.value;}

var slider3 = settings[3].children[0];
var output3 = settings[3].children[2]
slider3.oninput = function() { output3.innerHTML = this.value;}

var slider4 = settings[4].children[0];
var output4 = settings[4].children[2]
slider4.oninput = function() { output4.innerHTML = this.value;}

slider4.disabled = true;

var slider5 = settings[5].children[0];
var output5 = settings[5].children[2]
slider5.oninput = function() { output5.innerHTML = this.value;}

var slider6 = settings[6].children[0];
var output6 = settings[6].children[2]
slider6.oninput = function() { output6.innerHTML = this.value;}

var slider7 = settings[7].children[0];
var output7 = settings[7].children[2]
slider7.oninput = function() { output7.innerHTML = this.value;}

var slider8 = settings[8].children[0];
var output8 = settings[8].children[2]
slider8.oninput = function() { output8.innerHTML = this.value;}

slider8.disabled = true;

var slider9 = settings[9].children[0];
var output9 = settings[9].children[2]
slider9.oninput = function() { output9.innerHTML = this.value;}

var slider10 = settings[10].children[0];
var output10 = settings[10].children[2]
slider10.oninput = function() { output10.innerHTML = this.value;}

var slider11 = settings[11].children[0];
var output11 = settings[11].children[2]
slider11.oninput = function() { output11.innerHTML = this.value;}




var start_settinglist = [];

for (var i = 0 ; i < settings.length; i++) { //HÄR SKAPAS STARTSETTINGLISTAN

	start_settinglist.push(parseFloat(settings[i].getAttribute("data-startval")));
	
}




slider0.value = start_settinglist[0];
slider1.value = start_settinglist[1];
slider2.value = start_settinglist[2];
slider3.value = start_settinglist[3];
slider4.value = start_settinglist[4];
slider5.value = start_settinglist[5];
slider6.value = start_settinglist[6];
slider7.value = start_settinglist[7];
slider8.value = start_settinglist[8];
slider9.value = start_settinglist[9];
slider10.value = start_settinglist[10];
slider11.value = start_settinglist[11];

output0.innerHTML = slider0.value;
output1.innerHTML = slider1.value;
output2.innerHTML = slider2.value;
output3.innerHTML = slider3.value;
output4.innerHTML = slider4.value;
output5.innerHTML = slider5.value;
output6.innerHTML = slider6.value;
output7.innerHTML = slider7.value;
output8.innerHTML = slider8.value;
output9.innerHTML = slider9.value;
output10.innerHTML = slider10.value;
output11.innerHTML = slider11.value;




