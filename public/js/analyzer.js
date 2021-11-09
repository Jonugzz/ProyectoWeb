//navbar mobile
const burgerIcon = document.querySelector('#burger');
const navbarM = document.querySelector('#nav-links');

burgerIcon.addEventListener('click', () => {
    navbarM.classList.toggle('is-active');
});

//button actions
var rt = $("#title");
var rIng = $("#ings");
var res = $("#result");
var messErr = $("#merr");
var shar = $("#share");

var nFacts, arrIng;

$("#check").on("click", function(event){
    event.preventDefault();

    var calo, fat, perFat, satfat, persat, transfat, chole, perchole, sod, persod, carb, percarb, fib, perfib, sugar, prot, vit, pot, cal, iron;
    
    arrIng = {
        "ingr": rIng.val().split(/\n|\r/)
    };
    
    $.ajax({
        url: 'https://api.edamam.com/api/nutrition-details?app_id=20a5cda9&app_key=1e3fb8c297586dcacdd139de9d8124cf',
        type: 'POST',
        data: JSON.stringify(arrIng),
        contentType: 'application/json',
        success: function(data) {
            messErr.text("");

            if (typeof(data.totalNutrients.ENERC_KCAL) != "undefined") {
                calo = Math.round(data.totalNutrients.ENERC_KCAL.quantity);
            } else {calo = '0'};
            
            if (typeof(data.totalNutrients.FAT) != "undefined") {
                fat = Math.round(data.totalNutrients.FAT.quantity*10)/10+' '+data.totalNutrients.FAT.unit;
            } else {fat = '-'};

            if (typeof(data.totalDaily.FAT) != "undefined") {
                perFat = Math.round(data.totalDaily.FAT.quantity)+' '+data.totalDaily.FAT.unit;
            } else {perFat = '-'};	
            
            if (typeof(data.totalNutrients.FASAT) != "undefined") {
                satfat = Math.round(data.totalNutrients.FASAT.quantity*10)/10+' '+data.totalNutrients.FASAT.unit;
            } else {satfat = '-'};

            if (typeof(data.totalDaily.FASAT) != "undefined") {
                persat = Math.round(data.totalDaily.FASAT.quantity)+' '+data.totalDaily.FASAT.unit;
            } else {persat = '-'};	
            
            if (typeof(data.totalNutrients.FATRN) != "undefined") {
                transfat = Math.round(data.totalNutrients.FATRN.quantity*10)/10+' '+data.totalNutrients.FATRN.unit;
            } else {transfat = '-'};	
  
            if (typeof(data.totalNutrients.CHOLE) != "undefined") {
                chole = Math.round(data.totalNutrients.CHOLE.quantity*10)/10+' '+data.totalNutrients.CHOLE.unit;
            } else {chole = '-'};

            if (typeof(data.totalDaily.CHOLE) != "undefined") {
                perchole = Math.round(data.totalDaily.CHOLE.quantity)+' '+data.totalDaily.CHOLE.unit;
            } else {perchole = '-'};	
  
            if (typeof(data.totalNutrients.NA) != "undefined") {
                sod = Math.round(data.totalNutrients.NA.quantity*10)/10+' '+data.totalNutrients.NA.unit;
            } else {sod = '-'};

            if (typeof(data.totalDaily.NA) != "undefined") {
                persod = Math.round(data.totalDaily.NA.quantity)+' '+data.totalDaily.NA.unit;
            } else {persod = '-'};	
  
            if (typeof(data.totalNutrients.CHOCDF) != "undefined") {
                carb = Math.round(data.totalNutrients.CHOCDF.quantity*10)/10+' '+data.totalNutrients.CHOCDF.unit;
            } else {carb = '-'};

            if (typeof(data.totalDaily.CHOCDF) != "undefined") {
                percarb = Math.round(data.totalDaily.CHOCDF.quantity)+' '+data.totalDaily.CHOCDF.unit;
            } else {percarb = '-'};	
  
            if (typeof(data.totalNutrients.FIBTG) != "undefined") {
                fib = Math.round(data.totalNutrients.FIBTG.quantity*10)/10+' '+data.totalNutrients.FIBTG.unit;
            } else {fib = '-'};

            if (typeof(data.totalDaily.FIBTG) != "undefined") {
                perfib = Math.round(data.totalDaily.FIBTG.quantity)+' '+data.totalDaily.FIBTG.unit;
            } else {perfib = '-'};	
  
            if (typeof(data.totalNutrients.SUGAR) != "undefined") {
                sugar = Math.round(data.totalNutrients.SUGAR.quantity*10)/10+' '+data.totalNutrients.SUGAR.unit;
            } else {sugar = '-'};
  
            if (typeof(data.totalNutrients.PROCNT) != "undefined") {
                prot = Math.round(data.totalNutrients.PROCNT.quantity*10)/10+' '+data.totalNutrients.PROCNT.unit;
            } else {prot = '-'};

            if (typeof(data.totalDaily.VITD) != "undefined") {
                vit = Math.round(data.totalDaily.VITD.quantity)+' '+data.totalDaily.VITD.unit;
            } else {vit = '-'};	
  
            if (typeof(data.totalDaily.CA) != "undefined") {
                cal = Math.round(data.totalDaily.CA.quantity)+' '+data.totalDaily.CA.unit;
            } else {cal = '-'};	
  
            if (typeof(data.totalDaily.FE) != "undefined") {
                iron = Math.round(data.totalDaily.FE.quantity)+' '+data.totalDaily.FE.unit;
            } else {iron = '-'};	
            
            if (typeof(data.totalDaily.K) != "undefined") {
                pot = Math.round(data.totalDaily.K.quantity)+' '+data.totalDaily.K.unit;
            } else {pot = '-'};

            res.html(`<section class="performance-facts has-background-white">
                            <header class="performance-facts__header">
                                <h1 class="performance-facts__title"> Nutrition Facts </h1>
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
                                            <b> Calories </b>
                                        </th>
                                        <td>
                                            ${calo}
                                        </td>
                                    </tr>
                                    <tr class="thick-row">
                                        <td colspan="3" class="small-info has-text-right">
                                            <b> % Daily Value* </b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th colspan="2">
                                            <b> Total Fat </b>
                                            ${fat}
                                        </th>
                                        <td>
                                            <b> ${perFat} </b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="blank-cell">
                                        </td>
                                        <th>
                                            Saturated Fat
                                            ${satfat}
                                        </th>
                                        <td>
                                            <b> ${persat} </b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="blank-cell">
                                        </td>
                                        <th>
                                            Trans Fat
                                            ${transfat}
                                        </th>
                                        <td>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th colspan="2">
                                            <b> Cholesterol </b>
                                            ${chole}
                                        </th>
                                        <td>
                                            <b> ${perchole} </b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th colspan="2">
                                            <b> Sodium </b>
                                            ${sod}
                                        </th>
                                        <td>
                                            <b> ${persod} </b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th colspan="2">
                                            <b> Total Carbohydrate </b>
                                            ${carb}
                                        </th>
                                        <td>
                                            <b> ${percarb} </b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="blank-cell">
                                        </td>
                                        <th>
                                            Dietary Fiber
                                            ${fib}
                                        </th>
                                        <td>
                                            <b> ${perfib} </b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="blank-cell">
                                        </td>
                                        <th>
                                            Sugars
                                            ${sugar}
                                        </th>
                                        <td>
                                        </td>
                                    </tr>
                                    <tr class="thick-end">
                                        <th colspan="2">
                                            <b> Protein </b>
                                            ${prot}
                                        </th>
                                        <td> </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="performance-facts__table">
                                <tbody>
                                    <tr>
                                        <td colspan="2">
                                            Vitamin D
                                            ${vit}
                                        </td>
                                        <td>
                                            Potassium
                                            ${pot}
                                        </td>
                                    </tr>
                                    <tr class="thin-end">
                                        <td colspan="2">
                                            Calcium
                                            ${cal}
                                        </td>
                                        <td>
                                            Iron
                                            ${iron}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <p class="small-info">* Percent Daily Values are based on a 2,000 calorie diet.</p>
                        </section> `);
        
            nFacts = {
                Calories : calo,
                TotalFat: fat,
                DailyFat: perFat,
                SaturatedFat: satfat,
                DailySF: persat,
                TransFat: transfat,
                Cholesterol: chole,
                DailyCH: perchole,
                Na: sod,
                DailyNa: persod,
                Carbohydrate: carb,
                DailyCB: percarb,
                Fiber: fib,
                DialyFB: perfib,
                Sugars: sugar,
                Protein: prot,
                VitD: vit,
                Calcium: cal,
                Potassium: pot,
                Iron: iron
            };

            res.prop("hidden", false);
            shar.prop("hidden", false);

        },
        error: function () {
            messErr.text("We had a problem analysing this. Please check the ingredient spelling or if you have entered a quantities for the ingredients.");
        }
    });
    
});

