<?php

// initialize Twig
$app->register(new Silex\Provider\TwigServiceProvider(), [
    'twig.path' => __DIR__.'/templates',
]);