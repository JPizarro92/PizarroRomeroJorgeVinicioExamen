var btnOpenPopUp = document.getElementById('btn-open-popup'),
 overlay = document.getElementById('overlay'),
 popup = document.getElementById('popup'),
 btnClosePopUp = document.getElementById('btn-close-popup');

btnOpenPopUp.addEventListener('click', function(){
    overlay.classList.add('active');
    popup.classList.add('active');
});

btnClosePopUp.addEventListener('click', function(){
    overlay.classList.remove('active');
    popup.classList.remove('active');
});

function searchAllAuthors() { //Función para abrir los autores registrado
    
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari 
        xmlhttp = new XMLHttpRequest(); 
    } else { // code for IE6, IE5 
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); 
    } 

    xmlhttp.onreadystatechange = function(){ 
        if (this.readyState == 4 && this.status == 200) {  
            document.getElementById("informacion").innerHTML = this.responseText; 
        }
    }; 
    
    xmlhttp.open("GET","../controllers/searchAllAuthor.php",true); 
    xmlhttp.send(); 
    
    return false;
}

function addAuthorSelected(){  //Función para la agregar autor seleccionado
    var i 
   	for (i=0;i<document.authors.dataAuthor.length;i++){ 
      	if (document.authors.dataAuthor[i].checked) 
         	break; 
   	} 
    try{
        var idAuthor = document.authors.dataAuthor[i].value;
        //Ok select ID Author
        if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari 
            xmlhttp = new XMLHttpRequest(); 
        } else { // code for IE6, IE5 
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); 
        } 
    
        xmlhttp.onreadystatechange = function(){ 
            if (this.readyState == 4 && this.status == 200) {  
                document.getElementById("inforAuthorChapter").innerHTML = this.responseText; 
            }
        }; 
        //console.log('perro: ' + idAuthor);
        xmlhttp.open("GET","../controllers/extraerAuthor.php?idAuthor="+idAuthor,true); 
        xmlhttp.send(); 
        overlay.classList.remove('active');
        popup.classList.remove('active');
        return false;
    } catch(error){
        console.log('Sin eleccionar opción');
        return false;
    }
    
}

function buscarPorValor() {  //No hecho y no hacer nada
    var authorValue = document.getElementById("authorValue").value; 
    if (authorValue == "") { 
        document.getElementById("informacion").innerHTML = ""; 
    } else { 
        if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari 
            xmlhttp = new XMLHttpRequest(); 
        } else { // code for IE6, IE5 
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); 
        } 
        xmlhttp.onreadystatechange = function() { 
            if (this.readyState == 4 && this.status == 200) { 
                document.getElementById("informacion").innerHTML = this.responseText; 
            } 
        }; 
        xmlhttp.open("GET","php/buscar.php?authorValue="+authorValue,true); 
        xmlhttp.send(); 
    } return false;
}

function __(id){ //Función para seleccionar elementos por ID
    return document.getElementById(id);
}

const tbodyEl = document.querySelector("tbody"); //constante para agregar datos de los capitulos
function addChapterToTable(){ //Validación para agregar capitulos - OK (NO TOCAR)
    var bandera = true;
    var banderaM = true;
    var banderaF = true;
    
    let numberChapter = __("numberChapter");
    let titleChapter = __("titleChapter");
    let authorChapter;
    
    try{
        authorChapter = __("authorChapter");
        
        for(var i = 0; i < document.forms[1].elements.length; i++){ 
            var elemento = document.forms[1].elements[i] 
            if(elemento.value == '' && ( elemento.type == 'text' || elemento.type == 'number')){ 
                if(elemento.id == 'numberChapter'){ __('messageNumberChapter').innerHTML = '(*campo obligatorio)'}
                if(elemento.id == 'titleChapter'){ __('messageTitleChapter').innerHTML = '(*campo obligaatorio)'}
                if(elemento.id == 'authorChapter'){ __('messageAuthorChapter').innerHTML = '(*campo obligatorio)'}
                //elemento.style.border = '1px red solid'
                bandera = false
            }else{
                if(elemento.id == 'numberChapter'){ __('messageNumberChapter').innerHTML = ''}
                if(elemento.id == 'titleChapter'){ __('messageTitleChapter').innerHTML = ''}
                if(elemento.id == 'authorChapter'){ __('messageAuthorChapter').innerHTML = ''}
                //elemento.style.border = 'none'
            }
        }
        tbodyEl.innerHTML += `
            <tr>
                <td>${numberChapter.value}</td>
                <td>${titleChapter.value}</td>
                <td>${authorChapter.value}</td>      
            </tr>
        `;    
        numberChapter.value = "";
        titleChapter.value = "";
        authorChapter.value = "";
        __('messageChapters').innerHTML = '';
        return false;
    }catch(error){
        //No hacer nada
        __('messageAuthorChapter').innerHTML = '(*campo obligatorio)';
        return false;
    } 
}

function validationAllDataObligatories(){
    var bandera = true;
    var banderaTableRegister = true;
    var banderaF = true;
    
    for(var i = 0; i < document.forms[1].elements.length; i++){ 
        var elemento = document.forms[1].elements[i] 
        if(elemento.value == '' && ( elemento.type == 'text' || elemento.type == 'number')){ 
            //titulo libro
            if(elemento.id == 'nameBook'){ __('messageNameBook').innerHTML = '(*campo obligatorio)'}
            //código libro ISBN
            if(elemento.id == 'ISBN'){ __('messageISBN').innerHTML = '(*campo obligaatorio)'}
            //número de paginas de libro
            if(elemento.id == 'numPages'){ __('menssageNumPages').innerHTML = '(*campo obligatorio)'}
            
        }else{
            //titulo libro
            if(elemento.id == 'nameBook'){ __('messageNameBook').innerHTML = ''}
            //código libro ISBN
            if(elemento.id == 'ISBN'){ __('messageISBN').innerHTML = ''}
            //número de paginas de libro
            if(elemento.id == 'numPages'){ __('menssageNumPages').innerHTML = ''}
            
        }
    } 

    var cells = Array.prototype.slice.call(document.getElementById("chapters").getElementsByTagName("td"));
    if(cells.length>0){
        __('messageChapters').innerHTML = '';
        
        var array = new Array();
        
        for(var i in cells){
            array.push(cells[i].innerHTML);
        }

        var libroJSON = {
            'nameBook': __('nameBook').value,
            'codeISBN': __('ISBN').value,
            'numPages': __('numPages').value,
            'chapters': JSON.stringify(array)
        };
        //console.log(libroJSON.chapters);
        
        return false;


    }else{
        __('messageChapters').innerHTML = '(*No hay capitulos agregados)';
        console.log("No hay capitulos");
        banderaTableRegister = false;
    }

    return false;
}
