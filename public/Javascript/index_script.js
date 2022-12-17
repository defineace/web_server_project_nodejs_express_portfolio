var x = 2;
var y = document.getElementById("album").children;

setInterval(()=>{
    if(x <= y.length-1){
        if(x!=0){
            y[x-1].style.border = "none";
            y[x-1].style.backgroundColor = "transparent";
            y[y.length-1].style.opacity = "";
            
        }else{
            y[y.length-1].style.border = "none";
            y[y.length-1].style.backgroundColor = "transparent";
            y[y.length-1].style.opacity = "";
        }

        y[x].style.border = "3px solid rgba(0, 0, 0, 0.521)";
        y[x].style.backgroundColor = "rgba(95, 95, 95, 0.288)";

        document.getElementById("slideshow").src = y[x].getElementsByTagName("img")[0].src;
        x += 1;
    }else{
        x = 0;
    }
},3000);