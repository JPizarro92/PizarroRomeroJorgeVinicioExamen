<!DOCTYPE html>
<html lang="es-ES">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro de Libro</title>
</head>
<body>
    
    <?php
        //Conexión a la base de datos
        include "../../config/conexionBD.php";
        //Extracciónde datos

        $libroJSON = $_GET['libroJSON'];

        echo "<script>console.log('Libro PHP:".$libroJSON."');</script>";

        //$nameBook = isset($_POST['nameBook'])?trim($_POST['nameBook']):null;
        //$codeISBN = isset($_POST['ISBN'])?trim($_POST['ISBN']):null;
        //$numPages = isset($_POST['numPages'])?trim($_POST['numPages']):null;

        //echo("<script>console.log('Nombre Libro: ".$nameBook." Código ISBN: ".$codeISBN." Número de páginas: ".$numPages."');</script>");

        $sql = "INSERT INTO book VALUES (0, '$nameBook', '$codeISBN', '$numPages')";
        $conn->query($sql);
        
        /*if($conn==TRUE){
            $idBook =  $conn->insert_id;
            echo "<script>console.log('ID registrado:".$conn->insert_id."');</script>";
            try{
                $table = $_POST['chapters'];
                //$table->fetch_assoc();
                echo $table->fetch_assoc();
            }catch(Exception $e){
                echo("<script>console.log('Vamos valiendo cairo');</script>");
            }
        }*/
        

    ?>


</body>
</html>

