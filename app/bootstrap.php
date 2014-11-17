<?php
require_once __DIR__.'/../vendor/autoload.php';

$app = new Silex\Application();

$app['env'] = $_ENV['env'] ?: 'dev';

// initialize avaliable routes of modules
$path = realpath(__DIR__);

try {
    $modulesDir = new DirectoryIterator($path);

    // finding route file in modules
    foreach ($modulesDir as $dir) {
        if ($dir->isDir() && !$dir->isDot()) {
            $routesFile = $dir->getPathname() . '/routes.php';
            $initFile   = $dir->getPathname() . '/init.php';

            if (file_exists($routesFile)) {
                include $routesFile;
            }

            if (file_exists($initFile)) {
                include $initFile;
            }
        }
    }

    if ('test' == $app['env']) {
        return $app;
    }

    $app->run();

} catch (\Exception $e) {
    echo $e->getMessage();
}