<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <style>
        body, html {
            height: 100%;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background: url('https://img.freepik.com/vecteurs-libre/illustration-concept-abstrait-transfert-argent-transfert-par-carte-credit-methode-paiement-numerique-service-remboursement-ligne-transaction-bancaire-electronique-envoi-argent-dans-monde-entier_335657-926.jpg') no-repeat center center;
            background-size: contain;
            background-attachment: fixed;
        }
        .login-container {
            background: rgba(255, 255, 255, 0.8);
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
            transform: perspective(1000px) rotateY(15deg);
            transition: transform 0.5s;
        }
        .login-container:hover {
            transform: perspective(1000px) rotateY(0deg);
        }
        .login-title {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 20px;
        }
        .form-control {
            border-radius: 0;
            box-shadow: none;
            border-color: #ced4da;
        }
        .form-control:focus {
            border-color: #495057;
            box-shadow: 0 0 0 0.2rem rgba(0, 0, 0, 0.1);
        }
        .btn-primary {
            background-color: #007bff;
            border-color: #007bff;
            border-radius: 0;
        }
        .btn-primary:hover {
            background-color: #0056b3;
            border-color: #004085;
        }
        .login-footer {
            text-align: center;
            margin-top: 20px;
        }
        .login-footer a {
            color: #007bff;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="login-title">
            <i class="fas fa-user-shield"></i> Admin Login
        </div>
        <form id="loginForm">
            <div class="form-group">
                <label for="email">Email address</label>
                <input type="email" class="form-control" id="email" name="email" placeholder="Enter email" required autofocus>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" name="password" placeholder="Password" required>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Login</button>
        </form>
    </div>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            document.getElementById('loginForm').addEventListener('submit', function (e) {
                e.preventDefault(); 
                window.location.href = '/dashboard'; 
            });
        });
    </script>
</body>
</html>
