function generateQRCode() {
	var data = document.getElementById("data").value
	eel.generate_qr(data)(setImage)
}

function devices() {
	//location.href = "deviceScreen.html";
	eel.findDevices()(function(ret){console.log(ret)})
}

eel.expose(addButton);
function addButton(d){
	console.log("lolita");
	var btn = document.createElement("BUTTON");
	btn.innerHTML =  d;
	btn.id = d;
	btn.value = d;
	//btn.setAttribute("class", "btn_class");
	// btn.className = "get-start-area submit"
	btn.style.cssText = "background-color: #fb397d;color: #fff;font-weight: 500;display: inline-block;border: none;height: 50px;min-width: 167px;line-height: 46px;text-align: center;border-radius: 24px 24px 24px 0px;margin-left: 10px;"
	document.body.appendChild(btn);
	btn.onclick = EditData;
}

function EditData(event) {
	alert(this.value);
	eel.sniffPackets(this.value);
}

function setImage(base64) {
	document.getElementById("qr").src = base64
}


// function mouseOver() {
// 	document.getElementById("demo").style.cssText = "background: #6f52e5;color: #fff;-webkit-transition-duration: 500ms;-o-transition-duration: 500ms;transition-duration: 500ms;"
// }