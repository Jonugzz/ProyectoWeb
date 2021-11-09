//navbar mobile
const burgerIcon = document.querySelector('#burger');
const navbarM = document.querySelector('#nav-links');

burgerIcon.addEventListener('click', () => {
    navbarM.classList.toggle('is-active');
});

var lista = $("#listaR");
var results;

function cargaRec(){
    var uem = localStorage.getItem('email');
    var urlq = '/rp-analyzer/getRe/' + uem;
    $.ajax({ url: urlq, method: "GET" })
    .then(function(response) {
        if(response.length == 0){
            alert("No saved recipes");
        }
        else{
            
            for(var i = 0; i<response.length; i++){
            
                lista.append(`<li class="p-2">
                                <div class="notification is-size-4">
                                    ${response[i].title}
                                    <div class="has-text-right">
                                        <button class="button is-success is-focused" id="viewr" d=${response[i]._id}>View</button>
                                        <button class="button is-danger is-focused" id="delr" del=${response[i]._id}>Delete</button>
                                    </div>
                                    <div id="vw"> </div>
                                </div>
                            </li>`);
            }
        }
    });
}

lista.on("click", "#viewr", function(){
    sessionStorage.setItem("rId", $(this).attr("d"));
    window.location.href = "/details";
});

lista.on("click", "#delr", function(){
    var delId = {
        id: $(this).attr("del")
    };
    
    var settings = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(delId)
    }
   
    fetch('/rp-analyzer/view', settings)
        .then( response => {
            if(response.ok){
                alert("Deleted");
                location.reload();
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .catch( err => {
            alert(err.message);
        });
   
});

cargaRec();


        
    
