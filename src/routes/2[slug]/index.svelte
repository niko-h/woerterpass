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
	modul.set(2); // hard-coded modul
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
		task.message = 'Hier gibt es nichts zu sehen.';
		task.steps = [
			{
				silbenboegen: false
			},
			{
				laenge: false,
				vokale: false
			}
		];
		task.state = 'undefined';
		task.step = 0;
	}
	resetTask();
	
	let inputs = {};
	function resetInputs() {
		inputs.silbenboegen = [];
		inputs.laenge = [];
		inputs.vokale = [];
	}
	resetInputs();

	stats.set([
		{
			handle: 'silbenboegen',			
			score: 0,
			progress: 0
		},
		{
			handle: 'vokale',			
			score: 0,
			progress: 0
		},
		{
			handle: 'laenge',			
			score: 0,
			progress: 0
		}
	]);

	function addInput(key, input) {
		if(inputs[key].length < 5) inputs[key] = inputs[key].concat(input);
		if(task.state === 'again') task.state = 'edited';
	}

	function popInput(key) {
		inputs[key].pop();
		inputs[key] = inputs[key];
		if(task.state === 'again') task.state = 'edited';
	}

	function checkInput(key) {
		if(task.step === 1) checkSingleInputs(key);
		if(JSON.stringify(inputs[key]).toLowerCase().replace(/[\s'"]+/g, "") === JSON.stringify(currentWord[key]).toLowerCase().replace(/[\s'"]+/g, "")) {
			return true;
		}
		return false;
	}

	let singleChecks = {};
	function checkSingleInputs(key) {
		let checks = [];
		inputs[key].forEach((input, index) => {
			if(JSON.stringify(input).toLowerCase().replace(/[\s'"]+/g, "") === JSON.stringify(currentWord[key][index]).toLowerCase().replace(/[\s'"]+/g, "")) {
				checks.push(true);
			} else {
				checks.push(false);
			}
		});
		singleChecks[key] = checks;
	}

	function validate() {
		for(const key in task.steps[task.step]) {
			let stat = $stats.find(stat => stat.handle === key);
			task.steps[task.step][key] = checkInput(key);
			if(task.steps[task.step][key]) {
				stat.score += 1;
			}
			stat.progress += 1;
		};

		if(Object.values(task.steps[task.step]).every(item => item)) {
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
		} else if(task.steps.length > task.step+1) {
			task.message = 'Noch nicht richtig';
			task.sub = 'Beim nächsten mal.';
			task.state = 'next';
		} else {
			task.message = 'Nicht ganz richtig';
			task.sub = 'Viel Erfolg beim nächsten Wort!';
			task.state = 'next';
		}
		showModal.set(true);
		showLaengeHilfe.set(false);
	}

	function nextStep() {
		if(task.steps.length === task.step+1 && (task.state === 'correct' || task.state === 'next')) {
			if(task.steps.every(step => Object.values(step).every(item => item))) {
				wortScore.set($wortScore + 1);
			}
			resetTask();
			resetInputs();
			getCurrentWord();
			wortProgress.set($wortProgress + 1);
		} else if(task.state === 'correct' || task.state === 'next') {
			task.state = 'undefined';
			task.step += 1;
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

{#if task.step === 0 && ((!$showModal || $showStats) || (!checkInput('silbenboegen') && (task.state === 'again' || task.state === 'edited'))) }
	<section class="row mt-6" transition:fade>
		<div class="form col col-12 col-lg-6 m-auto py-4 px-3">
			<div class="word row">
				<div class="col text-align-center">
					<button title="Wort anhören" on:click={() => playAudio('assets/words/audio/', currentWord.wort)} class="a word__img inline-block">
						<img src={`assets/words/img/${currentWord.wort.toLowerCase()}.jpg`} alt="{currentWord.wort}">
						<div class="icon-headphones"></div>
					</button>
				</div>
			</div>

			<div class="input__container my-3">
				<h3 class="ml-3 mb-0">Silbenbögen</h3>
				<div class="row">
					<div class="col col-11 col-lg-8 pr-0">
						<button class="btn btn-secondary btn-icon-round icon-eraser eraseBtn" title="Silbenbogen löschen" on:click={() => (popInput('silbenboegen'))}></button>
						<div class="input__canvas p-2 my-2 {task.state === 'again' ? 'alert' : ''}">
							{#each inputs['silbenboegen'] as bogen}
								<i class={`icon-large icon-bogen-${bogen}`} />
							{/each}
						</div>
					</div>
					<div class="col v-center">
						<button class="btn btn-lg btn-light v-center mr-1" title="betonte (laute) Silbe" disabled={inputs['silbenboegen'].length >=5 ? 'disabled' : ''} on:click={() => (addInput('silbenboegen', 'g'))}><i class="icon-bogen-g icon-large"></i> </button>
						<button class="btn btn-lg btn-light v-center" title="unbetonte (leise) Silbe" disabled={inputs['silbenboegen'].length >=5 ? 'disabled' : ''} on:click={() => (addInput('silbenboegen', 'k'))}><i class="icon-bogen-k icon-large"></i> </button>
					</div>
				</div>
			</div>

			<div class="row mt-5 mb-1">
				<div class="col">
					<button class="btn btn-primary float-right" disabled={inputs['silbenboegen'].length < 1} on:click={() => validate()} title="Kontrollieren"><i class="icon-arrow-right icon-large"></i></button>
				</div>
			</div>
		</div>
	</section>
{/if}

{#if task.step === 1 && ((!$showModal || $showStats) || (task.state === 'again' || task.state === 'edited'))}
	<section class="row mt-6" transition:fade>
		<div class="form col col-12 col-lg-6 m-auto py-4 px-3">
			<div class="word row">
				<div class="col text-align-center">
					<button title="Wort anhören" on:click={() => playAudio('assets/words/audio/', currentWord.wort)} class="a word__img inline-block">
						<img src={`assets/words/img/${currentWord.wort.toLowerCase()}.jpg`} alt="word">
						<div class="icon-headphones"></div>
					</button>
				</div>
			</div>

			<div class="input__container my-3">
				<h3 class="ml-3 mb-0">Vokale und Vokallänge</h3>
				<div class="row">
					<div class="col col-11 col-lg-8 pr-0">
						<button class="btn btn-secondary btn-icon-round icon-eraser eraseBtn" title="Länge löschen" on:click={() => (popInput('laenge'))}></button>
						<div class="input__canvas input__canvas--double p-2 my-2">
							<div class="vokale input__container">
								{#each currentWord.vokale as {}, i}
									<input type="text" class="vokaleInput {task.state === 'again' && !singleChecks['vokale'][i] ? 'alert' : ''}" bind:value={inputs['vokale'][i]} maxlength="2" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
								{/each}
							</div>
							<div class="laenge input__container">
								{#each currentWord.laenge as {}, i}
									<i class="icon-large icon-laenge-{inputs['laenge'][i] ?? 'empty' } {task.state === 'again' && !singleChecks['laenge'][i] ? 'color-alert' : ''}" />
								{/each}
							</div>
							<div class="boegen input__container">
								{#each currentWord.silbenboegen as bogen}
									<i class="icon-large icon-bogen-{bogen}" />
								{/each}
							</div>
						</div>
					</div>
					<div class="col v-center">
						<button class="btn btn-lg btn-light v-center mr-1" disabled={inputs['laenge'].length >= currentWord.laenge.length ? 'disabled' : ''} on:click={() => (addInput('laenge', 'l'))} title="langer Vokal (Selbstlaut, Silbenkönig)"><i class="icon-laenge-l icon-large"></i> </button>
						<button class="btn btn-lg btn-light v-center" disabled={inputs['laenge'].length >= currentWord.laenge.length ? 'disabled' : ''} on:click={() => (addInput('laenge', 'k'))} title="kurzer Vokal (Selbstlaut, Silbenkönig)"><i class="icon-laenge-k icon-large"></i> </button>
					</div>
				</div>
			</div>

			<div class="row mt-4 mb-1">
				<div class="col">
					<div class="helpBox">
						<span class="label icon-headphones" title="Wie klingt ein langes oder kurzes … ?"></span>
						<button class="btn btn-secondary" on:click={() => playAudio('../assets/help/laenge/', 'a')}><b>A</b></button>
						<button class="btn btn-secondary" on:click={() => playAudio('../assets/help/laenge/', 'e')}><b>E</b></button>
						<button class="btn btn-secondary" on:click={() => playAudio('../assets/help/laenge/', 'i')}><b>I</b></button>
						<button class="btn btn-secondary" on:click={() => playAudio('../assets/help/laenge/', 'o')}><b>O</b></button>
						<button class="btn btn-secondary" on:click={() => playAudio('../assets/help/laenge/', 'u')}><b>U</b></button>
						<button class="btn btn-secondary" on:click={() => playAudio('../assets/help/laenge/', 'ae')}><b>Ä</b></button>
						<button class="btn btn-secondary" on:click={() => playAudio('../assets/help/laenge/', 'oe')}><b>Ö</b></button>
						<button class="btn btn-secondary" on:click={() => playAudio('../assets/help/laenge/', 'ue')}><b>Ü</b></button>
					</div>
				</div>
			</div>

			<div class="row mt-5 mb-1">
				<div class="col">
					<button class="btn btn-primary float-right" disabled={inputs['laenge'].length < 1 && inputs['vokale'].length < 1} on:click={() => validate()} title="Kontrollieren"><i class="icon-arrow-right icon-large"></i></button>
				</div>
			</div>
		</div>
	</section>
{/if}

<Modal {...task} {nextStep} />

<style>
	.input__container i,
	.input__container input {
		width: 40px;
	}
	.input__container input {
		text-align: center;
		background: transparent;
		border: 0;
		box-shadow: inset 0 0 15px rgb(100,100,100,.15);
		border-radius: 3px;
		height: 50px;
		font-size: 1.5rem;
		margin-right: 5px;
	}
	.input__container input:focus,
	.input__container input:active {
		border: 2px solid rgba(150,150,150,.5);
	}
	.input__canvas > i {
		width: 34px;
		font-size: 50px;
	}
	.vokale {
		z-index: 1;
	}
	.boegen, 
	.laenge {
		position: absolute;
		z-index: 0;
		top: 25px;
	}
	.laenge i {
		bottom: 15px;
		margin-right: 5px;
	}
	i.icon-laenge-empty {
		width: 40px;
		display: inline-block;
		padding: 0 4px;
	}
	.boegen {
		top: 35px;
	}
	.boegen > i {
		color: #333;
		font-size: 64px;
		width: 45px;
		display: inline-block;
		position: relative;
	}
	.boegen > i:before {
		position: absolute;
		top: 0;
		left: -11px;
	}

	.helpBox {
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