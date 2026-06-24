function show(id){
  document.querySelectorAll('.page')
  .forEach(p=>p.classList.remove('active'));

  document.getElementById(id).classList.add('active');
}

function toggle(el){
  let p = el.nextElementSibling;
  p.style.display = (p.style.display==="block")?"none":"block";
}

function send(){
  let msg = document.getElementById("msg").value;
  if(!msg) return;

  document.getElementById("chatBox").innerHTML +=
  `<p><b>Sedulur:</b> ${msg}</p>`;

  document.getElementById("msg").value="";
}