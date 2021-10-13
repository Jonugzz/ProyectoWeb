//tabs
const tabs = document.querySelectorAll('.tabs li');
const tabContentB = document.querySelectorAll('#tab-content > div');

tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        tabs.forEach(item => item.classList.remove('is-active'));
        tab.classList.add('is-active');

        const target = tab.dataset.target;
        tabContentB.forEach(box => {
            if(box.getAttribute('id') === target) {
                box.classList.remove('is-hidden');
            } else
            {
                box.classList.add('is-hidden');
            }
        });
    });
});

//Data validation and error messages
var lem = document.getElementById("em");
var lpass = document.getElementById("pass");
var lerr = document.getElementById("LogError");

$("#log").on("click", function (e){
    e.preventDefault();

    if (lem.value.indexOf("@") == -1){
        lerr.innerText = "¡ Not a valid e-mail !";
    }
    else{
        lerr.innerText = "";

        //falta validar datos
        console.log(lem.value);
        console.log(lpass.value);   
    }
    
    document.getElementById("em").value = "";
    document.getElementById("pass").value = "";
});

var sem = document.getElementById("rem");
var spass = document.getElementById("rpass");
var scp = document.getElementById("rcp");
var rerr = document.getElementById("SignError");

$("#signup").on("click", function (e){
    e.preventDefault();
    if (sem.value.indexOf("@") == -1){
        rerr.innerText = "¡ Not a valid e-mail !";
    }
    else{
        rerr.innerText = "";
        if (spass.value != scp.value){
            rerr.innerText = "¡ Passwords dont match !";
        }
        else{
            rerr.innerText = "";
            console.log(spass.value);
            console.log(sem.value);
            location.reload();
        }
    }
    spass.value = "";
    scp.value = "";
    sem.value = "";
});