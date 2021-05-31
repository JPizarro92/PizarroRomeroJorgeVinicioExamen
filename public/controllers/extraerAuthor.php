<?php 
    //incluir conexión a la base de datos 
    include "../../config/conexionBD.php";
    $idAuthor = $_GET['idAuthor'];
    $sql = "SELECT * FROM author WHERE author_code='$idAuthor'"; 
    //cambiar la consulta para puede buscar por ocurrencias de letras 
    $result = $conn->query($sql); 
    if ($result->num_rows > 0){ 
        $row = $result->fetch_assoc(); 
        $autor_code = $row["author_code"];
        $author_name =  $row["author_name"];
        $author_nationality = $row['author_nationality'];
        
        echo "<input type='text' name='authorChapter' id='authorChapter' width: 100%; readonly value=' ".$autor_code." | ".$author_name." | ".$author_nationality."'>";
        //echo "<span>".$autor_code." | ".$author_name." | ".$author_nationality."</span>";
    }else{
        echo "No se ha podido encontrar Autor"; 
    } 
    $conn->close(); 
?>