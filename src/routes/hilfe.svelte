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
	<title>Hilfe</title>
</svelte:head>

<section class="container">
	<h1 id="hilfefuerelternundschueler">Hilfe für Eltern und Schüler*innen</h1>
	<p>Lehrer*innen finden auf <a href="/fuerLehrerInnen">dieser Seite</a> genaue Erklärungen und Material.</p>

	<h2 id="inhalt">Inhalt:</h2>
	<nav>
		<li><a href="#wasisteinwoerterpass">Was ist ein Wörterpass?</a></li>
		<li><a href="#wiebenutzeichdieseseite">Wie benutze ich die App?</a></li>
		<li><a href="#wassindmodule">Was sind Module?</a></li>
		<li><a href="#modul1">Modul 1: Silbenbögen</a></li>
		<li><a href="#modul2">Modul 2: lange und kurze Vokale</a></li>
		<li><a href="#modul3">Modul 3: Wortfabrik</a></li>
		<li><a href="#modul4">Modul 4: Mini-Wörterpass</a></li>
		<li><a href="#modul5">Modul 5: Kleiner Wörterpass</a></li>
		<li><a href="#modul6">Modul 6: Dehnungs-h</a></li>
		<li><a href="#modul7">Modul 7: Großer Wörterpass</a></li>
	</nav>


	<h2 id="wasisteinwoerterpass">Was ist ein Wörterpass?</h2>
	<p>Die meisten Wörter sind nur an einer Stelle schwierig zu schreiben: da, wo man betont (laut spricht). Alle anderen Silben werden oft so geschrieben, wie man sie spricht. Mit dem Wörterpass findest du heraus, was an dieser schwierigen Stelle passiert!</p>
	
	<h2 id="wiebenutzeichdieseseite">Wie benutze ich die App?</h2>
	<div class="row mt-2">
		<div class="col-12 col-md-4 col-lg-3 px-sm-0">
			<img src="assets/img/help/0-1-Modulauswahl.png" alt="Modulauswahl">
		</div>
		<div class="col px-sm-0">
			<p>
				Auf der Startseite suchst du dir ein Modul aus. Das sind verschiedene Übungen, die weiter unten bei <a href="#wassindmodule">Was sind Module?</a> erklärt werden. Für jedes Modul gibt es mehrere Stufen (A, B, C … ). In einer Stufe kommen immer nur bestimmte Arten von Wörtern vor. Deswegen ist die nächste Stufe oft nicht schwieriger, sondern einfach nur anders. Frage deine Lehrer*in, wann du eine andere Stufe nehmen sollst.</p>
		</div>
	</div>
	<div class="row mt-2">
		<div class="col-12 col-md-4 col-lg-3 px-sm-0">
			<img src="assets/img/help/0-1-Kurzstatistik.png" alt="Kurzstatistik">
		</div>
		<div class="col px-sm-0">
			<p>
				Oben rechts siehst du, wie viele Wörter du bisher bearbeitet hast (die große Zahl), und wie viele davon richtig waren (die kleine Zahl, z.B. &bdquo;3 Wörter bearbeitet, davon 2 richtig&ldquo;). Wenn du mal einen Fehler machst, ist das kein Problem: Du bekommst eine zweite Chance!</p>
		</div>
	</div>
	<div class="row mt-2">
		<div class="col-12 col-md-4 col-lg-3 px-sm-0">
			<img src="assets/img/help/0-1-Auswertung.png" alt="Auswertung">
		</div>
		<div class="col px-sm-0">
			<p>
				Wenn du auf die Zahlen oben rechts klickst, dann siehst du ganz genau, was du schon gut kannst und was du noch etwas üben musst:
				Das Kind im Bild hatte alle Silbenbögen richtig (&bdquo;5 von 5 richtig&ldquo;), und hatte nur einen Fehler beim Vokal (&bdquo;6 von 7 richtig&ldquo;). Aber ob der Vokal kurz oder lang ist (&bdquo;3 von 7 richtig&ldquo;) kann dieses Kind noch nicht so gut hören. Sieh dir nach dem Üben genau an, was du schon sehr gut kannst und wo du noch mehr Hilfe brauchst. Wenn du auf das Fragezeichen klickst, siehst du, in welchem Modul du diese Sache besonders gut üben kannst. Dann kannst du dich genau dort verbessern, wo es dir am meisten hilft.</p>
		</div>
	</div>

	<h2 id="wassindmodule">Was sind Module?</h2>
	<p>Wenn ein Wort einfach ist, dann muss man nur einen kleinen Wörterpass lösen. Wenn ein Wort schwieriger ist, dann musst du noch ein oder zwei Sachen mehr kontrollieren. Jede Sache, die du kontrollierst, hat eine eigene Übung&nbsp;&ndash; ein eigenes Modul. Man sollte also zuerst Modul 1 üben. Wenn man das gut kann, dann übt man weiter bei Modul 2. Dann bei Modul 3 …</p>
	<h3 id="modul1">Modul 1: Silbenbögen</h3>
	<div class="row mt-2">
		<div class="col-12 col-md-4 col-lg-3 px-sm-0">
			<img src="assets/img/help/1-1-Banane.png" alt="Modul 1">
		</div>
		<div class="col px-sm-0">
			<p>
				Sieh dir das Bild an und höre dir die Aufnahme an (klicke auf das Bild). An welcher Stelle betont man (spricht man lauter)? Das kannst du so herausfinden:</p>
			<p>Stell dir vor, du bist wütend. Du rufst: &bdquo;Ich möchte eine Ba<mark>NA</mark>ne!&ldquo; Du kannst auch wütend mit dem Fuß stampfen, wenn du das Wort &bdquo;Banane&ldquo; sagst. Die Silbe, bei der du stampfst (Ba<mark>NA</mark>ne), ist die betonte Silbe. Sie bekommt den großen Silbenbogen. Alle anderen (unbetonten, leisen) Silben haben den kleinen Bogen. Schau dir das Bild an, wie das dann aussieht.</p>
			<p>In jedem Wort gibt es nur eine betonte (laute) Silbe.</p>
			<p>Wenn du fertig bist, klicke auf den Pfeil. Wenn etwas falsch war, bekommst du noch eine Chance, dich zu verbessern.</p>
		</div>
	</div>

	<h3 id="modul2">Modul 2: lange und kurze Vokale</h3>
	<div class="row mt-2">
		<div class="col-12 col-md-4 col-lg-3 px-sm-0">
			<img src="assets/img/help/2-1-Schule.png" alt="Modul 2">
		</div>
		<div class="col px-sm-0">
			<p>
				Zuerst musst du wieder die Silbenbögen aufschreiben. Du kannst bei <a href="#modul1">Modul 1</a> nachlesen, wie das geht. Klicke danach auf den Pfeil.</p>
			<p>
				In diesem Bild soll man &bdquo;Schule&ldquo; schreiben. &bdquo;Schule&ldquo; hat zwei Silben. Schreibe über jeden Silbenbogen den richtigen Vokal (Selbstlaut, Silbenkönig), z.B. &bdquo;u&ldquo; und &bdquo;e&ldquo;. Nun musst du genau hinhören: Ist das U bei &bdquo;Schule&ldquo; ein langes U (wie in &bdquo;Uhu&ldquo;) oder ein kurzes U (wie in &bdquo;Unterhose&ldquo;)? Für lang klickst du auf den Strich, für kurz klickst du auf den Punkt. Wenn du auf den Radiergummi klickst, wird das letzte Zeichen gelöscht.</p>
			<p>
				Wenn du hören möchtest, wie z.B. ein langes oder kurzes U klingt, dann klicke unten auf die blauen Buchstaben. Dann hörst du immer zuerst den langen Vokal (Selbstlaut, Silbenkönig) und dann den kurzen. Also z.B. &bdquo;Uuuuu (= lang) wie Uhr, U (=kurz) wie Unterhose&ldquo;.</p>


		</div>
	</div>
	
	<h3 id="modul3">Modul 3: Wortfabrik</h3>
	<div class="row mt-2">
		<div class="col-12 col-md-4 col-lg-3 px-sm-0">
			<img src="assets/img/help/3-1-Finger.png" alt="Modul 3">
		</div>
		<div class="col px-sm-0">
			<p>Zuerst musst du wieder die Silbenbögen aufschreiben. Du kannst bei <a href="#modul1">Modul 1</a> nachlesen, wie das geht. Klicke danach auf den Pfeil.</p>
			<p>
				Hier soll man sagen, welche Wortfabrik bei &bdquo;Finger&ldquo; passt. Es gibt vier Wortfabriken:</p>
		
			<div class="row mt-1">
				<div class="col px-sm-0">
					<i class="icon-rhythmus-2 kachel"></i>
					<p>Das Wort hat nur eine Silbe, z.B. &bdquo;Hund&ldquo;, &bdquo;Bus&ldquo; oder &bdquo;Kind&ldquo;.</p>
				</div>
			</div>
			<div class="row mt-1">
				<div class="col px-sm-0">
					<i class="icon-rhythmus-12 kachel"></i>
					<p>Das Wort hat zwei Silben, die betonte (laute) Silbe ist am Anfang, z.B. &bdquo;<mark>KAT</mark>ze&ldquo;, &bdquo;<mark>AU</mark>to&ldquo; oder &bdquo;<mark>BRU</mark>der&ldquo;.</p>
				</div>
			</div>
			<div class="row mt-1">
				<div class="col px-sm-0">
					<span class="icon-rhythmus-23 kachel"><span class="path1"></span><span class="path2"></span></span>
					<p>Bei dem Wort wird die letzte Silbe betont (laut) gesprochen, z.B. &bdquo;vul<mark>KAN</mark>&ldquo;, &bdquo;re<mark>GAL</mark>&ldquo; oder &bdquo;kroko<mark>DIL</mark>&ldquo;.</p>
				</div>
			</div>
			<div class="row mt-1">
				<div class="col px-sm-0">
					<span class="icon-rhythmus-123 kachel"><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>
					<p>Bei dem Wort wird die vorletzte Silbe betont (laut) gesprochen, z.B. &bdquo;ba<mark>NA</mark>ne&ldquo;, &bdquo;mi<mark>NU</mark>te&ldquo; oder &bdquo;heli<mark>KOP</mark>ter&ldquo;.</p>
				</div>
			</div>
		</div>
	</div>
	
	<h3 id="modul4">Modul 4: Mini-Wörterpass</h3>
	<div class="row mt-2">
		<div class="col-12 col-md-4 col-lg-3 px-sm-0">
			<img src="assets/img/help/4-1-Ente.png" alt="Modul 4">
		</div>
		<div class="col px-sm-0">
			<p>Das Wort im Bild ist &bdquo;Ente&ldquo;. In der ersten Zeile klickst du die richtige Fabrik an (lies bei <a href="#modul3">Modul 3</a> nach, wie das geht).</p>
			<p>In der zweiten Zeile geht es nur um die betonte (laute) Silbe: Welchen Vokal (Selbstlaut, Silbenkönig) hörst du? Schreibe ihn auf. In diesem Bild ist das Wort &bdquo;<mark>EN</mark>te&ldquo;, die betonte (laute) Silbe ist &bdquo;En&ldquo;. Also schreibst du hier &bdquo;e&ldquo; ein.</p>
			<p>In der dritten Zeile klickst du an, ob der Vokal (Selbstlaut, Silbenkönig) lang oder kurz ist. Du hast das schon in <a href="#modul2">Modul 2</a> geübt.</p>
			<p>In der vierten Zeile sollst du die &bdquo;Nasensilbe&ldquo; herausfinden. Eine Nasensilbe ist die letzte Silbe, die nach der betonten (lauten) Silbe kommt. Aber Achtung, nicht alle Wörter haben sowas. Die Wortfabrik ganz oben hilft dir: Wenn in der letzten Spalte ein kleiner Kreis steht, musst du eine Nasensilbe aufschreiben. Bei &bdquo;<mark>EN</mark>te&ldquo; ist das &bdquo;te&ldquo;, weil &bdquo;<mark>EN</mark>&ldquo; betont (laut) ist und danach noch die Silbe &bdquo;te&ldquo; kommt.</p>
			<p>Tipp: Die Nasensilbe schreibt man meist mit &bdquo;e&ldquo;.</p>
			<p>Zum Schluss schreibst du einmal das ganze Wort richtig auf. Dann kannst du auf den Pfeil klicken zum Kontrollieren.</p>
		</div>
	</div>

	<h3 id="modul5">Modul 5: Kleiner Wörterpass</h3>
	<div class="row mt-2">
		<div class="col-12 col-md-4 col-lg-3 px-sm-0">
			<img src="assets/img/help/5-1-Kinder.png" alt="Modul 5">
		</div>
		<div class="col px-sm-0">
			<p>Alles ist genau wie im <a href="#modul4">Modul 4</a>, da kannst du noch einmal nachlesen, wenn du etwas vergessen hast.</p>
			<p>Am Schluss gibt es eine neue Zeile: Das ist die Kopierersilbe. Schau dir das Zeichen einmal genau an. Der Strich bedeutet, dass der Vokal (Selbstlaut, Silbenkönig) lang ist. Daneben steht nur ein Kästchen, du musst dann nichts weiter tun.</p>
			<p>Aber wenn der Vokal kurz ist, dann müssen immer zwei Buchstaben geschrieben werden. Höre genau hin&nbsp;&ndash; kannst du zwischen Vokal und der Nasensilbe noch etwas anders hören? Z.B. bei &bdquo;Kin-der&ldquo; hörst du ein &bdquo;n&ldquo; und ein &bdquo;d&ldquo;. Das sind die zwei Kästchen im Bild. Das &bdquo;d&ldquo; steht schon in der Nasensilbe &bdquo;-der&ldquo;. Also schreibst du in die Kopierersilbe das &bdquo;n&ldquo; hinter das i: &bdquo;in&ldquo;.</p>
			<p>Ganz zum Schluss schreibst du das Wort noch einmal ganz richtig auf.</p>
		</div>
	</div>
	<div class="row mt-2">
		<div class="col-12 col-md-4 col-lg-3 px-sm-0">
			<img src="assets/img/help/5-1-essen.png" alt="Modul 5">
		</div>
		<div class="col px-sm-0">
			<p>Manchmal hörst du zwischen dem kurzen Vokal und der Nasensilbe keinen zweiten Buchstaben. Z.B. bei &bdquo;<mark>ES</mark>sen&ldquo; kommt als erster Vokal &bdquo;e&ldquo; und in die Nasensilbe &bdquo;sen&ldquo;. Aber zwischen &bdquo;e?sen&ldquo; hörst du keinen zweiten Buchstaben, nur das &bdquo;s&ldquo;. Also muss der Kopierer das &bdquo;s&ldquo; aus der Nasensilbe kopieren, das ist der Pfeil über dem Kästchen. Nun hat das Wort also zwei &bdquo;s&ldquo;. Deswegen ist es ja eine Kopierersilbe.</p>
		
			<h4 id="hinweisezutrennungen">Hinweise zu Trennungen</h4>
			<ol>
				<li>ng, tz und ck wird getrennt: sin-gen, Kat-ze, lec-ker</li>
				<li>ch kommt komplett in den Kopierer: ma-chen</li>
				<li>ein silbentrennendes h kommt in die Nasensilbe: se-hen</li>
			</ol>
		
			<h4 id="woertermitie">Wörter mit ie</h4>
			<p>Wenn du ein langes i hörst, schreibst du bisher eigentlich immer ie. Aber nun lernst du, dass man manchmal trotzdem nur &bdquo;i&ldquo; ohne &bdquo;e&ldquo; schreibt. Dafür gibt es eine einfache Regel:</p>
			<ol>
				<li>Schreibe einfach immer &bdquo;ie&ldquo; (z.B. in &bdquo;Dieb&ldquo; oder &bdquo;Liebe&ldquo;).</li>
				<li>Außer wenn die Wortfabrik am Anfang ein blaues Kästchen hat. Dann lässt man meistens das &bdquo;e&ldquo; weg und schreibt nur &bdquo;i&ldquo; (z.B. &bdquo;Motiv&ldquo; oder &bdquo;Maschine&ldquo;). Aber es gibt zwei Ausnahmen:</li>
				<li>Kommt nach dem langen i ein R, dann schreibst du ie (z.B. &bdquo;Klavier&ldquo;, &bdquo;Revier&ldquo;)</li>
				<li>Kommt nach dem langen i gar nichts mehr, dann schreibst du ie (z.B. &bdquo;Genie&ldquo;, &bdquo;Fotografie&ldquo;)</li>
			</ol>
		</div>
	</div>
	
	<h3 id="modul6">Modul 6: Dehnungs-h</h3>
	<div class="row mt-2">
		<div class="col-12 col-md-4 col-lg-3 px-sm-0">

		</div>
		<div class="col px-sm-0">
			<p>Hier funktioniert alles genauso wie im <a href="#modul5">Modul 5</a>. Da kannst du noch einmal nachlesen, wenn du etwas vergessen hast. </p>
			<p>In diesem Modul übst du das Dehnungs-h. Dafür musst du dir die Kopierersilbe genauer anschauen. Du musst jedesmal diese Fragen beantworten. Wenn du eine Frage mit &bdquo;nein&ldquo; beantwortest, kommt danach <strong>kein</strong> h.</p>
	
			<ol>
				<li>Ist der Vokal (Selbstlaut, Silbenkönig) lang? Wenn ja, dann:</li>
				<li>Ist die Wortfabrik am Anfang leer? Also in der ersten Spalte steht kein blaues Kästchen? Wenn ja, dann:</li>
				<li>&bdquo;<mark>L</mark>eg <mark>m</mark>ich <mark>n</mark>icht <mark>r</mark>ein&ldquo;: Kommt danach ein L, M, N oder R (z.B. Kohle, Bohne, Bohrer)? Wenn ja, dann:</li>
				<li>Beginnt das Wort <strong>nicht</strong> mit P, T, V oder kr, bl, sch oder qu (z.B. Polen, Ton, Vene, Schale …)? Wenn ja:</li>
				<li>Dann musst du nach dem Vokal ein h schreiben. Es sei denn, es ist ein Merkwort, leider (sowas wie wenn die Grundform &bdquo;kommen&ldquo; ist, dann &bdquo;kam" ohne h).</li>
			</ol>
		</div>
	</div>

	<h3 id="modul7">Modul 7: Großer Wörterpass</h3>
	<div class="row mt-2">
		<div class="col-12 col-md-4 col-lg-3 px-sm-0">
			<img src="assets/img/help/7-1-unfreundlich.png" alt="Modul 7">
		</div>
		<div class="col px-sm-0">
			<p>Hier gibt es zwei Arten von Übungen. Manchmal siehst du eine große Tabelle, manchmal zwei Tabellen. Ganz oben zerlegst du das Wort: In das erste Kästchen schreibst du die Vorsilbe (wenn es eine gibt), in das letzte Kästchen die Nachsilbe und in die Mitte den Rest. Wenn du zwei Tabellen siehst, dann sollst du ein zusammengesetztes Wort untersuchen. Die erste Tabelle ist dann für den ersten Teil des Wortes, die zweite Tabelle für den zweiten Teil.</p>
			<p>Dann überprüfst du das Wort so, wie du es schon in <a href="#modul5">Modul 5</a> gelernt hast. Früher stand am Schluss immer der Stift für die Lösung&nbsp;&ndash; jetzt schreibst du deine Lösung bei der Uhr ein. Das ist dein &bdquo;Zwischenspeicher&ldquo;. So merkst du dir, was du bisher über das Wort herausgefunden hast.</p>
		</div>
	</div>

	<div class="row mt-2">
		<div class="col-12 col-md-4 col-lg-3 px-sm-0">
			<img src="assets/img/help/7-2-unfreundlich.png" alt="Modul 7">
		</div>
		<div class="col px-sm-0">
			<p>Nun überlegst du, ob dir ein paar Rechtschreib-Strategien weiterhelfen: Kann man das Wort ableiten (z.B. &bdquo;Blätter&ldquo; von &bdquo;Blatt&ldquo;, also mit &bdquo;ä&ldquo;)? Kann man es weiterschwingen (&bdquo;Freund, Freun<strong>de</strong>&ldquo;, also mit &bdquo;d&ldquo;)? Hilft dir der Wortstamm weiter?</p>
			<p>Alle diese Zeilen werden nicht kontrolliert. Sie sollen dir nur helfen, das Wort richtig zu schreiben.</p>
			<p>In den letzten drei Fragen geht es um das Wort ganz oben, das Wort zum Anhören (z.B. &bdquo;unfreundlich&ldquo; oder &bdquo;Badehose&ldquo;). Diese drei Fragen werden kontrolliert: Schreibt man das Wort groß oder klein? Zu welcher Wortart gehört es? Und zum Schluss sollst du das Wort einmal richtig aufschreiben.</p>
		</div>
	</div>
</section>

<style>
	.content {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
	}
	section {
		margin: .5rem 0 1rem;
		display: block;
		clear: both;
	}
	img {
		width: auto;
		max-width: 100%;
		float: left;
		padding: .1rem;
		margin-right: .3rem;
		margin-bottom: 1rem;
		vertical-align: top;
	}
	h2, h3, h4 {
		clear: both;
		margin-top: 2rem;
		display: block;
	}
	h3 {
		padding-bottom: .2rem;
		border-bottom: 1px solid #ddd;
	}
	.kachel {
		font-size: 3rem;
		background: rgb(172, 230, 172);
		float: left;
		padding: .3rem;
		border-radius: 5px;
		margin: 0 .5rem .5rem 0;
	}
</style>
