<div id="spinner">
    <div id="half">
        <div class="border" id="clipped">
        </div>
    </div>
    <div class="border" id="fixed">
    </div>
</div>

<style>
    #spinner {
        position: relative;
        /* margin: 20px auto; */
        width: 20px;
        height: 20px;
        margin-right: 10px;
        display: inline-block;
    }

    #half {
        width: 50%;
        height: 100%;
        right: 0px;
        position: absolute;
        overflow: hidden;
        transform-origin: left center;
        animation: cliprotate 3s steps(2) infinite;
        -webkit-animation: cliprotate 3s steps(2) infinite;
    }

    .border {
        box-sizing: border-box;
        height: 100%;
        right: 0px;
        position: absolute;
        border: solid 3px transparent;
        border-top-color: #007bff;
        border-left-color: #007bff;
        border-radius: 50%;
    }

    #clipped {
        width: 200%;
        animation: rotate 1.5s linear infinite;
        -webkit-animation: rotate 1.5s linear infinite;
    }

    #fixed {
        width: 100%;
        transform: rotate(135deg);  
        animation: showfixed 3s steps(2) infinite;
        -webkit-animation: showfixed 3s linear infinite;
    }

    @-webkit-keyframes cliprotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes cliprotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }


    @-webkit-keyframes rotate {
        0% {
            transform: rotate(-45deg);
        }
        100% {
            transform: rotate(135deg);
        }
    }

    @keyframes rotate {
        0% {
            transform: rotate(-45deg);
        }
        100% {
            transform: rotate(135deg);
        }
    }

    @-webkit-keyframes showfixed {
        0% {
            opacity: 0;
        }
        49.9% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 1;
        }
    }
</style>