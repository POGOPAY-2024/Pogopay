<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administrator Dashboard</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="{{ asset('css/custom.css') }}" rel="stylesheet">
    <style>
        body {
            background-color: #f8f9fa;
            display: flex;
        }

        .table th, .table td {
            vertical-align: middle;
        }

        .icon-sm {
            font-size: 0.875rem; /* Taille des icônes réduite */
        }

        .modal-body {
            font-size: 1rem;
        }

        .pagination {
            justify-content: center; /* Centrer la pagination */
        }

        .pagination .page-item .page-link {
            color: #343a40;
        }

        .pagination .page-item.active .page-link {
            background-color: #343a40;
            border-color: #343a40;
        }

        .btn-sm {
            padding: 0.25rem 0.5rem;
            font-size: 0.875rem;
            line-height: 1.5;
            border-radius: 0.2rem;
        }

        .page-link .fas {
            font-size: 0.875rem; /* Adjust the size of Font Awesome icons in pagination */
            overflow: hidden;
            vertical-align: middle;
        }

        .card {
            margin-bottom: 20px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            border: none;
        }

        .card-header {
            background-color: #343a40;
            color: #fff;
            font-weight: bold;
        }

        .card-body {
            background-color: #fff;
        }

        .table thead {
            background-color: #343a40;
            color: #fff;
        }

        .btn-primary {
            background-color: #007bff;
            border-color: #007bff;
        }

        .btn-primary:hover {
            background-color: #0056b3;
            border-color: #0056b3;
        }

        .btn-danger {
            background-color: #dc3545;
            border-color: #dc3545;
        }

        .btn-danger:hover {
            background-color: #c82333;
            border-color: #bd2130;
        }

        .sidebar {
            height: 100vh;
            width: 250px;
            position: fixed;
            top: 0;
            left: 0;
            background-color: #343a40;
            padding-top: 20px;
            color: white;
        }

        .logo {
            height: 40px;
            width: auto;
            display: block;
            margin: 0 auto 20px auto;
        }

        .sidebar a {
            padding: 10px 15px;
            text-decoration: none;
            font-size: 18px;
            color: white;
            display: block;
        }

        .sidebar a:hover {
            background-color: #575757;
        }

        .content {
            margin-left: 250px;
            flex: 1;
        }

        .menu-icon {
            margin-right: 10px;
        }

        .navbar {
            background-color: #343a40;
            color: white;
            margin-left: 0px;
        }

        .navbar-brand {
        }

        .navbar .btn {
            color: white;
        }

        .navbar .btn:hover {
            color: #ccc;
        }

        .navbar .navbar-brand img {
            max-height: 40px;
        }
        .h3{
            margin-left: 250px;
        }
        .navbar .navbar-toggler {
            border-color: rgba(255, 255, 255, 0.1);
        }

        .navbar .navbar-toggler-icon {
            color: white;
        }
        .table-responsive {
    margin-top: 20px;
}

.table thead th {
    text-align: center;
    background-color: #343a40;
    color: white;
}

.table tbody td {
    vertical-align: middle;
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
}

.btn-primary:hover {
    background-color: #0056b3;
    border-color: #004085;
}

.modal-content {
    border-radius: 10px;
    padding: 20px;
}

.modal-header {
    background-color: #343a40;
    color: white;
    border-bottom: none;
}

.modal-body p {
    margin-bottom: 10px;
}

.icon-sm {
    margin-right: 5px;
}

    </style>
</head>

<body>
    <!-- Sidebar -->
    <aside class="sidebar">
        <img src="https://pogo.vercel.app/pogo.png" class="logo" alt="Logo">
        <ul class="nav flex-column">
            <li class="nav-item">
                <a href="dashboard" class="menu-link">
                    <i class="menu-icon fas fa-home"></i>
                    <div>Dashboard</div>
                </a>
            </li>
            <li class="nav-item">
                <a href="users" class="menu-link">
                    <i class="menu-icon fas fa-users"></i>
                    <div>Users</div>
                </a>
            </li>
        </ul>
    </aside>

    <!-- Main Content -->
    <div class="content">
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-dark">
              <h3 class="h3">Administrator Dashboard </h3>  
           
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <form class="d-flex" action="{{ route('logout') }}" method="POST">
                            @csrf
                            <button class="btn btn-outline-light" type="submit">
                                <i class="fas fa-sign-out-alt"></i> Logout
                            </button>
                        </form>
                    </li>
                </ul>
            </div>
        </nav>

        <div class="container mt-4">
            @yield('content')
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>

</html>
