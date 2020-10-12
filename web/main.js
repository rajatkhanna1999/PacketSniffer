function generateQRCode() {
	console.log("calledMe");
	var word = document.getElementById("data").value;
	var textValue = document.getElementById('dekho').innerHTML;
	//var textValue = textarea.value;  //-> don't use .innerHTML since there is no HTML in a textarea element
	// console.log(textarea);
	// console.log(document.getElementById('dekho').innerHTML);
	console.log(word);
	console.log(textValue);
	word = word.toLowerCase();
	textValue = textValue.toLowerCase();
	if (textValue.indexOf(word)!=-1)
	{
		alert('found')
	}else{
		alert('Not found')
	}
}

function devices() {
	//location.href = "deviceScreen.html";
	eel.findDevices()(function(ret){console.log(ret)})
}

var num = 0, tableHeader = 0;
var filter = 'none';

eel.expose(addText);
function addText(){
	var x = document.createElement("INPUT");
	x.id = 'userInput'
	x.setAttribute("type", "text");
	x.placeholder = "Enter The number of packets"
	x.style.cssText = "color: #FFFFFF;opacity: 1;background: #9572e8;;height: 50px;max-width: 260px;border: none;border-radius: 24px;padding: 0px 15px;"
	console.log(x.value);
	document.body.appendChild(x);
}

eel.expose(addFilters);
function addFilters(d){
	var btn = document.createElement("BUTTON");
	btn.innerHTML =  d;
	btn.id = d;
	btn.value = d;
	btn.style.cssText = "background-color: #fb397d;color: #fff;font-weight: 500;display: inline-block;border: none;height: 50px;min-width: 167px;line-height: 46px;text-align: center;border-radius: 24px 24px 24px 0px;margin-left: 10px;"
	document.body.appendChild(btn);
	btn.onclick = solve;
}

eel.expose(addLine);
function addLine(){
	var br = document.createElement("br");
	element.appendChild(br);
}

function solve(event){
	filter = this.value;
}

eel.expose(addButton);
function addButton(d){
	console.log("lolita");
	var btn = document.createElement("BUTTON");
	btn.innerHTML =  d;
	btn.id = d;
	btn.value = d;
	//btn.setAttribute("class", "btn_class");
	btn.className = "rajat"
	btn.style.cssText = "background-color: #fb397d;color: #fff;font-weight: 500;display: inline-block;border: none;height: 50px;min-width: 167px;line-height: 46px;text-align: center;border-radius: 24px 24px 24px 0px;margin-left: 10px;"
	document.body.appendChild(btn);
	btn.onclick = EditData;
}

eel.expose(addButtonClear);
function addButtonClear(d){
	console.log("lolitaaaa");
	var btn = document.createElement("BUTTON");
	btn.innerHTML =  d;
	btn.id = d;
	num = 0;
	filter = 'none';
	document.getElementById("dekho").innerHTML = "";
	btn.value = d;
	btn.style.cssText = "background-color: #fb397d;color: #fff;font-weight: 500;display: inline-block;border: none;height: 50px;min-width: 167px;line-height: 46px;text-align: center;border-radius: 24px 24px 24px 0px;margin-left: 10px;"
	document.body.appendChild(btn);
	btn.onclick = DeleteRows;
}

function DeleteRows() {
	filter = 'none';
	num = 0;
	var divBig = document.getElementById('dekho');
	var divs = divBig.getElementsByTagName('div');
	for (var i = 0; i < divs.length; i += 1) {
		divs[i].innerHTML = "";
	}
	var rowCount = table.rows.length;
	for (var i = rowCount - 1; i > 0; i--) {
		table.deleteRow(i);
	}
}

function getId(element){
	alert("row" + element.parentNode.parentNode.rowIndex + "-column" + element.parentNode.cellIndex);
}

