<?php 
    //incluir conexión a la base de datos 
    include "../../config/connectDB.php"; 
    $cedula = $_GET['cedula']; 
    //echo "Hola " . $cedula; 
    $sql = "SELECT * FROM usuario WHERE usu_rol='USER' and usu_delete = 'N' and usu_cedula='$cedula'"; 
    //cambiar la consulta para puede buscar por ocurrencias de letras 
    $result = $conn->query($sql); 
    
    
    if ($result->num_rows > 0){ 
        $row = $result->fetch_assoc(); 
        $usu_id =  $row["usu_id"];
        $usu_cedula =  $row["usu_cedula"];
        $usu_name = $row['usu_name'];
        $usu_surname = $row['usu_surname'];
        $usu_date_birth = $row['usu_date_birth'];
        $usu_email = $row['usu_email'];
        $usu_sex = $row['usu_sex'];
        $usu_address = $row['usu_address'];
        $phone_query = "SELECT * FROM phone WHERE phone.usu_id = ".(int)$row['usu_id'];
        
        $sql = "SELECT * FROM phone WHERE phone.usu_id = $usu_id"; 
        $result = $conn->query($sql); 

            $row = $result->fetch_assoc();
            $ph_number_a = $row['ph_number'];
            $ph_type_a = $row['ph_type'];
            $ph_type_a_rest = substr($ph_number_a,-9);
            $ope_id = $row['ope_id'];
            
            $row = $result->fetch_assoc();
            $ph_number_b = $row['ph_number'];

            $telefonoFijo = "<a href='tel:$ph_number_b' width: 80px; height: 30px; border-radius: 15px; color: blue; text-decoration: none;'>
            <i class='fas fa-phone-alt'></i>".$ph_number_b."</a>";
            //$ope_name = $row['ope_name'];

            echo "<div class='contenedor-usuario' style='width: 450px; height:350px'>
                            
                
                <h4 class='nombre-contacto'>".$usu_surname." ".$usu_name."<h4>
                <p>Ecuador <br>"
                .$usu_address." <br>
                </p>
            
                <a href='tel:+593$ph_type_a_rest' > 
                    
                    <i class='fas fa-mobile-alt'></i> $ph_number_a
                
                </a>
                 
                 
                    
                $telefonoFijo
                
                
                
            </div>";
            
            
        
    }else{ 
        echo "<tr>"; 
            echo " <td colspan='7'> No existen usuarios registradas en el sistema </td>"; 
            echo "</tr>"; 
    } 
    echo "</table>"; 
    
    $conn->close(); 
?>