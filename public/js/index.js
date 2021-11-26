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

//Validacian de los campos y login
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
        
        var uVal = {
            email: lem.value,
            password: lpass.value
        };
        //fetch para mandar las credenciales del usuario en un post
        var settings = {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(uVal)
        }
       
        fetch('/rp-analyzer/login', settings)
            .then( response => {
                if(response.ok){
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJSON => {
                localStorage.setItem('id', responseJSON.id);
                localStorage.setItem('email', responseJSON.email);
                window.location.href = "/analyzer";
            })
            .catch( err => {
                lerr.innerText = err.message;
            });
        
    }
    
    document.getElementById("em").value = "";
    document.getElementById("pass").value = "";
});

var sem = document.getElementById("rem");
var spass = document.getElementById("rpass");
var scp = document.getElementById("rcp");
var rerr = document.getElementById("SignError");
//Validaciones del registro y fetch para crear el usuario nuevo
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

            var newUser = {
                userName: sem.value,
                email: sem.value,
                password: spass.value
            };
            
            var settings = {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(newUser)
            }
           
            fetch('/rp-analyzer/register', settings)
                .then( response => {
                    if(response.ok){
                        return response.json();
                    }
                    throw new Error(response.statusText);
                })
                .then(responseJSON => {
                    alert("Acount created, you can now log in");
                    location.reload();
                })
                .catch( err => {
                    rerr.innerText = err.message;
                });
            
        }
    }
    spass.value = "";
    scp.value = "";
    sem.value = "";
});