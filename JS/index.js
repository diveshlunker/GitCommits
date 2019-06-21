function userrepo(user){
    $.getJSON("https://api.github.com/users/"+user+"/repos")
    .done(function(data){
        
        var a1 =  "<br><div class='row'><div class='col-lg-6'><div class='card' style='width: 500px; height: 200px;'><div class='card-body'>"
        
        var a2 = "<div class='col-lg-6'><div class='card' style='width: 500px; height: 200px;'><div class='card-body'>"
//        var container;
//        container = document.getElementById("containerr");
        var i;
        var stringg = " "
        
        for(i=0;i<data.length;i++){
            
            listofrep = document.getElementById("listofrepo")
            
//            console.log(data[i].name)
//            console.log(data[i].stargazers_count)
//            console.log(data[i].language)
//            console.log(data[i].forks_count)
//            console.log(data[i].description)
            
            listofrep.innerHTML = "Repositories are been listed below. Click on them to check its fruitful commits."
            
            if(i%2==0){
                
                if(data[i].description == null){
                    data[i].description = "No description provided for this repository";
                }
                
                stringg += a1;
                stringg+="<div id='"+i+"'>"
                stringg += "<h5 class='card-title' style='text-align:center;'>"+data[i].name+"</h5>"
                stringg += "<p class='card-text'>"+data[i].description+"</p><br>"
                stringg+="<div class='row'><div class='col-lg-1'><img class='starimg' src='IMG/star.png'></div><div class='col-lg-1'>"+data[i].stargazers_count+"</div><div class='col-lg-1'><img class='forkimg' src='IMG/fork.png'></div><div class='col-lg-1'>"+data[i].forks_count+"</div><div class='col-lg-3'><button type='button' class='searchBtn btn btn-info' onclick='clicked("+i+")'>Check</button></div></div>"
                stringg+="</div></div></div></div>"
                
            }
            else{
                if(data[i].description == null){
                    data[i].description = "No description provided for this repository";
                }
                
                stringg += a2;
                stringg+="<div id='"+i+"'>"
                stringg += "<h5 class='card-title'  style='text-align:center;'>"+data[i].name+"</h5>"
                stringg += "<p class='card-text'>"+data[i].description+"</p><br>"
                stringg+="<div class='row'><div class='col-lg-1'><img class='starimg' src='IMG/star.png'></div><div class='col-lg-1'>"+data[i].stargazers_count+"</div><div class='col-lg-1'><img class='forkimg' src='IMG/fork.png'></div><div class='col-lg-1'>"+data[i].forks_count+"</div><div class='col-lg-3'><button type='button' class='searchBtn btn btn-info' onclick='clicked("+i+")'>Check</button></div></div>"
                stringg+="</div></div></div></div></div><br>"
                
                
            }
            
           
        }
        
        var cont = "<div class=container>"
        var end = "</div>"
        var final = "<br><a href='check.html'><h2 class='finalstatement' align='center'>How do we check?</h2></a><br>"
        var g = document.createElement('div');
        g.id = i+100;
        var a0 = cont+stringg+final+end;
        document.body.appendChild(g);
        document.getElementById(g.id).innerHTML = a0;
        
        
    });
}
function getUser(){
    var user = document.getElementById("usernam").value;
    userrepo(user);
}

function clicked(id){
    getdiv = document.getElementById(id);

    var user = document.getElementById("usernam").value;
    
    $.getJSON("https://api.github.com/users/"+user+"/repos")
    .done(function(data){
        var i;
        var name;
        for(i=0;i<data.length;i++){
            if(i==id){
                name = data[i].name;
            }
        }
        
        var a0 = "<img class = 'loader' src='IMG/loading.gif' alt='loading...'>";
        document.getElementById(id).innerHTML = a0;
        
        $.getJSON("https://api.github.com/repos/"+user+"/"+name+"/branches")
        .done(function(data1){
            
            
            
            
            var j;
            var c=0;
            var c2=0;
            var l=["badcommits"];
            var l2 = ["goodcommits"];
            for(j=0;j<data1.length;j++){
                if(data1[j].name=="master"){
                    console.log(data1[j].commit.url);
                    $.getJSON(data1[j].commit.url)
                    .done(function(data2){
                        
                        console.log(data2.parents[0].url);
                        if(data2.stats.total<=10){
                            c+=1
                            l.push(data2.commit.url);
                        }
                        else{
                            l2.push(data2.commit.url);
                            c2+=1
                        }
                        getcommits(data2,c,c2,l,l2,id);                      

                    });
                }
            }
            
        });
    
    });
}


function getcommits(data2,c,c2,l,l2,id){
    if(data2.parents.length!=0){
            $.getJSON(data2.parents[0].url)
            .done(function(data2){
                if(data2.stats.total>10){
                    c2+=1
                    l2.push(data2.commit.url);
                }
                else{
                    c+=1
                    l.push(data2.commit.url);
                }
                
//                console.log(c);
//                console.log(c2);
//                console.log(data2.parents[0].url);
                getcommits(data2,c,c2,l,l2,id);
        });
    }
    else{
        console.log(c2);
        display(c,c2,l,l2,id);
        console.log("completed bro");
    }
}

function display(c,c2,l,l2,id){
    
    displayid = document.getElementById(id);
    displayid.innerHTML = "There are "+c+" improper commits and "+c2+" proper commits.";
    displayid.innerHTML+="<br><br>"
    if((c*4)<=c2){
        displayid.innerHTML+="It is a good Repository. Maintain it the same way:)";
    }
    else{
        displayid.innerHTML+="You have to work on this repository. You have made many contribution which does not bring much change to your project."
    }
    displayid.innerHTML+="<br><br>"
    displayid.innerHTML+="<a href='home.html' type='button' class='searchBtn btn btn-info'>Check All Commits</a>"
}
















