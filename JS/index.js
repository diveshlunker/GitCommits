function userrepo(user){
    $.getJSON("https://api.github.com/users/"+user+"/repos")
    .done(function(data){
        
        var a1 =  "<br><div class='row'><div class='col-lg-6'><a href='home.html'><div class='card' style='width: 500px; height: 200px;'><div class='card-body'>"
        
        var a2 = "<div class='col-lg-6'><a href='home.html'><div class='card' style='width: 500px; height: 200px;'><div class='card-body'>"
//        var container;
//        container = document.getElementById("containerr");
        var i;
        var stringg = " "
        
        for(i=0;i<data.length;i++){
            
            listofrep = document.getElementById("listofrepo")
            
            console.log(data[i].name)
            console.log(data[i].stargazers_count)
            console.log(data[i].language)
            console.log(data[i].forks_count)
            console.log(data[i].description)
            
            listofrep.innerHTML = "Repositories are been listed below. Click on them to check its fruitful commits."
            
            if(i%2==0){
                
                if(data[i].description == null){
                    data[i].description = "No description provided for this repository";
                }
                
                stringg += a1;
                stringg += "<h5 class='card-title' style='text-align:center;'>"+data[i].name+"</h5>"
                stringg += "<p class='card-text'>"+data[i].description+"</p>"
                stringg+="</div></div></a></div>"
                
            }
            else{
                if(data[i].description == null){
                    data[i].description = "No description provided for this repository";
                }
                
                stringg += a2;
                stringg += "<h5 class='card-title' style='text-align:center;'>"+data[i].name+"</h5>"
                stringg += "<p class='card-text'>"+data[i].description+"</p>"
                stringg+="</div></div></a></div></div><br>"
                
                
            }
            
           
        }
        
        var cont = "<div class=container>"
        var end = "</div>"
        var g = document.createElement('div');
        g.id = i;
        var a0 = cont+stringg+end;
        document.body.appendChild(g);
        document.getElementById(g.id).innerHTML = a0;
        
    });
}
function getUser(){
    var user = document.getElementById("usernam").value;
    userrepo(user);
}
