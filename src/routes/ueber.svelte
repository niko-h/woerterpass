<script context="module">
	import { browser, dev } from '$app/env';

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>

<svelte:head>
	<title>Über diese App, Kontakt, Impressum</title>
</svelte:head>

<section class="container">
	<div class="row mt-2">
		<div class="col">
			<h1>Über diese App</h1>
			<p>
				Dies ist eine Lern-App für Rechtschreibung im Deutschunterricht mithilfe von sogenannten Wörterpässen. Die Einbeziehung des Wortrhythmus' in der Rechtschreibdidaktik basiert u.a. auf den Arbeiten von Dr. Zvi Penner, Sandra Lenz und Prof. Dr. Christa Röber. Die hier verwendeten "Wörterpässe" wurden von Maria Seyed Nassir für Rechtschreibgespräche über Wortrhythmus und Wortstruktur entwickelt. Anschließend wurden sie noch einmal von Mirjam Kutzner und Thomas Renning zur Verwendung an unserer Schule angepasst. Die letztliche Umsetzung erfolgte inhaltlich durch Johannes Wilke, die technische Umsetzung durch Nikolaus Höfer.
			</p>

			<h2>Kontakt & Datenschutz</h2>
			<p>
				Bei Fragen und Hinweisen können Sie Johannes Wilke gern eine Nachricht schreiben an: frage@woerterpass.de
			</p>
			<p>
				Diese Seite erhebt keinerlei Nutzerdaten und speichert keine Cookies.
			</p>

			<h2>Impressum</h2>
			<address>
				Angaben gemäß § 5 TMG<br />
				Johannes Wilke<br />
				c/o Ringelnatzschule<br />
				Wilhelm-Gericke-Str. 7-13<br />
				13437 Berlin
			</address>
			<p>
				E-Mail: frage@woerterpass.de
			</p>

			<h2>Lizenzen & Copyright</h2>
			<h3>Bild- und Tonrechte</h3>
			<ul>
				<li>Pixabay (<a href="https://pixabay.com/de/service/terms/#license">Nutzungsbedingungen</a>)</li>
				<li><a href="https://bidab.nibis.de/piwigo-nlq-lizenz.html">NLQ</a> Lizenz vom Niedersächsischen Bildungsservice</li>
				<li>Verwendung der FRESCH-Symbole "Ableiten" und "Weiterschwingen" mit freundlicher Genehmigung von <a href="http://www.fresch-renk.de">Günter Renk</a></li>
				<li>Die Grafiken und UI-Elemente stehen unter der <a href="https://creativecommons.org/publicdomain/zero/1.0/legalcode">CC 0 1.0</a> Lizenz</li>
				<li>Die Tondokumente stehen unter der <a href="https://creativecommons.org/publicdomain/zero/1.0/legalcode">CC 0 1.0</a> Lizenz.</li>
			</ul>
			<p>
				Diese Software steht unter der <a href="https://www.gnu.org/licenses/gpl-3.0.html">GPL 3.0</a> Lizenz.<br />
				Der Quelltext zu dieser Software ist <a href="https://github.com/niko-h/woerterpass">hier</a> veröffentlicht.<br />
				Copyright (c) {new Date().getFullYear()} <a href="https://nikolaushoefer.de">Nikolaus Höfer</a>
			</p>
		</div>
	</div>
</section>

<style>
	.content {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
	}
	p {
		margin: .5rem 0 1rem;
	}
</style>
