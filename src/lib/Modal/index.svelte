<script>
    import { showModal, showStats, stats } from '../../stores/stores.js';
    import Spinner from '$lib/Spinner/index.svelte';
    
    export let message = '';
    export let sub = '';
    export let state = undefined;
    export let kopierer = undefined;
    export let nextStep = undefined;
    export let naseCK = undefined;

    const tooltips = {
        "silbenboegen":     "1",
        "vokale":           "2",
        "mainVokal":        "2",
        "laenge":           "2",
        "mainLaenge":       "2",
        "fabrik":           "3",
        "nase":             "4",
        "kopierersilbe":    "5",
        "naseCK":           "5c",
        "wortart":          "7",
        "grossgeschrieben": "7"
    }
    let tooltip = 0;
</script>

{#if $showModal }
    <div class="modal">
        {#if $showStats}
            <button class="btn btn-secondary icon-close" on:click={() => {showStats.set(false);showModal.set(false);}}></button>
            <h2 class="mb-4">Auswertung</h2>
            {#each $stats as stat, index}
                <!-- Sonderfall für Module 5C und 5E -->
                {#if naseCK || stat.handle !== 'naseCK'}
                    <div class="row v-center pt-2 pb-2">
                        <div class="col col-5 h-center">
                            <img src={`assets/img/table/${stat.handle}${stat.handle === 'kopierersilbe' && kopierer === 2 ? '2' : ''}.svg`} alt="{stat.handle}">
                        </div>
                        <div class="col col-5">
                            <span class="score">{stat.score}</span> von <span class="progress">{stat.progress}</span> richtig
                        </div>
                        {#if stat.handle !== 'wort'}
                            <div class="col col-2 v-center">
                                <button class="btn btn-primary btn-icon-round icon-question" on:click={() => tooltip === stat.handle ? tooltip = 0 : tooltip = stat.handle} on:blur={() => tooltip = 0}></button>
                                <span class="tooltip {tooltip === stat.handle ? 'show' : ''}">Das wird in Modul {(tooltip === "kopierersilbe" && kopierer === 2) ? 6 : tooltips[stat.handle]} geübt.</span>
                            </div>
                        {/if}
                    </div>
                {/if}
            {/each}
        {:else }
            <center>
                <h1>{message}</h1>
                <h2>{sub}</h2>
            </center>
            <div class="bottom">
                {#if state === 'correct' } <Spinner />{/if}
                <button class="btn btn-primary" on:click={() => nextStep()}>{state === 'again' ? 'Nochmal versuchen': 'Weiter'}</button>
            </div>
        {/if}
    </div>
{/if}

<style>
    h2 {
        font-size: 1.6rem;
    }
    .score {
        font-weight: 500;
        font-size: 1.4rem;
    }
    .progress {
        font-weight: 500;
        font-size: 1.2rem;
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
		min-height: 300px;
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
    .modal img {
        width: unset;
        height: unset;
        max-height: 50px;
        max-width: 100%;
    }
    .modal .btn {
        position: absolute;
        right: 0;
    }
	.modal .bottom {
        position: absolute;
        width: 100%;
		bottom: 0;
        left: 0;
        text-align: right;
		padding: 2rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;
	}
    .modal .bottom .btn {
        position: relative;
    }
    .modal .btn.icon-close {
        top: 0;
        margin: 1rem;
    }
    .modal .row {
        min-height: calc(50px + 1rem);
    }
    .modal .row:not(:last-child) {
        border-bottom: 1px solid #ccc;
    }
    .modal .row:nth-child(even) {
        background-color: #fdfdfd;
    }
    @media (max-width:1200px){
        .modal .h1,h1{
            font-size:calc(1.375rem + 3.5vw)
        }
    }
</style>
