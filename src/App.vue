<template>
    <div id="app">
        <header>
            <a href="http://zspczarne.pl/" class="header__link">Strona główna</a>
        </header>
        <router-view/>
        <footer>
            Strona stworzona przez Szymon Ciompała &copy
        </footer>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>
<style>
    @import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700');

    :root {
        font-size: 5px;
    }

    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    body {
        background-color: #f5f5f5;
        font-family: 'Roboto', sans-serif;
    }

    header {
        background-color: #ffffff;
        text-align: center;
    }

    .header__link {
        display: block;
        padding: 1em 0;
        text-decoration: none;
        color: #000;
        font-size: 5rem;
    }

    footer {
        background-color: #ffffff;
        text-align: center;
        font-size: 3rem;
        padding: 1em 0;
    }

    .spinner {
        width: 40em;
        height: 40em;
        margin: 5em auto;
        position: relative;
        border-radius: 50%;
    }

    .spinner::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        border: 2em solid #f5f5f5;
        border-top: 2em solid #ffffff;
        border-radius: 50%;
        transition: all 2s;
        animation-name: spinnerRotate;
        animation-duration: 2s;
        animation-iteration-count: infinite;
    }

    .back__link {
        display: block;
        text-decoration: none;
        color: #000000;
        font-size: 3rem;
        margin: 2em;
        transition: all 0.5s;
    }

    .back__link:hover {
        color: #cccccc;
    }

    @keyframes spinnerRotate {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }

    }

    @media screen and (min-width: 720px) {
        .home {
            display: flex;
            justify-content: space-around;
        }

        .card {
            width: 30%;
        }

        header {
            position: relative;
        }

        header:after, header:before {
            content: '';
            position: absolute;
            opacity: 0;
            left: 0;
            right: 0;
            margin: 0 auto;
            width: 10%;
            background-color: #000000;
            height: 1px;
            transition: all 0.5s;
        }

        header:after {
            bottom: 5px;
        }

        header:before {
            top: 5px;
        }

        header:hover::before {
            opacity: 1;
            top: 10px;
        }

        header:hover::after {
            opacity: 1;
            bottom: 10px;
        }

    }
</style>


