<?php

namespace App\Controller;

use App\Factory\PDOFactory;
use App\Manager\PostManager;
use App\Manager\UserManager;
use App\Route\Route;
use DateTimeImmutable;
use Firebase\JWT\Key;
use Firebase\JWT\JWT;

class PostController extends AbstractController
{
    #[Route('/posts', name: "homepage", methods: ["GET","POST"])]
    public function home()
    {   
        $manger = new PostManager(new PDOFactory());
        $posts = $manger->getAllPosts();
        var_dump(json_encode($posts));
    }

    #[Route('/createPost', name: "homepage", methods: ["GET","POST"])]
    public function showOne()
    {
        $tok = $_POST['token'];
        // var_dump($token);
        // if (! preg_match('/Bearers(S+)/', $tok, $matches)) {
        //     echo 'Token not found1';
        //     exit;
        // }
        // $jwt = $matches[1];
        // if (! $jwt) {
        //     // No Jwt
        //     echo 'tok not found2';
        //     exit;
        // }
        $secretKey  = 'bGS6lzFqvvSQ8ALbOxatm7/Vk7mLQyzqaS34Q4oR1ew=';
        $token = JWT::decode($tok, new Key($secretKey, 'HS512'));
        $now = new DateTimeImmutable();
        $serverName = "localhost";

        if ($token->iss !== $serverName ||
            $token->nbf > $now->getTimestamp() ||
            $token->exp < $now->getTimestamp())
        {
            echo 'Token not found3';
            exit;
        }
        
        $manger = new PostManager(new PDOFactory());
        $id = $token->ID;
        var_dump($id);
        $post = $manger->createPost($id,$_POST['content']);
        echo 'post created sucessfully';
        exit;
    }
}
