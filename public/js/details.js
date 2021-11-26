//navbar mobile
const burgerIcon = document.querySelector('#burger');
const navbarM = document.querySelector('#nav-links');

burgerIcon.addEventListener('click', () => {
    navbarM.classList.toggle('is-active');
});
//Funcion para cargar info de una receta recibida por un metodo get
function cargaInfo(){
    var t = $("#title");
    var ingr = $("#ing");
    var rs = $("#result");
    var id = sessionStorage.getItem("rId");
    var urlq = '/rp-analyzer/getInfo/' + id;
    $.ajax({ url: urlq, method: "GET" })
    .then(function(response) {
        if(response != null){
            t.html(response.title);
            ingr.html(response.ingredients);
            rs.html(`<section class="performance-facts has-background-white">
                        <header class="performance-facts__header">
                            <h1 class="performance-facts__title">Nutrition Facts</h1>
                        </header>
                        <table class="performance-facts__table">
                        <thead>
                            <tr>
                                <th colspan="3" class="small-info">
                                    Amount Per Serving
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th colspan="2">
                                <b>Calories</b>
                            </th>
                            <td>
                                ${response.Calories}
                            </td>
                            </tr>
                            <tr class="thick-row">
                            <td colspan="3" class="small-info has-text-right">
                                <b>% Daily Value*</b>
                            </td>
                            </tr>
                            <tr>
                            <th colspan="2">
                                <b>Total Fat</b>
                                ${response.TotalFat}
                            </th>
                            <td>
                                <b>${response.DailyFat}</b>
                            </td>
                            </tr>
                            <tr>
                            <td class="blank-cell">
                            </td>
                            <th>
                                Saturated Fat
                                ${response.SaturatedFat}
                            </th>
                            <td>
                                <b>${response.DailySF}</b>
                            </td>
                            </tr>
                            <tr>
                            <td class="blank-cell">
                            </td>
                            <th>
                                Trans Fat
                                ${response.TransFat}
                            </th>
                            <td>
                            </td>
                            </tr>
                            <tr>
                            <th colspan="2">
                                <b>Cholesterol</b>
                                ${response.Cholesterol}
                            </th>
                            <td>
                                <b>${response.DailyCH}</b>
                            </td>
                            </tr>
                            <tr>
                            <th colspan="2">
                                <b>Sodium</b>
                                ${response.Na}
                            </th>
                            <td>
                                <b>${response.DailyNa}</b>
                            </td>
                            </tr>
                            <tr>
                            <th colspan="2">
                                <b>Total Carbohydrate</b>
                                ${response.Carbohydrate}
                            </th>
                            <td>
                                <b>${response.DailyCB}</b>
                            </td>
                            </tr>
                            <tr>
                            <td class="blank-cell">
                            </td>
                            <th>
                                Dietary Fiber
                                ${response.Fiber}
                            </th>
                            <td>
                                <b>${response.DialyFB}</b>
                            </td>
                            </tr>
                            <tr>
                            <td class="blank-cell">
                            </td>
                            <th>
                                Sugars
                                ${response.Sugars}
                            </th>
                            <td>
                            </td>
                            </tr>
                            <tr class="thick-end">
                            <th colspan="2">
                                <b>Protein</b>
                                ${response.Protein}
                            </th>
                            <td>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    
                        <table class="performance-facts__table">
                        <tbody>
                            <tr>
                            <td colspan="2">
                                Vitamin D
                                ${response.VitD}
                            </td>
                            <td>
                                Potassium
                                ${response.Potassium}
                            </td>
                            </tr>
                            <tr class="thin-end">
                            <td colspan="2">
                                Calcium
                                ${response.Calcium}
                            </td>
                            <td>
                                Iron
                                ${response.Iron}
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    
                        <p class="small-info">* Percent Daily Values are based on a 2,000 calorie diet.</p>
                    </section>`);
        }
    });
}

cargaInfo();