<script>
    import { showLaengeHilfe} from '../../stores/stores.js';

    let audio;
if(typeof Audio != "undefined") {
        audio = new Audio();
    }
    function playAudio(filename) {
        audio.pause();
        if (audio.canPlayType('audio/mpeg')) {
            audio.src = `../assets/help/laenge/mp3/${filename}.mp3`;
        }
        if (audio.canPlayType('audio/aac')) {
            audio.src = `../assets/help/laenge/aac/${filename}.m4a`;
        }
        if (audio.canPlayType('audio/ogg')) {
            audio.src = `../assets/help/laenge/ogg/${filename}.ogg`;
        }
        audio.play();
    }
    function stopAudio() {
        audio.pause();
    }
</script>

{#if $showLaengeHilfe }
    <div class="modal">
        <button class="btn btn-secondary icon-close" on:click={() => {showLaengeHilfe.set(false); stopAudio();}}></button>
        <h3>Hörhilfe zur Vokallänge</h3>
        <!-- <div class="row">
            <button class="btn btn-primary" on:click={() => playAudio('a')}><div class="icon-headphones"></div> <b>A</b></button>
            <button class="btn btn-primary" on:click={() => playAudio('e')}><div class="icon-headphones"></div> <b>E</b></button>
            <button class="btn btn-primary" on:click={() => playAudio('i')}><div class="icon-headphones"></div> <b>I</b></button>
            <button class="btn btn-primary" on:click={() => playAudio('o')}><div class="icon-headphones"></div> <b>O</b></button>
            <button class="btn btn-primary" on:click={() => playAudio('u')}><div class="icon-headphones"></div> <b>U</b></button>
            <button class="btn btn-primary" on:click={() => playAudio('ae')}><div class="icon-headphones"></div> <b>Ä</b></button>
            <button class="btn btn-primary" on:click={() => playAudio('oe')}><div class="icon-headphones"></div> <b>Ö</b></button>
            <button class="btn btn-primary" on:click={() => playAudio('ue')}><div class="icon-headphones"></div> <b>Ü</b></button>
        </div> -->
        <div class="helpBox">
            <span class="label icon-headphones" title="Wie klingt ein langes oder kurzes … ?"></span>
            <button class="btn btn-secondary" on:click={() => playAudio('a')}><b>A</b></button>
            <button class="btn btn-secondary" on:click={() => playAudio('e')}><b>E</b></button>
            <button class="btn btn-secondary" on:click={() => playAudio('i')}><b>I</b></button>
            <button class="btn btn-secondary" on:click={() => playAudio('o')}><b>O</b></button>
            <button class="btn btn-secondary" on:click={() => playAudio('u')}><b>U</b></button>
            <button class="btn btn-secondary" on:click={() => playAudio('ae')}><b>Ä</b></button>
            <button class="btn btn-secondary" on:click={() => playAudio('oe')}><b>Ö</b></button>
            <button class="btn btn-secondary" on:click={() => playAudio('ue')}><b>Ü</b></button>
        </div>
    </div>
{/if}

<style>
    h3 {
        font-size: 1.4rem;
        margin: -.5rem 0 0;
    }
    
    .modal {
		display: flex;
		position: fixed;
		background: #fff;
		flex-flow: column;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
		width: 90%;
		min-height: 100px;
        max-height: 90vh;
        overflow-y: auto;
		box-shadow: 0 0 10px rgba(0,0,0,.3);
		padding: 2rem;
		border-radius: 1rem;
		z-index: 2;
	}
    @media (min-width: 576px) {
		.modal {
			width: 400px;
		}
	}
    .row {
        display: flex;
        justify-content: center;
    }
    .row .btn {
        padding: .5rem .5rem .3rem;
        margin: .2rem;
    }
    .row .icon-headphones {
        font-size: 1rem;
        margin-bottom: .2rem;
        opacity: .7;
    }
    .modal .btn.icon-close {
        position: absolute;
        top: 0;
        right: 0;
        margin: 1rem;
    }
    .helpBox {
        margin-top: 2rem;
		border-radius: 5px;
		border: 2px solid #ccc;
		background: #f2f2ff;
		box-shadow: 0 0 0 2px #fff;
		padding: .5rem 0 0 3rem;
		position: relative;
	}
	.helpBox .btn {
		margin: 0 .15rem .5rem;
		min-width: 2rem;
	}
    .label {
		font-size: 1.5rem;
		line-height: 100%;
		color: #555;
		margin: 0;
		background: #e0e0e0;
		border-radius: 2px 0 0 2px;
		padding: 0.5rem;
		top: 0;
		left: 0;
		position: absolute;
		height: 100%;
		display: flex;
		align-items: center;
	}
</style>
