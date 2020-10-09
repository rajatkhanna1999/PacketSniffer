var btn = document.createElement('button');
btn.innerHTML = "Edit";
btn.value = '2';
btn.onclick = EditData;

function EditData(event) {
    alert(this.value);
}