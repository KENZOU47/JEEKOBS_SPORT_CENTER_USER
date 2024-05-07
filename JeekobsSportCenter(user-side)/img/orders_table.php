<?php
session_start();
include("connect.php");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body style="margin: 50px;">
    <h1>Employees</h1>
    <br>
    <table class="table" >
        <thead>
            <tr>
                <th>ID</th>
                <th>Order name</th>
                <th>price</th>
                <th>total price</th>
             
                
            </tr>
           

        </thead>
        <tbody>
                <?php
                $servername="localhost";
                $username="root";
                $password="";
                $dbname= "login";
                $conn = new mysqli($servername, $username, $password, $dbname);
                if ($conn->connect_error) {
                    die("Con failed". $conn->connect_error);
                }
                $sql = "SELECT *FROM orders";
                $rs=$conn->query($sql);
                if (!$rs) {
               die("wrong query". $conn->connect_error);
                }
                while ($row = $rs->fetch_assoc()) {
                    echo"<tr>
                    <td>".$row["id"]."</td>
                    <td>".$row["Order_name"]."</td>
                    <td>".$row["Order_price"]."</td>
                    <td>".$row["Total_price"]."</td>
                 
                    <td><a  href='UPDATE'>Update</a>
                    <a  href='DELETE'>DELETE</a></td>
        
               
                </tr>";
                
                }
                      
            ?>
     </tbody>
    </table>
    
</body>
</html>