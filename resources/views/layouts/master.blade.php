<!DOCTYPE html>
<html lang="en">
<head>
    <title>Plug App</title>
    <link href="{{ mix("css/app.css") }}" rel="stylesheet"/>
    <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
    <script src="{{ mix("js/app.js") }}" defer></script>
    <meta name="csrf-token" content="{{ csrf_token() }}">

</head>
<body class="font-sans bg-lightgrey">
    @yield('content')
</body>
</html>
