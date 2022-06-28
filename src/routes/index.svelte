<script context="module">
	export const prerender = true;
	import { modul } from '../stores/stores.js';
	import { captions } from '$lib/data-live.js';

	function init(el, index){
		if(index === 0) {
			el.focus();
		}
	}
</script>

<svelte:head>
	<link rel="icon" href="/favicon.png">
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no">
	<title>Wörterpass</title>
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="robots" content="index,follow">
	<meta name="description" content="Eine Lern-App für Rechtschreibung im Deutschunterricht mit Wörterpässen.">
	<meta property="og:image" content="/assets/img/modul2.svg">
	<meta property="og:title" content="Wörterpass">
	<meta property="og:description" content="Eine Lern-App für Rechtschreibung im Deutschunterricht mit Wörterpässen.">
	<meta property="og:url" content="https://woerterpass.de">
	<link rel="canonical" href="https://woerterpass.de">
</svelte:head>

<section class="row {$modul < 1 ? '' : 'mt-6'}">
	<div class="form col col-12 col-lg-6 m-auto py-4 px-3">

		{#if $modul < 1}
			<h2 class="mb-3">Wähle ein Modul</h2>
			<div class="input__container input__container--modul">
				{#each captions as module, i}
					<button aria-label="Bearbeite Modul {i+1}" use:init={i} class="btn btn-primary modul-btn moduleBg-{i+1}" on:click={() => modul.set(i+1)}>
						<span>{i+1}</span>
						<img src={`assets/img/modul${i+1}-w.svg`} alt="Modul {i+1}">
					</button>
				{/each}
			</div>
		{/if}
		
		{#if $modul >= 1}
			<h2>Wähle eine Stufe aus Modul {$modul}</h2>
			
			<div class="input__container my-5">
				{#each Object.keys(captions[$modul - 1]) as stage, i}
					{#if $modul === 2}
						<div>
							<a sveltekit:prefetch title="Vokal und Länge üben" href="{$modul}{stage.toUpperCase()}" aria-label="Bearbeite Stufe {stage.toUpperCase()}" class="btn btn-primary level-btn-2 moduleBg-{$modul}">
								<div>{stage.toUpperCase()}</div><div class="caption">({captions[$modul-1][stage]})</div>
							</a>
							<a sveltekit:prefetch title="nur Vokal üben" href="{$modul}V{stage.toUpperCase()}" aria-label="Bearbeite Stufe {stage.toUpperCase()}" class="btn btn-primary level-btn-2-s moduleBg-{$modul}">
								<img class="" src="assets/img/modul2v-w.svg" alt="mainVokal">
							</a>
							<a sveltekit:prefetch title="nur Länge üben" href="{$modul}L{stage.toUpperCase()}" aria-label="Bearbeite Stufe {stage.toUpperCase()}" class="btn btn-primary level-btn-2-s moduleBg-{$modul}">
								<img class="" src="assets/img/modul2l-w.svg" alt="mainLaenge">
							</a>
						</div>	
					{:else}
						<a sveltekit:prefetch href="{$modul}{stage.toUpperCase()}" use:init={i} aria-label="Bearbeite Stufe {stage.toUpperCase()}" class="btn btn-primary level-btn moduleBg-{$modul}">
							<div>{stage.toUpperCase()}</div><div class="caption">({captions[$modul-1][stage]})</div>
						</a>
					{/if}
				{/each}
			</div>
			
			<button aria-label="Modulauswahl" class="btn btn-secondary" on:click={() => modul.set(0)}>
				Anderes Modul auswählen
			</button>
		{/if}
	</div>
</section>

<style>
 .input__container--modul {
	 display: flex;
	 flex-wrap: wrap;
	 align-content: space-between;
	 justify-content: space-between;
 }
 .input__container .modul-btn {
	width: 30%;
	padding: 1rem;
	aspect-ratio: 1 / 1;
}
.input__container .modul-btn:not(:last-child) {
	 margin-bottom: 1.3rem;
 }
 .input__container .modul-btn img {
	max-height: 100%;
	width: auto;
	max-width: 100%;
	position: relative;
	z-index: 1;
 }
 .modul-btn {
	 position: relative;
 }
 .modul-btn:after,
 .level-btn:after {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    background: black;
    top: 0;
    left: 0;
	border-radius: .25rem;
    z-index: 0;
    opacity: 0;
	transition: opacity .2s;
 }
 .modul-btn:hover:after,
 .level-btn:hover:after {
    opacity: .1;
	transition: opacity .2s;
 }
 .modul-btn span {
	 position: absolute;
	 z-index: 1;
	 font-size: 1rem;
	 font-weight: 600;
	 top: 10px;
	 left: 10px;
	 width: 25px;
	 height: 25px;
	 line-height: 25px;
	 border-radius: 50%;
	 background: rgba(255,255,255,.6);
	 color: rgba(0,0,0,.75);
	 display: flex;
	 align-items: center;
	 justify-content: center;
	 text-shadow: 0 0 5px rgba(255,255,255,.5);
 }
 @media (max-width:576px){
	.modul-btn span {
		top: 2px !important;
		left: 2px !important;
	}
 }
 [class*="level-btn"] {
	 font-size: 1.2rem;
	 font-weight: 700;
	 padding: .5rem 1rem;
	 margin-bottom: .5rem;
	 display: flex !important;
	 align-items: center;
	 text-align: left;
	 width: 90%;
	 position: relative;
	 height: 46px;
 }
 [class*="level-btn-2"] {
	width: 70%;
	display: inline-flex !important;
	margin-left: 0;
	margin-right: 0;
	border-radius: .25rem 0 0 .25rem;
 }
 .level-btn-2-s {
	width: 10%;
	border-radius: 0;
	padding: 0;
	height: 46px;
 }
 .level-btn-2-s:last-child {
	border-radius: 0 .25rem .25rem 0;
 }
 @media (max-width:576px){
	[class~="level-btn"] {
		width: 100% !important;
	}
 }
 .caption {
	 margin-left: .75rem;
	 font-size: .8rem;
	 font-weight: 400;
	 color: rgba(255,255,255,.8)
 }
</style>
