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
	modul.set(4); // hard-coded modul
	level.set(slug.toUpperCase());
	wortScore.set(0);
	wortProgress.set(0);
	
	let currentWord;
	let imageFile;
	async function loadImg(path) {
		imageFile = await fetch(`${path}${currentWord.wort.toLowerCase()}.jpg`);
	}
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
		loadImg('assets/words/img/');
		playAudio('assets/words/audio/', currentWord.wort);
	}
	getCurrentWord();
	
	let task = {};
	function resetTask() {
		task.message = 'Hier gibt es nichts zu sehen.';
		task.steps = [
			{
				fabrik: false,
				mainLaenge: false,
				mainVokal: false,
				nase: false,
				wort: false
			}
		];
		task.state = 'undefined';
		task.step = 0;
		task.timeout = undefined;
	}
	resetTask();
	
	let inputs = {};
	function resetInputs() {
		inputs.fabrik = [];
		inputs.mainLaenge = [];
		inputs.mainVokal = [''];
		inputs.nase = [''];
		inputs.wort = [''];
	}
	resetInputs();

	stats.set([
		{
			handle: 'fabrik',
			score: 0,
			progress: 0
		},
		{
			handle: 'mainVokal',
			score: 0,
			progress: 0
		},
		{
			handle: 'mainLaenge',
			score: 0,
			progress: 0
		},
		{
			handle: 'nase',
			score: 0,
			progress: 0
		},
		{
			handle: 'wort',
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
		if(JSON.stringify(inputs[key]).replace(/[\s\[\]'"]+/g,'').toLowerCase() === JSON.stringify(currentWord[key]).replace(/[\[\]'"]+/g,'').toLowerCase()) {
			return true; }
		return false;
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
			task.timeout = setTimeout(() => {
                nextStep();
            }, 3000);
		} else if(task.state === 'undefined') {
			task.message = 'Ups';
			task.sub = 'Da war etwas falsch.';
			task.state = 'again';
		} else if(task.steps.length > task.step+1) {
			task.message = 'Das war nicht ganz richtig';
			task.sub = 'Beim nächsten mal.';
			task.state = 'next';
		} else {
			task.message = 'Nicht ganz richtig';
			task.sub = 'Viel Erfolg beim nächsten Wort!';
			task.state = 'next';
		}
		showModal.set(true);
	}

	function nextStep() {
		clearTimeout( task.timeout );
		if(task.state === 'correct' || task.state === 'next') {
			if(task.steps.every(step => Object.values(step).every(item => item))) {
				wortScore.set($wortScore + 1);
			}
			resetTask();
			resetInputs();
			getCurrentWord();
			wortProgress.set($wortProgress + 1);
		} else if(task.state === 'correct' || task.state === 'next') {
			task.state = 'undefined';
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

{#if (!$showModal || $showStats) || (task.state === 'again' || task.state === 'edited') }
	<section class="row mt-2 mt-sm-6" transition:fade>
		<div class="form col col-12 col-lg-8 m-auto py-4 px-3 px-sm">
			<div class="word row">
				<div class="col text-align-center">
					<button title="Wort anhören" autofocus on:click={() => playAudio('assets/words/audio/', currentWord.wort)} class="a word__img inline-block">
						{#if imageFile}<img src={imageFile.url} alt={currentWord.wort}>{/if}
						<div class="icon-headphones"></div>
					</button>
				</div>
			</div>

			<div class="input__container my-3">
				<div class="table">
					<div class="row {task.state === 'again' && !checkInput('fabrik') ? 'alert' : ''}">
						<div class="col">
							<img src={`assets/img/table/fabrik.svg`} alt="Fabrik" title="Wortfabrik">
						</div>
						{#if inputs.fabrik[0] === '12' || inputs.fabrik[0] === '123'}
							<div class="col"><i class="icon-rhythmus-b icon-xlarge"></i></div>
						{:else}
							<div class="col">&nbsp;</div>					
						{/if}
						{#if inputs.fabrik[0] === '2' || inputs.fabrik[0] === '12' || inputs.fabrik[0] === '23' || inputs.fabrik[0] === '123'}
							<div class="col"><i class="icon-rhythmus-g icon-xlarge"></i></div>
						{:else}
							<div class="col">&nbsp;</div>
						{/if}
						{#if inputs.fabrik[0] === '23' || inputs.fabrik[0] === '123'}
							<div class="col"><i class="icon-rhythmus-k icon-xlarge"></i></div>
						{:else}
							<div class="col">&nbsp;</div>
						{/if}
						<div class="col rythm__col height--auto">
							<button class="btn btn-lg btn-light rythm__btn {inputs.fabrik[0] === '2' ? 'focus' : ''}" on:click={() => {popInput('fabrik');addInput('fabrik', '2');}} title="Das Wort hat nur eine Silbe, z.B. &quot;Hund&quot;."><i class="icon-rhythmus-2 icon-large"></i></button>
							<button class="btn btn-lg btn-light rythm__btn {inputs.fabrik[0] === '23' ? 'focus' : ''}" on:click={() => {popInput('fabrik');addInput('fabrik', '23');}} title="Bei dem Wort wird die erste Silbe betont (laut) gesprochen, z.B. &quot;AUto&quot;."><i class="icon-rhythmus-12 icon-large"></i></button>
							<button class="btn btn-lg btn-light rythm__btn {inputs.fabrik[0] === '12' ? 'focus' : ''}" on:click={() => {popInput('fabrik');addInput('fabrik', '12');}}><i title="Das Wort hat zwei Silben, die betonte (laute) Silbe ist am Ende, z.B. &quot;paKET&quot;."><span class="icon-rhythmus-23 icon-large"><span class="path1"></span><span class="path2"></span></span></i></button>
							<button class="btn btn-lg btn-light rythm__btn {inputs.fabrik[0] === '123' ? 'focus' : ''}" on:click={() => {popInput('fabrik');addInput('fabrik', '123');}}><i title="Bei dem Wort wird die vorletzte Silbe betont (laut) gesprochen, z.B. &quot;heliKOPter&quot;."><span class="icon-rhythmus-123 icon-large"><span class="path1"></span><span class="path2"><span class="path3"></span></span></i></button>
						</div>
					</div>

					<div class="row">
						<div class="col">
							<img src={`assets/img/table/mainVokal.svg`} alt="Vokal" title="Vokal (Selbstlaut, Silbenkönig)">
						</div>
						<div class="col">&nbsp;</div>
						<div class="col input__canvas">
							<div class="vokale input__container">
								<input type="text" class="vokaleInput {task.state === 'again' && !checkInput('mainVokal') ? 'alert' : ''}" bind:value={inputs.mainVokal[0]} maxlength="4" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
							</div>
						</div>
						<div class="col">&nbsp;</div>
						<div class="col">&nbsp;</div>
					</div>

					<div class="row">
						<div class="col">
							<img src={`assets/img/table/mainLaenge.svg`} alt="Länge" title="Vokallänge (lang/kurz)">
						</div>
						<div class="col">&nbsp;</div>
						<div class="col input__canvas">
							<div class="vokale input__container">
								<p>
									{inputs.mainVokal[0] ?? ''}
								</p>
							</div>
							<div class="laenge input__container">
								<i class="icon-large icon-laenge-{inputs.mainLaenge[0] ?? 'empty' } {task.state === 'again' && !checkInput('mainLaenge') ? 'color-alert' : ''}" />
							</div>
						</div>
						<div class="col">&nbsp;</div>
						<div class="col height--auto">
							<button class="btn btn-lg btn-light v-center mr-1 {inputs.mainLaenge[0] === 'l' ? 'focus' : ''}" on:click={() => {popInput('mainLaenge'); addInput('mainLaenge', 'l');}} title="langer Vokal (Selbstlaut, Silbenkönig)"><i class="icon-laenge-l icon-large"></i> </button>
							<button class="btn btn-lg btn-light v-center mr-1 {inputs.mainLaenge[0] === 'k' ? 'focus' : ''}" on:click={() => {popInput('mainLaenge'); addInput('mainLaenge', 'k');}} title="kurzer Vokal (Selbstlaut, Silbenkönig)"><i class="icon-laenge-k icon-large"></i> </button>
						</div>
					</div>

					<div class="row">
						<div class="col">
							<img src={`assets/img/table/nase.svg`} alt="Nase" title="Nasensilbe">
						</div>
						<div class="col">&nbsp;</div>
						<div class="col input__canvas">
							<div class="vokale input__container">
								<p>
									{inputs.mainVokal[0] ?? ''}
								</p>
							</div>
							<div class="laenge input__container">
								<i class="icon-large icon-laenge-{inputs.mainLaenge[0] ?? 'empty' } {task.state === 'again' && !checkInput('mainLaenge') ? 'color-alert' : ''}" />
							</div>
						</div>
						<div class="col">
							<div class="vokale input__container">
								<input type="text" class="vokaleInput {task.state === 'again' && !checkInput('nase') ? 'alert' : ''}" bind:value={inputs.nase[0]} maxlength="4" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
							</div>
						</div>
						<div class="col">&nbsp;</div>
					</div>

					<div class="row">
						<div class="col">
							<img src={`assets/img/table/wort.svg`} alt="Wort" title="Lösung">
						</div>
						<div class="col col-fullwidth input__canvas">
							<div class="vokale input__container">
								<input type="text" class="vokaleInput {task.state === 'again' && !checkInput('wort') ? 'alert' : ''}" bind:value={inputs.wort[0]} autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
							</div>
						</div>
						<div class="col">&nbsp;</div>
					</div>
				</div>
			</div>

			<div class="row mt-4 mb-1">
				<div class="col">
					<button class="btn btn-primary float-right" disabled={inputs['fabrik'].length < 1} on:click={() => validate()} title="Kontrollieren"><i class="icon-arrow-right icon-large"></i></button>
				</div>
			</div>
		</div>
	</section>
{/if}

<Modal {...task} {nextStep} />

<style>
	.input__container i{
		width: 40px;
	}
	.input__container input, 
	.input__container p {
		font-family: 'Mono';
    	text-align: center;
		background: transparent;
		border: 0;
		border-radius: 3px;
		padding: .5rem 0;
		font-size: 1.5rem;
		margin: 0;
		width: 100%;
	}
	.input__container input {
		box-shadow: inset 0 0 5px 1px rgb(100,100,100,.3);
    	background: rgba(100,100,100,.05);
	}
	.input__container input:focus,
	.input__container input:active {
		border: 2px solid rgba(150,150,150,.5);
	}
	.vokale {
		z-index: 1;
	}
	.laenge {
		position: absolute;
		z-index: 0;
		top: 20px;
	}
	i.icon-laenge-empty {
		width: 40px;
		display: inline-block;
		padding: 0 4px;
	}
</style>