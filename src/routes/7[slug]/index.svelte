<script>
	export const prerender = true;
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { modul, level, wortScore, wortProgress, showModal, showStats, stats } from '../../stores/stores.js';
	import * as data from '$lib/data-live.js';
	import Modal from '$lib/Modal/index.svelte';
	
	let slug;
	let audio;
	if(typeof Audio != "undefined") {
        audio = new Audio();
    }
	page.subscribe(value => slug = value.params.slug);
	modul.set(7); // hard-coded modul
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
				grossgeschrieben: false,
				wortart: false,
				wort: false
			}
		];
		task.state = 'undefined';
		task.step = 0;
		task.kopierer = 2;
	}
	resetTask();
	
	let inputs = {};
	function resetInputs() {
		inputs.fabrik = [];
		inputs.fabrik2 = [];
		inputs.mainLaenge = [];
		inputs.mainLaenge2 = [];
		inputs.mainVokal = [''];
		inputs.mainVokal2 = [''];
		inputs.nase = [''];
		inputs.nase2 = [''];
		inputs.naseCK = [''];
		inputs.naseCK2 = [''];
		inputs.kopierersilbe = [''];
		inputs.kopierersilbe2 = [''];
		inputs.zwischenspeicher = [''];
		inputs.zwischenspeicher2 = [''];
		inputs.ableiten = [''];
		inputs.ableiten2 = [''];
		inputs.weiterschwingen = [''];
		inputs.weiterschwingen2 = [''];
		inputs.wortstamm = [''];
		inputs.wortstamm2 = [''];

		inputs.grossgeschrieben = [''];
		inputs.wortart = [''];
		inputs.wort = [''];
	}
	resetInputs();

	stats.set([
		{
			handle: 'grossgeschrieben',
			score: 0,
			progress: 0
		},
		{
			handle: 'wortart',
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
		if(JSON.stringify(inputs[key]).replace(/[\s\[\]']+/g,'') === JSON.stringify(currentWord[key]).replace(/[\[\]']+/g,'')) {
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
			setTimeout(() => {
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
		<div class={`form col col-12 col-lg-${$level === 'A' ? '12' : '8'} m-auto py-4 px-3 px-sm`}>
			<div class="word row">
				<div class="col text-align-center">
					<button title="Wort anhören" on:click={() => playAudio('assets/words/audio/', currentWord.wort)} class="btn btn-lg btn-light word__img inline-block">
						<i class="icon-headphones"></i> Anhören
					</button>
				</div>
			</div>
			
			<div class="row">
				<div class={`col col-12 ${$level === 'A' ? 'col-lg-6' : ''} px-sm`}>
					<div class="input__container my-3">
						<div class="table">
							<div class="row kasten">
								<div class="col input__canvas">
									<div class="input__container kasten--klein">
										<input type="text" maxlength="8" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
									</div>	
								</div>
								<div class="col input__canvas">
									<div class="input__container kasten--gross">
										<input type="text" maxlength="8" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
									</div>
								</div>
								<div class="col input__canvas">
									<div class="input__container kasten--klein">
										<input type="text" maxlength="8" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
									</div>
								</div>
								<div class="col">&nbsp;</div>
							</div>

							<div class="row">
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
									<button class="btn btn-lg btn-light rythm__btn {inputs.fabrik[0] === '23' ? 'focus' : ''}" on:click={() => {popInput('fabrik');addInput('fabrik', '23');}} title="Bei dem Wort wird die letzte Silbe betont (laut) gesprochen, z.B. &quot;paKET&quot;."><i class="icon-rhythmus-12 icon-large"></i></button>
									<button class="btn btn-lg btn-light rythm__btn {inputs.fabrik[0] === '12' ? 'focus' : ''}" on:click={() => {popInput('fabrik');addInput('fabrik', '12');}}><i title="Das Wort hat zwei Silben, die betonte (laute) Silbe ist am Anfang, z.B. &quot;AUto&quot;."><span class="icon-rhythmus-23 icon-large"><span class="path1"></span><span class="path2"></span></span></i></button>
									<button class="btn btn-lg btn-light rythm__btn {inputs.fabrik[0] === '123' ? 'focus' : ''}" on:click={() => {popInput('fabrik');addInput('fabrik', '123');}}><i title="Bei dem Wort wird die vorletzte Silbe betont (laut) gesprochen, z.B. &quot;heliKOPter&quot;."><span class="icon-rhythmus-123 icon-large"><span class="path1"></span><span class="path2"><span class="path3"></span></span></i></button>
								</div>
							</div>

							<div class="row">
								<div class="col">
									<img src={`assets/img/table/mainLaenge.svg`} alt="Vokale und Länge" title="Vokale und Länge">
								</div>
								<div class="col">&nbsp;</div>
								<div class="col input__canvas">
									<div class="vokale input__container">
										<input type="text" class="vokaleInput" bind:value={inputs.mainVokal[0]} on:input="{() => inputs.kopierersilbe[0] = inputs.mainVokal[0]}" maxlength="3" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
									</div>
									<div class="laenge input__container">
										<i class="icon-large icon-laenge-{inputs.mainLaenge[0] ?? 'empty' }" />
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
										<i class="icon-large icon-laenge-{inputs.mainLaenge[0] ?? 'empty' }" />
									</div>
								</div>
								<div class="col">
									<div class="vokale input__container">
										<input type="text" class="vokaleInput" bind:value={inputs.nase[0]} on:input="{() => inputs.naseCK[0] = inputs.nase[0]}" maxlength="4" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
									</div>
								</div>
								<div class="col">&nbsp;</div>
							</div>

							<div class="row">
								<div class="col">
									<img src={`assets/img/table/kopierersilbe2.svg`} alt="Kopierersilbe" title="Kopierersilbe">
								</div>
								<div class="col">&nbsp;</div>
								<div class="col input__canvas">
									<div class="vokale input__container">
										<input type="text" class="vokaleInput" bind:value={inputs.kopierersilbe[0]} maxlength="4" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
									</div>
									<div class="laenge input__container">
										<i class="icon-large icon-laenge-{inputs.mainLaenge[0] ?? 'empty' }" />
									</div>
								</div>
								<div class="col">
									<div class="vokale input__container">
										<input type="text" class="vokaleInput" bind:value={inputs.naseCK[0]} maxlength="4" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
									</div>
								</div>
								<div class="col">&nbsp;</div>
							</div>

							<div class="row">
								<div class="col">
									<img src={`assets/img/table/zwischenspeicher.svg`} alt="Zwischenspeicher" title="Zwischenspeicher">
								</div>
								<div class="col col-fullwidth input__canvas">
									<div class="vokale input__container">
										<input type="text" class="vokaleInput" bind:value={inputs.zwischenspeicher[0]} autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
									</div>
								</div>
								<div class="col">&nbsp;</div>
							</div>

							<div class="row">
								<div class="col">
									<img src={`assets/img/table/ableiten.svg`} alt="Ableiten" title="Ableiten">
								</div>
								<div class="col col-fullwidth input__canvas">
									<div class="vokale input__container">
										<input type="text" class="vokaleInput" bind:value={inputs.ableiten[0]} autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
									</div>
								</div>
								<div class="col">&nbsp;</div>
							</div>

							<div class="row">
								<div class="col">
									<img src={`assets/img/table/weiterschwingen.svg`} alt="Weiterschwingen" title="Weiterschwingen">
								</div>
								<div class="col col-fullwidth input__canvas">
									<div class="vokale input__container">
										<input type="text" class="vokaleInput" bind:value={inputs.weiterschwingen[0]} autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
									</div>
								</div>
								<div class="col">&nbsp;</div>
							</div>

							<div class="row">
								<div class="col">
									<img src={`assets/img/table/wortstamm.svg`} alt="Wortstamm" title="Wortstamm">
								</div>
								<div class="col col-fullwidth input__canvas">
									<div class="vokale input__container">
										<input type="text" class="vokaleInput" bind:value={inputs.wortstamm[0]} autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
									</div>
								</div>
								<div class="col">&nbsp;</div>
							</div>
						</div>
					</div>
				</div>
				{#if $level === 'A'}	
					<hr class="show--sm">
					<div class="col col-12 col-lg-6 px-sm">
						<div class="input__container mt-3">
							<div class="table">
								<div class="row kasten">
									<div class="col input__canvas">
										<div class="input__container kasten--klein">
											<input type="text" maxlength="8" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
										</div>	
									</div>
									<div class="col input__canvas">
										<div class="input__container kasten--gross">
											<input type="text" maxlength="8" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
										</div>
									</div>
									<div class="col input__canvas">
										<div class="input__container kasten--klein">
											<input type="text" maxlength="8" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
										</div>
									</div>
									<div class="col">&nbsp;</div>
								</div>
	
								<div class="row">
									<div class="col">
										<img src={`assets/img/table/fabrik.svg`} alt="Fabrik" title="Wortfabrik">
									</div>
									{#if inputs.fabrik2[0] === '12' || inputs.fabrik2[0] === '123'}
										<div class="col"><i class="icon-rhythmus-b icon-xlarge"></i></div>
									{:else}
										<div class="col">&nbsp;</div>					
									{/if}
									{#if inputs.fabrik2[0] === '2' || inputs.fabrik2[0] === '12' || inputs.fabrik2[0] === '23' || inputs.fabrik2[0] === '123'}
										<div class="col"><i class="icon-rhythmus-g icon-xlarge"></i></div>
									{:else}
										<div class="col">&nbsp;</div>
									{/if}
									{#if inputs.fabrik2[0] === '23' || inputs.fabrik2[0] === '123'}
										<div class="col"><i class="icon-rhythmus-k icon-xlarge"></i></div>
									{:else}
										<div class="col">&nbsp;</div>
									{/if}
									<div class="col rythm__col height--auto">
										<button class="btn btn-lg btn-light rythm__btn {inputs.fabrik2[0] === '2' ? 'focus' : ''}" on:click={() => {popInput('fabrik2');addInput('fabrik2', '2');}} title="Das Wort hat nur eine Silbe, z.B. &quot;Hund&quot;."><i class="icon-rhythmus-2 icon-large"></i></button>
										<button class="btn btn-lg btn-light rythm__btn {inputs.fabrik2[0] === '23' ? 'focus' : ''}" on:click={() => {popInput('fabrik2');addInput('fabrik2', '23');}} title="Bei dem Wort wird die letzte Silbe betont (laut) gesprochen, z.B. &quot;paKET&quot;."><i class="icon-rhythmus-12 icon-large"></i></button>
										<button class="btn btn-lg btn-light rythm__btn {inputs.fabrik2[0] === '12' ? 'focus' : ''}" on:click={() => {popInput('fabrik2');addInput('fabrik2', '12');}}><i title="Das Wort hat zwei Silben, die betonte (laute) Silbe ist am Anfang, z.B. &quot;AUto&quot;."><span class="icon-rhythmus-23 icon-large"><span class="path1"></span><span class="path2"></span></span></i></button>
										<button class="btn btn-lg btn-light rythm__btn {inputs.fabrik2[0] === '123' ? 'focus' : ''}" on:click={() => {popInput('fabrik2');addInput('fabrik2', '123');}}><i title="Bei dem Wort wird die vorletzte Silbe betont (laut) gesprochen, z.B. &quot;heliKOPter&quot;."><span class="icon-rhythmus-123 icon-large"><span class="path1"></span><span class="path2"><span class="path3"></span></span></i></button>
									</div>
								</div>
	
								<div class="row">
									<div class="col">
										<img src={`assets/img/table/mainLaenge.svg`} alt="Vokale und Länge" title="Vokale und Länge">
									</div>
									<div class="col">&nbsp;</div>
									<div class="col input__canvas">
										<div class="vokale input__container">
											<input type="text" class="vokaleInput" bind:value={inputs.mainVokal2[0]} on:input="{() => inputs.kopierersilbe2[0] = inputs.mainVokal2[0]}" maxlength="3" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
										</div>
										<div class="laenge input__container">
											<i class="icon-large icon-laenge-{inputs.mainLaenge2[0] ?? 'empty' }" />
										</div>
									</div>
									<div class="col">&nbsp;</div>
									<div class="col height--auto">
										<button class="btn btn-lg btn-light v-center mr-1 {inputs.mainLaenge2[0] === 'l' ? 'focus' : ''}" on:click={() => {popInput('mainLaenge2'); addInput('mainLaenge2', 'l');}} title="langer Vokal (Selbstlaut, Silbenkönig)"><i class="icon-laenge-l icon-large"></i> </button>
										<button class="btn btn-lg btn-light v-center mr-1 {inputs.mainLaenge2[0] === 'k' ? 'focus' : ''}" on:click={() => {popInput('mainLaenge2'); addInput('mainLaenge2', 'k');}} title="kurzer Vokal (Selbstlaut, Silbenkönig)"><i class="icon-laenge-k icon-large"></i> </button>
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
												{inputs.mainVokal2[0] ?? ''}
											</p>
										</div>
										<div class="laenge input__container">
											<i class="icon-large icon-laenge-{inputs.mainLaenge2[0] ?? 'empty' }" />
										</div>
									</div>
									<div class="col">
										<div class="vokale input__container">
											<input type="text" class="vokaleInput" bind:value={inputs.nase2[0]} on:input="{() => inputs.naseCK2[0] = inputs.nase2[0]}" maxlength="4" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
										</div>
									</div>
									<div class="col">&nbsp;</div>
								</div>
	
								<div class="row">
									<div class="col">
										<img src={`assets/img/table/kopierersilbe2.svg`} alt="Kopierersilbe" title="Kopierersilbe">
									</div>
									<div class="col">&nbsp;</div>
									<div class="col input__canvas">
										<div class="vokale input__container">
											<input type="text" class="vokaleInput" bind:value={inputs.kopierersilbe2[0]} maxlength="4" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
										</div>
										<div class="laenge input__container">
											<i class="icon-large icon-laenge-{inputs.mainLaenge2[0] ?? 'empty' }" />
										</div>
									</div>
									<div class="col">
										<div class="vokale input__container">
											<input type="text" class="vokaleInput" bind:value={inputs.naseCK2[0]} maxlength="4" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
										</div>
									</div>
									<div class="col">&nbsp;</div>
								</div>
	
								<div class="row">
									<div class="col">
										<img src={`assets/img/table/zwischenspeicher.svg`} alt="Zwischenspeicher" title="Zwischenspeicher">
									</div>
									<div class="col col-fullwidth input__canvas">
										<div class="vokale input__container">
											<input type="text" class="vokaleInput" bind:value={inputs.zwischenspeicher2[0]} autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
										</div>
									</div>
									<div class="col">&nbsp;</div>
								</div>

								<div class="row">
									<div class="col">
										<img src={`assets/img/table/ableiten.svg`} alt="Ableiten" title="Ableiten">
									</div>
									<div class="col col-fullwidth input__canvas">
										<div class="vokale input__container">
											<input type="text" class="vokaleInput" bind:value={inputs.ableiten2[0]} autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
										</div>
									</div>
									<div class="col">&nbsp;</div>
								</div>

								<div class="row">
									<div class="col">
										<img src={`assets/img/table/weiterschwingen.svg`} alt="Weiterschwingen" title="Weiterschwingen">
									</div>
									<div class="col col-fullwidth input__canvas">
										<div class="vokale input__container">
											<input type="text" class="vokaleInput" bind:value={inputs.weiterschwingen2[0]} autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
										</div>
									</div>
									<div class="col">&nbsp;</div>
								</div>

								<div class="row">
									<div class="col">
										<img src={`assets/img/table/wortstamm.svg`} alt="Wortstamm" title="Wortstamm">
									</div>
									<div class="col col-fullwidth input__canvas">
										<div class="vokale input__container">
											<input type="text" class="vokaleInput" bind:value={inputs.wortstamm2[0]} autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
										</div>
									</div>
									<div class="col">&nbsp;</div>
								</div>
							</div>
						</div>
					</div>
				{/if}
				<hr class="show--sm">
			</div>
			<div class="row">
				<div class="col px-sm">
					<div class="table">
						<div class="row">
							<div class="col">
								<img src={`assets/img/table/grossgeschrieben.svg`} alt="Großgeschrieben" title="Groß oder klein geschrieben">
							</div>
							<div class="col col-fullwidth input__canvas">
								<div class="input__container btn__group {task.state === 'again' && !checkInput('grossgeschrieben') ? 'alert' : ''}">
									<label class="btn btn-lg btn-light {inputs.grossgeschrieben === true ? 'active' : ''}" for="grossTrue"><input id="grossTrue" class="radio" type=radio name="gross" bind:group={inputs.grossgeschrieben} value={true}>groß</label>
									<label class="btn btn-lg btn-light {inputs.grossgeschrieben === false ? 'active' : ''}" for="grossFalse"><input id="grossFalse" class="radio" type=radio name="gross" bind:group={inputs.grossgeschrieben} value={false}>klein</label>
								</div>
							</div>
							<div class="col">&nbsp;</div>
						</div>

						<div class="row">
							<div class="col">
								<img src={`assets/img/table/wortart.svg`} alt="Wortart" title="Wortart">
							</div>
							<div class="col col-fullwidth input__canvas">
								<div class="input__container btn__group {task.state === 'again' && !checkInput('wortart') ? 'alert' : ''}">
									<label class="btn btn-lg btn-light {inputs.wortart === 'n' ? 'active' : ''}" for="artNomen"><input id="artNomen" class="radio" name="art" type=radio bind:group={inputs.wortart} value={'n'}> Nomen</label>
									<label class="btn btn-lg btn-light {inputs.wortart === 'v' ? 'active' : ''}" for="artVerb"><input id="artVerb" class="radio" name="art" type=radio bind:group={inputs.wortart} value={'v'}> Verb</label>
									<label class="btn btn-lg btn-light {inputs.wortart === 'a' ? 'active' : ''}" for="artAdjektiv"><input id="artAdjektiv" class="radio" name="art" type=radio bind:group={inputs.wortart} value={'a'}> Adjektiv</label>
								</div>
							</div>
							<div class="col">&nbsp;</div>
						</div>

						<div class="row">
							<div class="col">
								<img src={`assets/img/table/wort2.svg`} alt="Wort" title="Lösung">
							</div>
							<div class="col col-fullwidth input__canvas">
								<div class="input__container">
									<input type="text" class="vokaleInput {task.state === 'again' && !checkInput('wort') ? 'alert' : ''}" bind:value={inputs.wort[0]} autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
								</div>
							</div>
							<div class="col">&nbsp;</div>
						</div>
					</div>
				</div>
			</div>

			<div class="row mt-4 mb-1">
				<div class="col">
					<button class="btn btn-primary float-right" disabled={inputs['wort'].length < 1} on:click={() => validate()} title="Kontrollieren"><i class="icon-arrow-right icon-large"></i></button>
				</div>
			</div>
		</div>
	</section>
{/if}

<Modal {...task} {nextStep} />

<style>
	hr {
		display: block;
    	height: 7px;
		background: #888;
		width: 100%;
	}
	.table .row .col:first-child {
		min-width: 110px;
	}
	.kasten .input__canvas {
		overflow: visible;
	}
	.kasten > .col {
		border-left: 0;
		border-right: 0;
	}
	.kasten > .col:first-child {
		min-width: unset !important;
	}
	.input__container .kasten .input__canvas input {
		padding: .15rem 0;
		margin: .2rem .5rem;
	}
	.kasten--klein input,
	.kasten--gross input {
		font-size: 1rem !important;
		height: 2.5rem;
		padding: 1px !important;
		box-sizing: border-box !important;
	}
	.kasten--gross input {
		font-size: 1.2rem !important;
		min-width: 8.5ch !important;
	}
	.kasten--klein:before,
	.kasten--gross:before {
		border: 3px solid black;
		content: "";
		position: absolute;
		width: calc(100% - 1rem);
		height: calc(100% - .4rem);
		left: .5rem;
		top: .2rem;
		z-index: 1;
		pointer-events: none;
	}
	.kasten--klein:before {
		margin-top: .4rem;
		height: calc(100% - 1.2rem);
	}
	.kasten--gross:before {
		width: calc(100% + 1rem + 6px);
		left: calc(-.5rem - 3px);
	}
	.input__container .input__canvas .kasten--gross input {
		padding: .25rem 0;
		margin: 0;
	}
	.word__img {
		width: 200px;
		height: 50px;
		border-radius: 25px;
		top: unset;
		bottom: -38px;
		background-color: #f5f5f5;
		margin-bottom: 3rem;
		transition: bottom .2s, box-shadow .2s;
	}
	.word__img:hover {
		top: unset;
		bottom: -37px;
		text-decoration: none;
		transition: bottom .2s, box-shadow .2s;
	}
	.word__img .icon-headphones {
		bottom: unset;
		position: relative;
		left: unset;
		transform: unset;
		font-size: unset;
		padding: 6px 7px 8px;
		margin-right: .25rem;
	}
	.input__container i{
		width: 40px;
	}
	.input__container input:not(.radio), 
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
	.input__container input:not(.radio) {
		box-shadow: inset 0 0 5px 1px rgb(100,100,100,.3);
    	background: rgba(100,100,100,.05);
	}
	.input__container input:not(.radio):focus,
	.input__container input:not(.radio):active {
		border: 2px solid rgba(150,150,150,.5);
	}
	.input__container label {
		font-family: 'Roboto', sans-serif;
		padding: .25rem .75rem;
		margin-bottom: 0;
		text-shadow: .25px 0 0 transparent, -.25px 0 0 transparent;
	}
	.input__container label.active {
		background: rgb(77,125,175);
		background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(77,125,175,.2) 1%, rgba(77,125,175,.3) 100%);
		text-shadow: .25px 0 0 black, -.25px 0 0 black;
	}
	.input__container label input {
		display: none;
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
	.icon-rhythmus-b,
	.icon-rhythmus-g,
	.icon-rhythmus-k {
		max-width: 2rem;
	}
	.icon-rhythmus-b:before,
	.icon-rhythmus-g:before,
	.icon-rhythmus-k:before {
		margin-left: -1.5rem;
	}

	.btn__group {
		border: 1px solid #ccc;
		border-radius: .25rem;
		overflow: hidden;
	}
	.btn__group .btn {
		border-radius: 0;
		box-shadow: 0 0 0;
		border-right: 1px solid #ccc;
	}
	.btn__group .btn:last-child {
		border-right: none;
	}
	@media (max-width:576px){
		.btn__group .btn {
			font-size: 1rem;
			padding: .25rem !important;
		}
	}
</style>