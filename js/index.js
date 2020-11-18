// js for index.html
$("document").ready(function (){
    
    let apikey = "13513a306e94ec26b9aa01680aa25c85";
    
    $("#formZip").on("submit", async function(){
        $("#errorZip").hide();
        $("#dataError").hide();
        
        let zip = $("#inputZip").val()
        if(!checkZip(zip)){
            return;
        }
        let url = `api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}`
        let response = await fetch(url);
        let data = await response.json();
        
        if(data.length < 1){
            $("#dataError").show();
            return;
        }
        
        $("#temp").text(`Tempurature: ${data.main.temp} F`);
        $("#weather").text(`Weather: ${data.main.weather}`);
        $("#icon").attr("src",`http://openweathermap.org/img/wn/${data.weather.icon}.png`)
        
    });// submit
    
    /**
     * check if the zipcode is valid
     * returns true if valid, false if not
     * if false, show error
     */
    function checkZip(zip){
        if(zip.length() != 5 || zip <= 9999 || zip > 99999){
            $("#errorZip").show();
            return false;
        }
        
        return true;
    }
    
});// ready