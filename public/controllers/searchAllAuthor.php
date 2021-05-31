<?php //Metodo ok no tocar
    //incluir conexión a la base de datos 
    include "../../config/conexionBD.php"; 
    $sql = "SELECT * FROM author"; 
    //cambiar la consulta para puede buscar por ocurrencias de letras 
    $result = $conn->query($sql); 
    echo " <table id='tableDataAuthor' style='width:100%;'> 
        <tr> 
            <th></th> 
            <th>ID</th> 
            <th>Author</th> 
            <th>Nacionalidad</th> 
        </tr>"; 
        if ($result->num_rows > 0) { 
            while($row = $result->fetch_assoc()) { 
                $authorCode = $row['author_code'] ;
                $authorName = $row['author_name'];
                $authorNationality = $row['author_nationality'];
                $values = $authorCode."/".$authorName."/".$authorNationality;
                echo "<tr>"; 
                    echo " <td><input type='radio' id='dataAuthor' name='dataAuthor' value='".$authorCode."' ></td>"; 
                    echo " <td >" . $authorCode ."</td>"; 
                    echo " <td >" . $authorName . "</td>"; 
                    echo " <td >" . $authorNationality . "</td>"; 
                echo "</tr>";        
            } 
        } else { 
            echo "<tr>"; 
                echo " <td colspan='7'> No existen coincidencias en el sistema </td>"; 
            echo "</tr>"; } 
    echo "</table>";
    $conn->close(); 
?>