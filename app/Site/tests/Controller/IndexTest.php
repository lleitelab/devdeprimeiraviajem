<?php

namespace Site\Controller;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Silex\WebTestCase;

class IndexTest extends WebTestCase
{
    public function createApplication()
    {
        $app = require $this->getApplicationDir() . '/bootstrap.php';

        $app->register(new \Silex\Provider\TwigServiceProvider(), array(
            'twig.path' => $this->getApplicationDir().'/Site/templates',
        ));

        return $app;
    }

    public function getApplicationDir()
    {
        return realpath(__DIR__.'/../../../');
    }

    public function test_shold_return_index_page()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/');

        $this->assertGreaterThan(
            0,
            $crawler->filter('body .container')->count()
        );

    }

}