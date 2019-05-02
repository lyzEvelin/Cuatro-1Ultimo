var posBus = (function(){
    var posStart = 0;
    var pos = 0;
    var previosPos = 0;
    var increase = 0;
    var stages = 1;
    function changePos(newPos){
        //debugger;
        previosPos = pos;
        pos = (newPos * increase) + (parseInt((increase / 2)) - 40);
    }
    function setIncrease(newIncrease){
        increase = newIncrease;
    }
    function setStages(nStages){
        stages = nStages;
    }
    function setPrevious(previous){
        previosPos = previous;
    }
    function setStart(start){
        posStart = start;
    }
    return{
        getValue: function(){
            return pos;
        },
        getPreciousPos: function(){
            return previosPos;
        },
        getMovement: function(){
            return increase;
        },
        getStages: function(){
            return stages;
        },
        getStart: function(){
            return posStart;
        },
        move: function(newPos){
            changePos(newPos);
        },
        setIncrease: function(valueIncrease){
            setIncrease(valueIncrease);
        },
        setStages: function(stages){
            setStages(stages);
        },
        setPrevious: function(previous){
            setPrevious(previous);
        },
        setStart: function(start){
            setStart(start);
        }
    }
})();

var infoTrunck = [];
var trunks = [];
var posTroncal;

function showTroncal(pos){
    console.log(pos);
    var search = trunk.find({Name: pos})[0];
    document.getElementById("troncal").style.display = "block";
    posBus.setStages(search.Stages.length);
    posTroncal = parseInt(search.id);
    posBus.setIncrease(parseInt(900 / search.Stages.length));
    showTrunckAgain();
    createPopUp(pos);
}

function hideTroncal(id){
    posTroncal = 0;
    document.getElementById(id).style.display = "none";
}

function moveBus(){
    var parts = (document.getElementById("aux-pos").value).split(":");
    var search = trunk.find({Name: parts[0]})[0];

    pos = parseInt(this.innerText) - 1;

    var bus = document.getElementById("img-bus");
    var title = document.getElementById("trunk-name").innerText =  search.Stages[pos].name;
    var image = document.getElementById("trunk-image");
    image.src = search.Stages[pos].url;
    image.alt = search.Stages[pos].name;

    var hidden = document.getElementById("aux-pos");
    hidden.value = hidden.value.substring(0, hidden.value.indexOf(":")) + ":" + pos;

    posBus.move(pos);
    bus.animate(
        [{left: posBus.getPreciousPos() + "px"}, {left: posBus.getValue() + "px"}],
        {fill: 'forwards', duration: 1000 + (100 * Math.abs(pos - posBus.getStages()))} 
    );  
}


function createPopUp(pos){
    //document.getElementById("title-troncal").innerText = infoTrunck[pos].name;
    var search = trunk.find({Name: pos})[0];

    document.getElementById("title-troncal").innerText = search.Name;
    document.getElementById("start-trunk").innerText = search.Inicio;
    document.getElementById("end-trunk").innerText = search.Fin;
    document.getElementById("length-trunk").innerText = search.Longitud;
    document.getElementById("img-troncal").src = search.url;

    document.getElementById("trunk-name").innerText = search.Stages[0].name;
    document.getElementById("trunk-image").src = search.Stages[0].url;
    document.getElementById("trunk-image").alt = search.Stages[0].name;
    document.getElementById("aux-pos").value = pos + ":" + 0;
    

    var line_time = document.getElementById("line-timeID");

    var stages = document.getElementById('line-time-buttons');
    while (stages.firstChild) {
        stages.removeChild(stages.firstChild);
    }
    
    for(var i = 0; i < search.Stages.length; i++){
        var div = document.createElement('div');
        var button = document.createElement('button');
        var icon = document.createElement('i');
        icon.classList.add("material-icons");
        icon.innerText = "add_circle_outline";
        button.appendChild(icon);
        var aux = i;
        button.addEventListener('click', moveBus);
        button.innerText = i + 1;

        var titleCard = document.createElement('h2');
        titleCard.innerText = search.Stages[i].name;
        div.appendChild(button);
        div.appendChild(titleCard);
        stages.appendChild(div);
    }
    stages.style.setProperty('grid-template-columns', `repeat(${search.Stages.length}, 1fr)`);
    line_time.appendChild(stages);

    var first = parseInt(posBus.getMovement() / 2) - 40;

    if(first < 0){
        first = 0;
    }

    posBus.setStart(first);

    document.getElementById("img-bus").animate(
        [{left: posBus.getPreciousPos() + "px"}, {left: first + "px"}],
        {fill: 'forwards', duration: 1000 + (100 * Math.abs(parseInt(search.id) - posBus.getStages()))} 
    );
}

