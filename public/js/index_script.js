const album = document.getElementById("album").children;
var index = 2;

setInterval(()=>{
    if(index <= album.length-1){
        if(index!=0){
            album[index-1].children[0].style['box-shadow'] = "0px 5px 5px 1.5px black";
            album[index].children[0].style.transition ="transform 500ms, box-shadow 500ms";
            
            album[index-1].style.border = "none";
            album[index-1].style.backgroundColor = "transparent";
            album[album.length-1].style.opacity = "";
            
        }else{
            album[album.length-1].children[0].style['box-shadow'] = "0px 5px 5px 1.5px black";
            album[index].children[0].style.transition ="transform 500ms, box-shadow 500ms";

            album[album.length-1].style.border = "none";
            album[album.length-1].style.backgroundColor = "transparent";
            album[album.length-1].style.opacity = "";
        }

        album[index].style.border = "3px solid rgba(0, 0, 0, 0.521)";
        album[index].style.backgroundColor = "rgba(95, 95, 95, 0.288)";

        album[index].children[0].style['box-shadow'] = "0px 5px 25px 1.5px black";
        album[index].children[0].style.transition ="transform 500ms, box-shadow 500ms";

        document.getElementById("slideshow").src = album[index].getElementsByTagName("img")[0].src;
        index += 1;
    }else{
        index = 0;
    }
},5000);