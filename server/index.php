<?php

$routes = [];

route('/', function () {
    echo "Home Page";
});

route("/login", function () {
    $arrayURL = explode('/', $_SERVER['REQUEST_URI']);
    $email = $arrayURL[2];
    $password = $arrayURL[3];

    header('Access-Control-Allow-Origin:*');
    $conn = new mysqli('localhost', 'root', 'raidMySql1', 'gothic-shoes');
    if (!$conn) {
        die('Error connect to database!');
    }
    $query = "SELECT password FROM accounts WHERE email='$email'";
    $result = mysqli_query($conn, $query);
    $passwordDB = mysqli_fetch_assoc($result);

    if ($passwordDB) {
        if ($passwordDB['password'] == $password) {
            $allData = (object)[];
            $allDataQuery = "SELECT * FROM accounts WHERE email='$email'";
            $allData = mysqli_query($conn, $allDataQuery);
            $array = array();
            while ($row = mysqli_fetch_assoc($allData)) {
                $array[] = $row;
            }
            echo json_encode($array);
        }
    } else
        echo 'bad';

});

route('/signup', function () {
    $arrayURL = explode('/', $_SERVER['REQUEST_URI']);
    $full_name = $arrayURL[2];
    $password = $arrayURL[3];
    $email = $arrayURL[4];
    $phone = $arrayURL[5];
    $city = $arrayURL[6];
    $country = $arrayURL[7];
    $zip = $arrayURL[8];

    header('Access-Control-Allow-Origin:*');
    $conn = new mysqli('localhost', 'root', 'raidMySql1', 'gothic-shoes');
    if (!$conn) {
        die('Error connect to database!');
    }
    $query = "INSERT INTO accounts(id, full_name, email, password, phone, city, country, zip_code) VALUES (NULL,'$full_name','$email','$password','$phone','$city','$country','$zip')";
    $result = mysqli_query($conn, $query);
    if ($result) {
        echo json_encode((object)['200']);
    };
//    $res = mysqli_fetch_assoc($result);
//    echo $res;
});

route('/getitems', function () {
    $conn = new mysqli('localhost', 'root', 'raidMySql1', 'gothic-shoes');
    if (!$conn) {
        die('Error connect to database!');
    }
    header('Access-Control-Allow-Origin:*');
    $query = 'SELECT * FROM shoes';
    $result = mysqli_query($conn, $query);
    $array = [];
    $i = 0;
    while ($item = mysqli_fetch_assoc($result)) {
        $array[] = [];
        foreach ($item as $row) {
            if ($item['photo'] == $row)
                $array[$i][] = base64_encode($row);
            else
                $array[$i][] = $row;
        }
        $i++;
    }
    echo json_encode($array);
});
route('/getshoes', function () {
    $arrayURL = explode('/', $_SERVER['REQUEST_URI']);
    $shoes = $arrayURL[2];
    $shoes = strtoupper(str_replace('%20', ' ', $shoes));

    $conn = new mysqli('localhost', 'root', 'raidMySql1', 'gothic-shoes');
    if (!$conn) {
        die('Error connect to database!');
    }
    header('Access-Control-Allow-Origin:*');
    $query = "SELECT * FROM shoes WHERE name='$shoes'";
    $result = mysqli_query($conn, $query);
    $data = mysqli_fetch_assoc($result);
    $array = array();

    foreach ($data as $row) {
        if ($data['photo'] == $row)
            $array[] = base64_encode($row);
        else
            $array[] = $row;
    }
    echo json_encode($array);
});
route('/addtobag', function () {
    $arrayURL = explode('/', $_SERVER['REQUEST_URI']);
    $idShoes = $arrayURL[2];
    $size = $arrayURL[3];
    $idUser = $arrayURL[4];
    $conn = new mysqli('localhost', 'root', 'raidMySql1', 'gothic-shoes');
    if (!$conn) {
        die('Error connect to database!');
    }
    header('Access-Control-Allow-Origin:*');
    $query = "INSERT INTO bag(id, id_account, id_shoes, shoes_size) VALUES (NULL,'$idUser','$idShoes','$size')";
    $result = mysqli_query($conn, $query);
    print_r($result);
});

route('/getbag', function () {
    $arrayURL = explode('/', $_SERVER['REQUEST_URI']);
    $idUser = $arrayURL[2];
    $conn = new mysqli('localhost', 'root', 'raidMySql1', 'gothic-shoes');
    if (!$conn) {
        die('Error connect to database!');
    }
    header('Access-Control-Allow-Origin:*');
    $query = "SELECT B.id as id_order,S.id,S.name,B.shoes_size as size,S.cost,S.photo FROM shoes as S, bag as B, accounts as A WHERE A.id=B.id_account AND S.id=B.id_shoes AND A.id='$idUser'";
    $result = mysqli_query($conn, $query);
    $array = [];
    $i = 0;
    while ($item = mysqli_fetch_assoc($result)) {
        $array[] = [];
        foreach ($item as $row) {
            if ($item['photo'] == $row)
                $array[$i][] = base64_encode($row);
            else
                $array[$i][] = $row;
        }
        $i++;
    }
    echo json_encode($array);
});
route('/404', function () {
    echo "Page not found";
});

function route(string $path, callable $callback)
{
    global $routes;
    $routes[$path] = $callback;
}

run();

function run()
{
    global $routes;

    $uri = $_SERVER['REQUEST_URI'];
    $found = false;
    foreach ($routes as $path => $callback) {
        if (str_contains($path, 'login') && str_contains($uri, $path)) {
            $found = true;
            $callback();
            break;
        } else if (str_contains($path, 'signup') && str_contains($uri, $path)) {
            $found = true;
            $callback();
            break;
        } else if (str_contains($path, 'getshoes') && str_contains($uri, $path)) {
            $found = true;
            $callback();
            break;
        } else if (str_contains($path, 'addtobag') && str_contains($uri, $path)) {
            $found = true;
            $callback();
            break;
        } else if (str_contains($path, 'getbag') && str_contains($uri, $path)) {
            $found = true;
            $callback();
            break;
        }

        if ($path !== $uri) continue;
        $found = true;
        $callback();
    }

    if (!$found) {
        $notFoundCallback = $routes['/404'];
        $notFoundCallback();
    }
}

//header("Access-Control-Allow-Origin: *");
//header('Access-Control-Allow-Headers: Content-Type');
//$rest_json = file_get_contents("php://input");
//$_POST = json_decode($rest_json, true);
//
//if (empty($_POST['firstName']) && empty($_POST['email'])) {
//    echo json_encode(
//        [
//            "sent" => false,
//            "message" => 'Also Error'
//        ]
//    );
//    exit();
//}
//
//if ($_POST) {
//    //@important: Please change this before using
//    http_response_code(200);
//    $subject = 'Contact from: ' . $_POST['firstName'];
//    $from = $_POST['email'];
//    $message = $_POST['msg'];
//    //Actual sending email
//    $sendEmail = new Sender('vlad@gmail.com', 'sdfsdfse', 'its me', 'bibip');
//    $sendEmail->send();
//} else {
//    // tell the user about error
//    echo json_encode(
//        [
//            "sent" => false,
//            "message" => 'Error'
//        ]
//    );
//}