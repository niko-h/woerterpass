<script>
	export const prerender = true;
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { modul, level, wortScore, wortProgress, showModal, showStats, stats } from '../../stores/stores.js';
	import * as data from '$lib/data-live.js';
	import Modal from '$lib/Modal/index.svelte';
	
	// on reload determine module and level from slug
	let slug;
	let audio;
	if(typeof Audio != "undefined") {
        audio = new Audio();
    }
	page.subscribe(value => slug = value.params.slug);
	modul.set(1); // hard-coded modul
	level.set(slug.toUpperCase());
	wortScore.set(0);
	wortProgress.set(0);
	
	let currentWord;
	function getWordList() {
		const stage = `${$modul}${$level}`.toLowerCase();
		const activeLists = data.modules[stage];
		const current_list_id = Math.floor(Math.random() * activeLists.length);
		return data[activeLists[current_list_id]];
	}
	function getCurrentWord() {
		const currentList = getWordList();
		const currentWordId = Math.floor(Math.random() * currentList.length)+1;
		currentWord = currentList.filter(w => w.id === currentWordId)[0];
		playAudio('assets/words/audio/', currentWord.wort);
	}
	getCurrentWord();
	
	let task = {};
	function resetTask() {
		task.message = '';
		task.feedback = false;
		task.state = 'undefined';
	}
	resetTask();
	
	let input = [];
	let resetInput = () => input = [];

	stats.set([
		{
			handle: 'silbenboegen',
			score: 0,
			progress: 0
		}
	]);

	function addInput(val) {
		if(input.length < 5) input = input.concat(val);
		if(task.state === 'again') task.state = 'edited';
	}

	function popInput() {
		input.pop();
		input = input;
		if(task.state === 'again') task.state = 'edited';
	}

	function checkInput() {
		if(JSON.stringify(input).replace(/[\s\[\]'"]+/g,'') === JSON.stringify(currentWord.silbenboegen).replace(/[\s\[\]'"]+/g,'')) {
			return true;
		}
		return false;
	}

	function validate() {
		let stat = $stats.find(stat => stat.handle === 'silbenboegen');
		task.feedback = checkInput();
		if(task.feedback) {
			stat.score += 1;
		}
		stat.progress += 1;
		
		if(task.feedback) {
			task.message = 'Richtig!';
			task.sub = 'Weiter so.';
			task.state = 'correct';
			setTimeout(() => {
                nextStep();
            }, 3000);
		} else if(task.state === 'undefined') {
			task.message = 'Ups';
			task.sub = 'Da war etwas falsch.';
			task.state = 'again';
		} else {
			task.message = 'Noch nicht richtig';
			task.sub = 'Viel Erfolg beim nächsten Wort!';
			task.state = 'next';
		}
		showModal.set(true);
	}

	function nextStep() {
		if(task.state === 'correct' || task.state === 'next') {
			if(task.feedback) wortScore.set($wortScore + 1);
			resetTask();
			resetInput();
			getCurrentWord();
			wortProgress.set($wortProgress + 1);
		}
		showModal.set(false);
		showStats.set(false);
	}

	function playAudio(path, filename) {
		if(typeof Audio != "undefined") {
			var playPromise = audio.play();
			if (playPromise !== undefined) {
				playPromise.catch(error => {}).then(() => {});
			}
			if (audio.canPlayType('audio/mpeg')) {
				audio.src = `${path}mp3/${filename}.mp3`;
			}
			if (audio.canPlayType('audio/aac')) {
				audio.src = `${path}aac/${filename}.m4a`;
			}
			if (audio.canPlayType('audio/ogg')) {
				audio.src = `${path}ogg/${filename}.ogg`;
			}
			audio.play();
		}
	}
</script>

{#if (!$showModal || $showStats) || (!checkInput() && (task.state === 'again' || task.state === 'edited')) }
	<section class="row mt-6" transition:fade>
		<div class="form col col-12 col-lg-6 m-auto py-4 px-3">
			<div class="word row">
				<div class="col text-align-center">
					<button title="Wort anhören" on:click={() => playAudio('assets/words/audio/', currentWord.wort)} class="a word__img inline-block">
						<img src={`assets/words/img/${currentWord.wort.toLowerCase()}.jpg`} alt={currentWord.wort}>
						<div class="icon-headphones"></div>
					</button>
				</div>
			</div>
			
			<div class="input__container my-3">
				<h3 class="ml-3 mb-0">Silbenbögen</h3>
				<div class="row">
					<div class="col col-11 col-lg-8 pr-0">
						<button class="btn btn-secondary btn-icon-round icon-eraser eraseBtn" title="Silbenbogen löschen" on:click={() => (popInput())}></button>
						<div class="input__canvas p-2 my-2 {task.state === 'again' ? 'alert' : ''}">
							{#each input as bogen}
								<i class={`icon-large icon-bogen-${bogen}`} />
							{/each}
						</div>
					</div>
					<div class="col v-center">
						<button class="btn btn-lg btn-light v-center mr-1" disabled={input.length >=5 ? 'disabled' : ''} on:click={() => (addInput('g'))} title="großer Bogen = betonte (laute) Silbe"><i class="icon-bogen-g icon-large"></i> </button>
						<button class="btn btn-lg btn-light v-center" disabled={input.length >=5 ? 'disabled' : ''} on:click={() => (addInput('k'))} title="kleiner Bogen = unbetonte (leise) Silbe"><i class="icon-bogen-k icon-large"></i> </button>
					</div>
				</div>
			</div>

			<div class="row mt-5 mb-1">
				<div class="col">
					<button class="btn btn-primary float-right" disabled={input.length < 1} on:click={() => validate()} title="Kontrollieren"><i class="icon-arrow-right icon-large"></i></button>
				</div>
			</div>
		</div>
	</section>
{/if}

<Modal {...task} {nextStep} />

<style>
	.input__canvas > i {
		width: 34px;
		font-size: 50px;
	}
</style>