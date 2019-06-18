function userrepo(user){
    $.getJSON("https://api.github.com/users/"+user+"/repos")
    .done(function(data){
        var a1 =  "<div class=card style='width: 18rem';><div class=card-body><h5 class=card-title>Card title</h5><h6 class=card-subtitle mb-2 text-muted>Card subtitle</h6><p class=card-text>Some quick example text to build on the card title and make up the bulk of the card's content.</p></div></div>";
//        var container;
//        container = document.getElementById("containerr");
        var i;
        for(i=0;i<data.length;i++){
            console.log(data[i].name)
            console.log(data[i].stargazers_count)
            console.log(data[i].language)
            console.log(data[i].forks_count)
            console.log(data[i].description)
            
            g = document.createElement('div');
            g.id = i;
            g.class = "card";
            document.body.appendChild(g);
            document.getElementById(g.id).innerHTML = a1;
            
           
        }
        
    });
}
function getUser(){
    var user = document.getElementById("usernam").value;
    userrepo(user);
}
