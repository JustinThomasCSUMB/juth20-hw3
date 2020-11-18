// js for index.html
$("document").ready(function (){
    let apiKey = "7781ca353e9e747a684659f94e75084e";
    $("#icon").hide();

    $("#formZip").on("submit", async function(e){
        e.preventDefault();
        $("#icon").hide();
        $("#errorZip").hide();
        $("#erroApi").hide();        
        
        let zip = $("#inputZip").val()
        if(!checkZip(zip)){
            return;
        }
        try{
            let url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}&units=imperial`;
            let response = await fetch(url);
            let data = await response.json();
            
            if(data.cod != 200){
                $("#errorApi").text("Invalid zip code!").show();
                return;
            }
            
            $("#temp").text(`Tempurature: ${data.main.temp} F`);
            $("#weather").text(`Weather: ${data.weather[0].description}`);
            $("#icon").attr("src",`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
            $("#icon").show();

        }catch(err){
            $("#errorApi").show();
            return;
        }
        
        
    });// submit
    
    /**
     * check if the zipcode is valid
     * returns true if valid, false if not
     * if false, show error
     */
    function checkZip(zip){
        if(zip.length != 5 || zip <= 9999 || zip > 99999){
            $()
            $("#errorZip").text("Invalid zip code!").show();
            return false;
        }
        
        return true;
    }
    
});// ready