function EditData(event) {
	//alert(this.value);
	var userInput = document.getElementById('userInput').value;
	var i = 0;
	console.log(userInput)
	if(tableHeader == 0){
		tableHeader = 1;
		var tr = $('<tr/>');
		tr.append("<th>" + "Destination MAC" + "</th>");
		tr.append("<th>" + "Source MAC" + "</th>");
		tr.append("<th>" + "Ethernet Protocol" + "</th>");
		tr.append("<th>" + "Protocols" + "</th>");
		tr.append("<th>" + "More Details" + "</th>");
		$("#table").append(tr);
	}
	var table = document.getElementById("table");
	while (i < userInput) {
		eel.sniffPackets(this.value, filter)(function(ret){
			console.log(ret);
			var tr = document.createElement('tr');
			var tr1 = tr.appendChild(document.createElement('td'));
			var tr2 = tr.appendChild(document.createElement('td'));
			var tr3 = tr.appendChild(document.createElement('td'));
			var tr4 = tr.appendChild(document.createElement('td'));
			var btn = document.createElement("BUTTON");
			btn.value = i;
			btn.style.cssText = "background-color: #fb397d;color: #fff;font-weight: 500;display: inline-block;border: none;height: 50px;min-width: 167px;line-height: 46px;text-align: center;border-radius: 24px 24px 24px 0px;margin-left: 10px;"
			btn.className = "btn";
			btn.innerHTML = "Press For Packet Details";
			btn.onclick = (function(){
				var divBig = document.getElementById('dekho');
				var divs = divBig.getElementsByTagName('div');
				for (var i = 0; i < divs.length; i += 1) {
					divs[i].innerHTML = "";
				}
				console.log(ret);
				var para = document.createElement("div"); 
				para.style.color = "#000000";
				para.innerHTML = "";
				var arr = [];
				for (x in ret) {
					para.innerHTML += x;
					para.innerHTML += " : ";
					para.innerHTML += ret[x];
					para.innerHTML += "\n\n";
				}  
				// document.body.appendCHild(para);
				document.getElementById("dekho").appendChild(para); 
			});
			tr.appendChild(btn);
			//tr.className = "breakRow";
			tr.className = "parent";
			tr.id = "row" + String(i);
			tr.style = "cursor: pointer;"
			tr.title = "Click to expand/collapse";
			// tr.onclick = function(){
			// 	alert("row" + this.parentNode.parentNode.rowIndex + "-column" + this.parentNode.cellIndex);
			// }
			console.log("leid" + i);

			tr1.innerHTML = ret["Destination MAC"];
			tr2.innerHTML = ret["Source MAC"];
			tr3.innerHTML = ret["Ethernet Protocol"];
			tr4.innerHTML = ret["Protocol"];
			// var trr = document.createElement('tr');
			// var trr1 =  trr.appendChild(document.createElement('td'));
			// trr1.innerHTML = ret;
			// trr1.colSpan = 3;
			// trr.className = "child-row" + String(i);
			// trr.style = "display: none;"

			// tr.onclick = function(){
			// 	//var curr = this.parentNode.childNode.rowIndex;
			// 	var curr = this.id;
			// 	console.log("id" + curr + String(curr));
			// 	// var table = $('#table').DataTable();
			// 	// $('#table').on( 'click', 'tr', function () {
			// 	// 	var id = table.row( this ).id();
			// 	// 	alert( 'Clicked row id '+id );
			// 	// } );
			// 	//this.parentNode.removeChild(this);
			// }

			// trr1.id = "hidden_row" + i;
			//trr1.className = "dataRow";
			//tr.onclick = showHideRow(i);
			// $('#table').on('click', 'tr.breakrow',function(){
			// 		$(this).nextUntil('tr.breakrow').slideToggle(200);
			// 		console.log("loda");
            // });
			// tr.onclick = function (event) {
			// 	console.log(this.value);
			// 	showHideRow(trr.value);
			// };
			var table = document.getElementById('table');
			table.appendChild(tr)
			//table.appendChild(trr)
		});
		i++;
		num++;
	}
	setTimeout(() => {
		
	}, 20000);
	addRowHandlers();
}

function addRowHandlers() {
	console.log("hi");
	var table = document.getElementById("table");
	var rows = table.getElementsByTagName("tr");
	for (i = 0; i < rows.length; i++) {
	  var currentRow = table.rows[i];
	  var createClickHandler = function(row) {
		return function() {
		  var cell = row.getElementsByTagName("td")[0];
		  var id = cell.innerHTML;
		  alert("id:" + id);
		};
	  };
	  currentRow.onclick = createClickHandler(currentRow);
	}
  }

function setImage(base64) {
	document.getElementById("qr").src = base64
}