$("#newA").on("click", function(event){
    event.preventDefault();
    res.html("");
    res.prop("hidden", true);
    shar.prop("hidden", true);
    rt.val("");
    rIng.val("");
});

$("#sav").on("click", function(event){
    event.preventDefault();
    if(rt.val() == "")
    {
        messErr.text("¡The recipe must have a title to save!")
    }
    else{
        messErr.text("");
        
        var uem = localStorage.getItem('email');
        var newRep = {
            title: rt.val(),
            ingredients: rIng.val(),
            Calories: nFacts.Calories,
            TotalFat: nFacts.TotalFat,
            DailyFat: nFacts.DailyFat,
            SaturatedFat: nFacts.SaturatedFat,
            DailySF: nFacts.DailySF,
            TransFat: nFacts.TransFat,
            Cholesterol: nFacts.Cholesterol,
            DailyCH: nFacts.DailyCH,
            Na: nFacts.Na,
            DailyNa: nFacts.DailyNa,
            Carbohydrate: nFacts.Carbohydrate,
            DailyCB: nFacts.DailyCB,
            Fiber: nFacts.Fiber,
            DialyFB: nFacts.DialyFB,
            Sugars: nFacts.Sugars,
            Protein: nFacts.Protein,
            VitD: nFacts.VitD,
            Calcium: nFacts.Calcium,
            Potassium: nFacts.Potassium,
            Iron: nFacts.Iron,
            userE : uem
        }

        var settings = {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(newRep)
        }
        fetch('/rp-analyzer/saveRecipe', settings)
            .then( response => {
                if(response.ok){
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJSON => {
                alert("Saved");
                
            })
            .catch( err => {
                messErr.innerText = err.message;
            });
    }
});
