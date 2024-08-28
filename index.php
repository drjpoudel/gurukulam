<?php
session_start();

// Handle URL shortening
if (isset($_POST['url'])) {
    $url = $_POST['url'];
    $shortUrlKey = bin2hex(random_bytes(5)); // Generate a unique key
    $_SESSION['urls'][$shortUrlKey] = $url;

    $shortUrl = "http://{$_SERVER['HTTP_HOST']}?key=" . $shortUrlKey;

    echo "<h1>Your shortened URL is:</h1>";
    echo "<a href='$shortUrl'>$shortUrl</a>";
    exit();
}

// Handle redirection
if (isset($_GET['key'])) {
    $key = $_GET['key'];

    if (isset($_SESSION['urls'][$key])) {
        $url = $_SESSION['urls'][$key];
        ?>
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="refresh" content="5;url=<?php echo htmlspecialchars($url); ?>">
            <title>Redirecting...</title>
        </head>
        <body>
            <p>You are being redirected to <a href="<?php echo htmlspecialchars($url); ?>"><?php echo htmlspecialchars($url); ?></a>. If you are not redirected automatically, <a href="<?php echo htmlspecialchars($url); ?>">click here</a>.</p>
        </body>
        </html>
        <?php
    } else {
        echo "Invalid URL.";
    }
    exit();
}
?>
