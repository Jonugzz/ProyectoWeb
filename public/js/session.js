var SD;
if(localStorage.getItem('id') == null){
    SD = 0;
}
else{
    SD = localStorage.getItem('id')
}
let settings = {
    method : 'GET',
    headers : {
        id : SD
    }
};
//fetch para llamar al get de validasion de sesion
fetch("/rp-analyzer/validate", settings)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .catch(err => {
        console.log(err);
        window.location.href = "/";
    });


//handle log out
$("#lgOut").on("click", function() {
    localStorage.clear();
    window.location.href = "/";
});