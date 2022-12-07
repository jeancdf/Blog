<?php

namespace App\Controller;

use App\Factory\PDOFactory;
use App\Manager\UserManager;
use App\Route\Route;
use DateTimeImmutable;

class SecurityController extends AbstractController
{
    #[Route('/login', name: "login", methods: ["GET","POST"])]
    public function login()
    {
        if (isset($_POST['password']) || isset($_POST['username'])){
            $formUsername = $_POST['username'];
            $formPwd = $_POST['password'];
            $userManager = new UserManager(new PDOFactory());
            $user = $userManager->getByUsername($formUsername);

            if (!$user) {
                header("Location: /?error=notfound");
                exit;
            }
            if ($user->passwordMatch($formPwd)) {
                $id = $user->getId();
                $_SESSION["admin"] = $user->getRoles();
                $_SESSION["id"] = $id;
                echo 'connected';
                $secretKey  = 'bGS6lzFqvvSQ8ALbOxatm7/Vk7mLQyzqaS34Q4oR1ew=';
                $issuedAt   = new DateTimeImmutable();
                $expire     = $issuedAt->modify('+6 minutes')->getTimestamp();      // Ajoute 60 secondes
                $serverName = "your.domain.name";
                $username   = "username";                                           // Récupéré à partir des données POST filtré

                $data = [
                    'iat'  => $issuedAt->getTimestamp(),         // Issued at:  : heure à laquelle le jeton a été généré
                    'iss'  => $serverName,                       // Émetteur
                    'nbf'  => $issuedAt->getTimestamp(),         // Pas avant..
                    'exp'  => $expire,                           // Expiration
                    'userName' => $username,                     // Nom d'utilisateur
                ];
                exit;
            }
        echo 'wrong';
        }
    }
    #[Route('/signup', name: "signup", methods: ["GET","POST"])]
    public function signup() {
        if (isset($_POST['password']) || isset($_POST['username'])){
            $formUsername = $_POST['username'];
            $formPwd = $_POST['password'];
            $userManager = new UserManager(new PDOFactory());
            $userManager->insertUser($formUsername,$formPwd);
            echo "account created!!!";
        }
    }
    #[Route('/logout', name: "logout", methods: ["GET","POST"])]
    public function logout() {
        session_start();
        unset($_SESSION['id']);
        session_destroy();
        header('Location: /login');
        exit(); 
    }
    #[Route('/users', name: "users", methods: ["GET","POST"])]
    public function users() {
        session_start();
        if($_SESSION && ($_SESSION['admin'] == 1) ) {
            $path = "views/users.php";
            require_once $path;
        }else {
            header('Location: /login');
            exit(); 
        }
    }
}