function showStages(visible){
    var parts = (document.getElementById("aux-pos").value).split(":");
    var search = {};
    if(trunk !== undefined){
        search = trunk.find({Name: parts[0]})[0];
    }
    else{
        console.log("Trunk Undefined:"+parts[0]);
    }

    if(search !== undefined){

        if(document.getElementById("troncal").style.display !== "block"){
            document.getElementById("troncal").style.display = "block";
        }

        if(visible){
            document.getElementById("btn-back").style.display = "none";
        }
        else{
            document.getElementById("btn-back").style.display = "block";
        }
        
        document.getElementById("show-troncal").style.display = "none";
        document.getElementById("show-stages").style.display = "inline-block";

        document.getElementById("title-troncal").innerText = search.Stages[parts[1]].name;
        document.getElementById("img-stage").src = search.Stages[parts[1]].url;

        var list1 = document.getElementById("accordion1");
        clearElement(list1);

        var list2 = document.getElementById("accordion2");
        clearElement(list2);
        
        for(var i = 0; i < search.Stages[parts[1]].Services.length; i++){
            
            var titulo = document.createElement("button");
            titulo.setAttribute("id", i);
            titulo.classList.add ("accordion");
            
            titulo.innerText = search.Stages[parts[1]].Services[i].Id;
            var div = document.createElement("div");
            div.setAttribute("id", 100+i);

            titulo.addEventListener("click", function(){
                clickTitle(this);
            });

            div.classList.add("panel");
            var vagon = document.createElement("h4");
            vagon.innerText = "vagon: "+search.Stages[parts[1]].Services[i].Vagon;
            var ul= document.createElement("ul");

            for (var j=0; j < search.Stages[parts[1]].Services[i].Horario.length; j++){
                var li = document.createElement("li");
                li.innerText = search.Stages[parts[1]].Services[i].Horario[j];
                ul.appendChild(li);
            }
            
            div.appendChild(vagon);
            div.appendChild(ul);

            if(i < search.Stages[parts[1]].Services.length / 2){
                list1.appendChild(titulo);
                list1.appendChild(div);
            }
            else{
                list2.appendChild(titulo);
                list2.appendChild(div);
            }
        }
    }
    else{
        console.log("Search Undefined:"+parts[0]);
    }
}

function clickTitle(e){
    var x = document.getElementsByClassName("panel");
    for(var i = 0; i < x.length; i++){
        x[i].style.display = "none";
    }
    console.log(e.id);
    document.getElementById(100 + parseInt(e.id)).style.display = "block";


    console.log(e);
}

function search(){
    var opc = document.getElementsByName("type-search");
    var val = document.getElementById("parameter-search").value;
    val = val.toLowerCase();
    val = val.replace(" ", "_");
    console.log( trunk.get(1));
    if(opc[0].checked){

        for(var i = 1; i <= trunk.data.length; i++){
            var auxStages =  trunk.get(i).Stages;
            for (var j = 0; j <= auxStages.length; j++) {
                var auxFinal=auxStages[j];
                if(auxFinal){
                    var auxiliarName=auxFinal.name.replace(" ", "_").toLowerCase().trim();
                    if (auxiliarName === val) {
                        document.getElementById("aux-pos").value = trunk.get(i).Name + ":" + j;
                        showStages(true);
                        break;
                    }
                }
                
            }
        }
    }
    else if(opc[1].checked){
        var aux = trunk.where(function(a){ return a.Name.toLowerCase() === val })[0];
        if(aux !== undefined){
            showTroncal(aux.Name);
        }
        val = "";
    }
}

function clearElement(elemet){
    while (elemet.firstChild) {
        elemet.removeChild(elemet.firstChild);
    }
}

function showTrunckAgain(){
    var parts = (document.getElementById("aux-pos").value).split(":");
    var search = trunk.find({Name: parts[0]})[0];

    document.getElementById("btn-back").style.display = "none";
    document.getElementById("show-troncal").style.display = "block";
    document.getElementById("show-stages").style.display = "none";

    var parts = (document.getElementById("aux-pos").value).split(":");
    if(parts[0]){
        document.getElementById("title-troncal").innerText = search.Stages[parts[1]].name;
    }
}

function load() {

    $("#parameter-search").keypress(function (e) {
        if (e.which == 13) {
            search();
        }
    });
    
}

//función para rotar el banner
function alternar_banner(){
    document.getElementById("banner").src = array_imagen[contador].src;
    document.getElementById("title-news").innerText = array_names[contador];
    document.getElementById("link-img").href = array_url[contador];
    contador++;
    contador = contador % array_imagen.length;
    setTimeout("alternar_banner()",2000);
}

