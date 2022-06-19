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
	<h1 id="fuerlehrerinnen">Für Lehrer*innen</h1>
	<p>Mein Name ist Johannes Wilke, ich bin Deutschlehrer an einer Berliner Grundschule. Ich habe diese App zusammen mit einem befreundeten Programmierer erarbeitet, damit wir an unserer Schule noch besser mit den Wörterpässen arbeiten können. Hinter dieser App steckt also keine große Firma, sondern zwei Menschen mit einer Idee. Dafür kommen wir direkt aus der Praxis, und ich hoffe, das merkt man bei der Benutzung der App:</p>
	<p>Auf dieser Seite möchte ich Ihnen ein paar Details schildern, die Ihnen die Arbeit mit unseren Wörterpässen mit der Klasse erleichtern können. Allgemeine Hinweise zur Benutzung der App finden Sie in der <a href="/hilfe">Hilfe für Eltern und Schüler*innen</a>.</p>

	<h2 id="inhalt">Inhalt:</h2>
	<nav>
		<li><a href="#module">Was sind Module (Übungen)?</a></li>
		<li><a href="#alleModule">Überblick über die Module</a></li>
		<li><a href="#stufen">Was sind Stufen?</a></li>
		<li><a href="#alleStufen">Überblick über die Stufen</a></li>
		<li><a href="#vokallaenge">Vokallänge</a></li>
		<li><a href="#statistik">Statistik</a></li>
		<li><a href="#QR">QR-Codes für Arbeitsblätter</a></li>
		<li><a href="#weiterbildung">Weiterbildung zu Wörterpässen</a></li>
	</nav>

	<h2 id="module">Was sind Module (Übungen)?</h2>
	<p>Es gibt insgesamt 7 Module. Sie bauen aufeinander auf, daher ist es ratsam, bei Modul 1 oder 2 zu beginnen.</p>
	<p>An unserer Schule haben wir uns überlegt, die Wörterpässe schrittweise ab der ersten Klasse einzuführen und dann in jeder Klassenstufe um einen neuen Baustein zu erweitern. Im Idealfall würden die Kinder am Ende der ersten Klasse Modul 1 und 2 beherrschen, und sich dann in Klasse 2 mit Modul 3 beschäftigen. In Klasse 3 dann Modul 4, in Klasse 4 Modul 5 und so weiter.</p>
	<p>Natürlich kann man auch in Klasse 5 noch mit Modul 1 einsteigen. Deswegen nennen wir sie &bdquo;Modul 1&ldquo; und nicht &bdquo;Klasse 1&ldquo; …</p>
	<p><img src="assets/help/img/1-2-Modulfarbe.png" class="float-left" alt="Modulfarbe"> Jedes Modul hat eine eigene Farbe. Sie finden sie während des Übens in der rechten oberen Ecke. So können Sie aus der Entfernung sehen, ob jemand versehentlich ein falsches Modul bearbeitet.</p>

	<h3 id="alleModule">Überblick über die Module</h3>
	<table>
		<tr>
			<th>Modul</th>
			<th>Was wird trainiert?</th>
		</tr>
		<tr>
			<td>
				<div class="btn modul-btn moduleBg-1">
					<span>Modul 1</span> 
					<img src="assets/img/modul1-w.svg" alt="Modul 1"> 
				</div>
			</td>
			<td class="verticle-align-middle">Silbenbögen </td>
		</tr>
		<tr>
			<td>
				<div class="btn modul-btn moduleBg-2">
					<span>Modul 2</span> 
					<img src="assets/img/modul2-w.svg" alt="Modul 2"> 
				</div>
			</td>
			<td class="verticle-align-middle">Silbenbögen, Vokal, Vokallänge</td>
		</tr>
		<tr>
			<td>
				<div class="btn modul-btn moduleBg-3">
					<span>Modul 3</span> 
					<img src="assets/img/modul3-w.svg" alt="Modul 3"> 
				</div>
			</td>
			<td class="verticle-align-middle">Silbenbögen, Wortfabrik</td>
		</tr>
		<tr>
			<td>
				<div class="btn modul-btn moduleBg-4">
					<span>Modul 4</span> 
					<img src="assets/img/modul4-w.svg" alt="Modul 4"> 
				</div>
			</td>
			<td class="verticle-align-middle">Einführung des Mini-Wörterpasses (mit Nasensilbe/Schwa)</td>
		</tr>
		<tr>
			<td>
				<div class="btn modul-btn moduleBg-5">
					<span>Modul 5</span> 
					<img src="assets/img/modul5-w.svg" alt="Modul 5"> 
				</div>
			</td>
			<td class="verticle-align-middle">Kleiner Wörterpass (mit Kopierer)</td>
		</tr>
		<tr>
			<td>
				<div class="btn modul-btn moduleBg-6">
					<span>Modul 6</span> 
					<img src="assets/img/modul6-w.svg" alt="Modul 6"> 
				</div>
			</td>
			<td class="verticle-align-middle">Kleiner Wörterpass (Dehnungs-h)</td>
		</tr>
		<tr>
			<td>
				<div class="btn modul-btn moduleBg-7">
					<span>Modul 7</span> 
					<img src="assets/img/modul7-w.svg" alt="Modul 7"> 
				</div>
			</td>
			<td class="verticle-align-middle">Großer Wörterpass (Wörter mit Vor-/Nachsilben, zusammengesetzte Wörter)</td>
		</tr>
	</table>

	<h2 id="stufen">Was sind Stufen?</h2>
	<p>Ein Modul trainiert eine Methode. In den verschiedenen Stufen eines Moduls wenden die Kinder diese Methode auf verschiedene Rechtschreibphänomene an. Zum Beispiel wird in Modul 5 der &bdquo;Kopierer&ldquo; eingeführt. Diese Methode wird dann geübt in einer Stufe für Doppelkonsonanten, einer Stufe für z/tz, einer Stufe für k/ck und einer Stufe für die s-Laute.</p>
	<p>Während es sehr ratsam ist, die Module in der vorgegebenen Reihenfolge zu bearbeiten, sind die Stufen teilweise zum differenzierten Üben erstellt worden. Oft gibt es eine Art &bdquo;Zusammenfassung&ldquo; aller bisher geübten Phänomene, oder eine Erweiterung um mehr Silben etc., die sich als Zusatzaufgabe für leistungsstarke Kinder oder als Übung vor einer Klassenarbeit anbieten. Ebenso bietet etwa der Mini-Wörterpass (Modul 4) mit Stufe A einen reduzierten Wortschatz an, der evtl. eher zur Förderung leistungsschwächerer Kinder geeignet ist, während der Rest der Klasse direkt in Stufe B einsteigen könnte. Die Auswahl der zur Lerngruppe passenden Stufe ist also zu überlegen.</p>
	<p>Man muss niemals sämtliche Stufen bearbeitet haben, bevor man zum nächsten Modul übergeht.</p>

	<h3 id="alleStufen">Überblick über die Stufen</h3>
	<table class="scrollTable">
		<tr>
			<th>Modul</th>
			<th>Stufe</th>
			<th>Beispiel</th>
		</tr>
		<tr>
			<td>Modul 1-3</td>
			<td>A &bdquo;anfangsbetonte Ein- und Zweisilber&ldquo;</td>
			<td>Hund vs. Katze</td>
		</tr>
		<tr>
			<td></td>
			<td>B &bdquo;anfangs- und endbetonte Zweisilber&ldquo;</td>
			<td>Katze vs. Delfin</td>
		</tr>
		<tr>
			<td></td>
			<td>C &bdquo;auch mittenbetonte Dreisilber&ldquo;</td>
			<td>Hund, Katze, Delfin, Giraffe</td>
		</tr>
		<tr>
			<td></td>
			<td>D &bdquo;auch vier und mehr Silben&ldquo;</td>
			<td>alle Wörter der Stufe C sowie &bdquo;Lokomotive&ldquo; etc., schwierige Lernwörter des Grundwortschatzes</td>
		</tr>
		<tr>
			<td>Modul 4</td>
			<td>A &bdquo;anfangsbetonte Ein- und Zweisilber&ldquo;</td>
			<td>Hund vs. Katze</td>
		</tr>
		<tr>
			<td></td>
			<td>B &bdquo;anfangs-, mitten- und endbetonte Ein- bis Dreisilber&ldquo;</td>
			<td>Hund, Katze, Delfin, Giraffe</td>
		</tr>
		<tr>
			<td></td>
			<td>C &bdquo;auch vier und mehr Silben&ldquo;</td>
			<td>alle Wörter wie in Stufe B sowie &bdquo;Lokomotive&ldquo; etc., schwierige Lernwörter des Grundwortschatzes</td>
		</tr>
		<tr>
			<td></td>
			<td>D &bdquo;anfangsbetonte Wörter mit ie&ldquo;</td>
			<td>Lied vs. Bild</td>
		</tr>
		<tr>
			<td></td>
			<td>E &bdquo;anfangsbetonte Wörter mit ie und regelhafte anfangsunbetonte Wörter mit i&ldquo;</td>
			<td>Delfin vs. Fliege</td>
		</tr>
		<tr>
			<td></td>
			<td>F &bdquo;anfangsunbetonte Wörter mit i und ie&ldquo;</td>
			<td>Delfin vs. Genie/dosieren</td>
		</tr>
		<tr>
			<td></td>
			<td>G &bdquo;alles bisherige&ldquo;</td>
			<td>alle Wörter des gesamten Moduls</td>
		</tr>
		<tr>
			<td>Modul 5</td>
			<td>A &bdquo;doppelte Mitlaute (außer tz, ck, s-Laute)&ldquo;</td>
			<td>alle vs. Ale</td>
		</tr>
		<tr>
			<td></td>
			<td>B &bdquo;Wörter mit z oder tz&ldquo;</td>
			<td>Kerze vs. Katze</td>
		</tr>
		<tr>
			<td></td>
			<td>C &bdquo;Wörter mit k oder ck&ldquo;</td>
			<td>stark vs. Stück</td>
		</tr>
		<tr>
			<td></td>
			<td>D &bdquo;s-Laute&ldquo;</td>
			<td>bloß vs. Boss vs. lose</td>
		</tr>
		<tr>
			<td></td>
			<td>E &bdquo;doppelte Mitlaute inklusive s-Laute&ldquo;</td>
			<td>alle Wörter des gesamten Moduls</td>
		</tr>
		<tr>
			<td>Modul 6</td>
			<td>A &bdquo;Dehnungs-h&ldquo;</td>
			<td>Ohr vs. pur</td>
		</tr>
		<tr>
			<td></td>
			<td>B &bdquo;Dehnungs-h, Wörter mit ie, doppelte Mitlaute inklusive s-Laute&ldquo;</td>
			<td>alle Wörter aus Modul 5 und 6</td>
		</tr>
		<tr>
			<td>Modul 7</td>
			<td>A &bdquo;Wörter mit Vorsilbe&ldquo;</td>
			<td>bemerken, Umweg</td>
		</tr>
		<tr>
			<td></td>
			<td>B &bdquo;Wörter mit Nachsilbe&ldquo;</td>
			<td>essbar, Hoffnung</td>
		</tr>
		<tr>
			<td></td>
			<td>C "Wörter mit Vor- und Nachsilbe&ldquo;</td>
			<td>Erholung, unpünktlich</td>
		</tr>
		<tr>
			<td></td>
			<td>D &bdquo;Wörter mit Vor-, Nachsilbe oder beidem&ldquo;</td>
			<td>alle bisherigen Wörter dieses Moduls</td>
		</tr>
		<tr>
			<td></td>
			<td>E &bdquo;zusammengesetzte Wörter&ldquo;</td>
			<td>Gartentor, zuckersüß</td>
		</tr>
	</table>

	<h2 id="vokallaenge">Vokallänge</h2>
	<div class="row mt-2">
		<div class="col-12 col-md-4 col-lg-3 px-sm-0">
			<img src="assets/help/img/2-1-Schule.png" class="float-left" alt="Vokallänge">
		</div>
		<div class="col px-sm-0">
			<p>In Modul 2 wird die Vokallänge eingeführt. Vielen Kindern bereitet es anfangs Schwierigkeiten zu hören, ob ein Vokal lang oder kurz ist. Zur Unterstützung ist unter der Aufgabe eine Reihe mit allen Vokalen dargestellt. Wenn man einen Buchstaben anklickt, hört man den jeweiligen Vokal einmal lang und einmal kurz gesprochen, so wie wir es in der Klasse üben (z.B. &bdquo;Uuuu wie Uhr, U wie Unterhose.&ldquo;)</p>
		</div>
	</div>

	<h2 id="statistik">Statistik</h2>
	<div class="row mt-2">
		<div class="col-12 col-md-4 col-lg-3 px-sm-0">
			<img src="assets/help/img/0-1-Kurzstatistik.png" alt="Kurzstatistik">
		</div>
		<div class="col px-sm-0">
			<p>Bei jedem Wort hat das Kind zwei Versuche, anschließend wird ein neues Wort angezeigt. Oben rechts ist eine Anzeige, wie viele Wörter bisher in dieser Aufgabe bearbeitet wurden und wie viele davon richtig beantwortet wurden (egal ob beim ersten oder zweiten Versuch). So können Sie den Kindern sagen, sie sollen z.B. 10 Wörter auf Stufe A beantworten (oder 10 Wörter richtig beantworten), und danach bei Stufe B weiterarbeiten. In unserem Beispiel wurden bisher drei Wörter bearbeitet, davon wurden zwei korrekt gelöst.</p>
		</div>
	</div>
	<div class="row mt-2">
		<div class="col-12 col-md-4 col-lg-3 px-sm-0">
			<img src="assets/help/img/0-1-Auswertung.png" alt="Auswertung">
		</div>
		<div class="col px-sm-0">
			<p>Wenn man auf diese Anzeige oben rechts klickt, kommt man zu einer detaillierte Fehleranalyse. Dort sehen Sie sämtliche Aufgabenbereiche des Wörterpasses, sowie eine Angabe, wie viele richtige Antworten bei welcher Anzahl von Versuchen gegeben wurde. Im Beispiel sehen Sie, dass bei Silbenbögen &bdquo;5 von 5&ldquo; korrekt waren. Sie wurden also alle beim ersten Versuch richtig gelöst; das Kind beherrscht das gut. Bei Vokalen wurden &bdquo;6 von 7&ldquo; richtig gelöst, es gab also nur kurz eine kleine Unsicherheit, so dass das Kind einen zweiten Versuch benötigt hat, um den Fehler zu finden. Die Längen hingegen wurden nur in &bdquo;3 von 7&ldquo; Fällen korrekt gelöst, das Kind muss das also besonders trainieren.</p>
			<p>Neben jedem Eintrag steht jeweils ein Fragezeichen. Wenn das Kind darauf klickt, erfährt es, in welchem Modul diese Technik besonders geübt wird. Auf diese Weise könnten die Kinder oder Eltern Probleme selbst erkennen und die passenden Übungen finden.</p>
			<p>Achtung: Alle Statistiken sind nur innerhalb einer Stufe verfügbar. Wenn ein Kind zur nächsten Übung wechselt, wird alles wieder auf Null gesetzt!</p>
			<p>Diese Seite verwendet keinerlei Cookies. Deswegen können Statistiken nicht gespeichert oder zentral von der Lehrkraft eingesehen werden. Aber dafür gibt es auch keine Datenschutzbedenken und Sie müssen kein Einverständnis holen, bevor die Kinder damit arbeiten.</p>
		</div>
	</div>

	<h2 id="QR">QR-Codes für Arbeitsblätter</h2>
	<p>Ihre Klasse kann die Domain auch mit ö eintippen: <a href="https://www.wörterpass.de">www.wörterpass.de</a> (aus technischen Gründen wird es zu oe umgewandelt, aber das müssen sich die Kinder nicht merken). Zudem können Sie direkt auf eine konkrete Stufe verlinken, z.B. in einer Lektion zum ck: <a href="https://www.wörterpass.de/5c">www.wörterpass.de/5c</a></p>
	<p>Sie können auf Ihre Arbeitsblätter oder auf Aufkleber im Klassenzimmer (z.B. bei Stationsarbeit in einer Tablet-Klasse) auch QR-Codes drucken. Diese werden von Ihren Schülern dann mit der Handykamera gescannt und leiten direkt in eine konkrete Übung weiter. In der Tabelle finden Sie die QR-Codes für jede Übung. Achten Sie darauf, dass der Code wenigstens 3cm groß ist, damit er verlässlich gescannt werden kann.</p>
	
	<h3>Modul 1</h3>
	<div class="row">
		<div class="col-12 col-md-6 px-sm-0">
			<a href="assets/img/qr/1a.png" class="card">
				<img src="assets/img/qr/1a.png" alt="1a" />
				<div>
					<h4>Modul 1-A</h4> 
					<span>&bdquo;anfangsbetonte Ein- und Zweisilber&ldquo;</span>
					<p><b>Beispiel:</b> Hund vs. Katze</p>
					<div class="download">Download QR-Code</div>
				</div>
			</a>
		</div>
		<div class="col-12 col-md-6 px-sm-0">
			<a href="assets/img/qr/1b.png" class="card">
				<img src="assets/img/qr/1b.png" alt="1b" />
				<div>
					<h4>Modul 1-B</h4> 
					<span>&bdquo;anfangs- und endbetonte Zweisilber&ldquo;</span>
					<p><b>Beispiel:</b> Katze vs. Delfin</p>
					<div class="download">Download QR-Code</div>
				</div>
			</a>
		</div>
		<div class="col-12 col-md-6 px-sm-0">
			<a href="assets/img/qr/1c.png" class="card">
				<img src="assets/img/qr/1c.png" alt="1c" />
				<div>
					<h4>Modul 1-C</h4> 
					<span>&bdquo;auch mittenbetonte Dreisilber&ldquo;</span>
					<p><b>Beispiel:</b> Hund, Katze, Delfin, Giraffe</p>
					<div class="download">Download QR-Code</div>
				</div>
			</a>
		</div>
		<div class="col-12 col-md-6 px-sm-0">
			<a href="assets/img/qr/1d.png" class="card">
				<img src="assets/img/qr/1d.png" alt="1d" />
				<div>
					<h4>Modul 1-D</h4> 
					<span>&bdquo;auch vier und mehr Silben&ldquo;</span>
					<p><b>Beispiel:</b> alle Wörter der Stufe C sowie &bdquo;Lokomotive&ldquo; etc., schwierige Lernwörter des Grundwortschatzes</p>
					<div class="download">Download QR-Code</div>
				</div>
			</a>
		</div>
	</div>

	<h3>Modul 2</h3>
	<div class="row">
		<div class="col-12 col-md-6 px-sm-0">
			<a href="assets/img/qr/2a.png" class="card">
				<img src="assets/img/qr/2a.png" alt="2a" />
				<div>
					<h4>Modul 2-A</h4> 
					<span>&bdquo;anfangsbetonte Ein- und Zweisilber&ldquo;</span>
					<p><b>Beispiel:</b> Hund vs. Katze</p>
					<div class="download">Download QR-Code</div>
				</div>
			</a>
		</div>
		<div class="col-12 col-md-6 px-sm-0">
			<a href="assets/img/qr/2b.png" class="card">
				<img src="assets/img/qr/2b.png" alt="2b" />
				<div>
					<h4>Modul 2-B</h4> 
					<span>&bdquo;anfangs- und endbetonte Zweisilber&ldquo;</span>
					<p><b>Beispiel:</b> Katze vs. Delfin</p>
					<div class="download">Download QR-Code</div>
				</div>
			</a>
		</div>
		<div class="col-12 col-md-6 px-sm-0">
			<a href="assets/img/qr/2c.png" class="card">
				<img src="assets/img/qr/2c.png" alt="2c" />
				<div>
					<h4>Modul 2-C</h4> 
					<span>&bdquo;auch mittenbetonte Dreisilber&ldquo;</span>
					<p><b>Beispiel:</b> Hund, Katze, Delfin, Giraffe</p>
					<div class="download">Download QR-Code</div>
				</div>
			</a>
		</div>
		<div class="col-12 col-md-6 px-sm-0">
			<a href="assets/img/qr/2d.png" class="card">
				<img src="assets/img/qr/2d.png" alt="2d" />
				<div>
					<h4>Modul 2-D</h4> 
					<span>&bdquo;auch vier und mehr Silben&ldquo;</span>
					<p><b>Beispiel:</b> alle Wörter der Stufe C sowie &bdquo;Lokomotive&ldquo; etc., schwierige Lernwörter des Grundwortschatzes</p>
					<div class="download">Download QR-Code</div>
				</div>
			</a>
		</div>
	</div>

	<h3>Modul 3</h3>
	<div class="row">
		<div class="col-12 col-md-6 px-sm-0">
			<a href="assets/img/qr/3a.png" class="card">
				<img src="assets/img/qr/3a.png" alt="3a" />
				<div>
					<h4>Modul 3-A</h4> 
					<span>&bdquo;anfangsbetonte Ein- und Zweisilber&ldquo;</span>
					<p><b>Beispiel:</b> Hund vs. Katze</p>
					<div class="download">Download QR-Code</div>
				</div>
			</a>
		</div>
		<div class="col-12 col-md-6 px-sm-0">
			<a href="assets/img/qr/3b.png" class="card">
				<img src="assets/img/qr/3b.png" alt="3b" />
				<div>
					<h4>Modul 3-B</h4> 
					<span>&bdquo;anfangs- und endbetonte Zweisilber&ldquo;</span>
					<p><b>Beispiel:</b> Katze vs. Delfin</p>
					<div class="download">Download QR-Code</div>
				</div>
			</a>
		</div>
		<div class="col-12 col-md-6 px-sm-0">
			<a href="assets/img/qr/3c.png" class="card">
				<img src="assets/img/qr/3c.png" alt="3c" />
				<div>
					<h4>Modul 3-C</h4> 
					<span>&bdquo;auch mittenbetonte Dreisilber&ldquo;</span>
					<p><b>Beispiel:</b> Hund, Katze, Delfin, Giraffe</p>
					<div class="download">Download QR-Code</div>
				</div>
			</a>
		</div>
		<div class="col-12 col-md-6 px-sm-0">
			<a href="assets/img/qr/3d.png" class="card">
				<img src="assets/img/qr/3d.png" alt="3d" />
				<div>
					<h4>Modul 3-D</h4> 
					<span>&bdquo;auch vier und mehr Silben&ldquo;</span>
					<p><b>Beispiel:</b> alle Wörter der Stufe C sowie &bdquo;Lokomotive&ldquo; etc., schwierige Lernwörter des Grundwortschatzes</p>
					<div class="download">Download QR-Code</div>
				</div>
			</a>
		</div>
	</div>

	<h3>Modul 4</h3>
	<div class="row">
		<div class="col-12 col-md-6 px-sm-0">
			<a href="assets/img/qr/4a.png" class="card">
				<img src="assets/img/qr/4a.png" alt="4a" />
				<div>
					<h4>Modul 4-A</h4> 
					<span>&bdquo;anfangsbetonte Ein- und Zweisilber&ldquo;</span>
					<p><b>Beispiel:</b> Hund vs. Katze</p>
					<div class="download">Download QR-Code</div>
				</div>
			</a>
		</div>
		<div class="col-12 col-md-6 px-sm-0">
			<a href="assets/img/qr/4b.png" class="card">
				<img src="assets/img/qr/4b.png" alt="4b" />
				<div>
					<h4>Modul 4-B</h4> 
					<span>&bdquo;anfangs-, mitten- und endbetonte Ein- bis Dreisilber&ldquo;</span>
					<p><b>Beispiel:</b> Hund, Katze, Delfin, Giraffe</p>
					<div class="download">Download QR-Code</div>
				</div>
			</a>
		</div>
		<div class="col-12 col-md-6 px-sm-0">
			<a href="assets/img/qr/4c.png" class="card">
				<img src="assets/img/qr/4c.png" alt="4c" />
				<div>
					<h4>Modul 4-C</h4> 
					<span>&bdquo;auch vier und mehr Silben&ldquo;</span>
					<p><b>Beispiel:</b> alle Wörter wie in Stufe B sowie &bdquo;Lokomotive&ldquo; etc., schwierige Lernwörter des Grundwortschatzes</p>
					<div class="download">Download QR-Code</div>
				</div>
			</a>
		</div>
		<div class="col-12 col-md-6 px-sm-0">
			<a href="assets/img/qr/4d.png" class="card">
				<img src="assets/img/qr/4d.png" alt="4d" />
				<div>
					<h4>Modul 4-D</h4> 
					<span>&bdquo;anfangsbetonte Wörter mit ie&ldquo;</span>
					<p><b>Beispiel:</b> Lied vs. Bild</p>
					<div class="download">Download QR-Code</div>
				</div>
			</a>
		</div>
		<div class="col-12 col-md-6 px-sm-0">
			<a href="assets/img/qr/4e.png" class="card">
				<img src="assets/img/qr/4e.png" alt="4e" />
				<div>
					<h4>Modul 4-E</h4> 
					<span>&bdquo;anfangsbetonte Wörter mit ie und regelhafte anfangsunbetonte Wörter mit i&ldquo;</span>
					<p><b>Beispiel:</b> Delfin vs. Fliege</p>
					<div class="download">Download QR-Code</div>
				</div>
			</a>
		</div>
		<div class="col-12 col-md-6 px-sm-0">
			<a href="assets/img/qr/4f.png" class="card">
				<img src="assets/img/qr/4f.png" alt="4f" />
				<div>
					<h4>Modul 4-F</h4> 
					<span>&bdquo;anfangsunbetonte Wörter mit i und ie&ldquo;</span>
					<p><b>Beispiel:</b> Delfin vs. Genie/dosieren</p>
					<div class="download">Download QR-Code</div>
				</div>
			</a>
		</div>
		<div class="col-12 col-md-6 px-sm-0">
			<a href="assets/img/qr/4g.png" class="card">
				<img src="assets/img/qr/4g.png" alt="4g" />
				<div>
					<h4>Modul 4-G</h4> 
					<span>&bdquo;alles bisherige&ldquo;</span>
					<p><b>Beispiel:</b> alle Wörter des gesamten Moduls</p>
					<div class="download">Download QR-Code</div>
				</div>
			</a>
		</div>
	</div>

	<h3>Modul 5</h3>
	<div class="row">
		<div class="col-12 col-md-6 px-sm-0">
			<a href="assets/img/qr/5a.png" class="card">
				<img src="assets/img/qr/5a.png" alt="5a" />
				<div>
					<h4>Modul 5-A</h4> 
					<span>&bdquo;doppelte Mitlaute (außer tz, ck, s-Laute)&ldquo;</span>
					<p><b>Beispiel:</b> alle vs. Ale</p>
					<div class="download">Download QR-Code</div>
				</div>
			</a>
		</div>
		<div class="col-12 col-md-6 px-sm-0">
			<a href="assets/img/qr/5b.png" class="card">
				<img src="assets/img/qr/5b.png" alt="5b" />
				<div>
					<h4>Modul 5-B</h4> 
					<span>&bdquo;Wörter mit z oder tz&ldquo;</span>
					<p><b>Beispiel:</b> Kerze vs. Katze</p>
					<div class="download">Download QR-Code</div>
				</div>
			</a>
		</div>
		<div class="col-12 col-md-6 px-sm-0">
			<a href="assets/img/qr/5c.png" class="card">
				<img src="assets/img/qr/5c.png" alt="5c" />
				<div>
					<h4>Modul 5-C</h4> 
					<span>&bdquo;Wörter mit k oder ck&ldquo;</span>
					<p><b>Beispiel:</b> stark vs. Stück</p>
					<div class="download">Download QR-Code</div>
				</div>
			</a>
		</div>
		<div class="col-12 col-md-6 px-sm-0">
			<a href="assets/img/qr/5d.png" class="card">
				<img src="assets/img/qr/5d.png" alt="5d" />
				<div>
					<h4>Modul 5-D</h4> 
					<span>&bdquo;s-Laute&ldquo;</span>
					<p><b>Beispiel:</b> bloß vs. Boss vs. lose</p>
					<div class="download">Download QR-Code</div>
				</div>
			</a>
		</div>
		<div class="col-12 col-md-6 px-sm-0">
			<a href="assets/img/qr/5e.png" class="card">
				<img src="assets/img/qr/5e.png" alt="5e" />
				<div>
					<h4>Modul 5-E</h4> 
					<span>&bdquo;doppelte Mitlaute inklusive s-Laute&ldquo;</span>
					<p><b>Beispiel:</b> alle Wörter des gesamten Moduls</p>
					<div class="download">Download QR-Code</div>
				</div>
			</a>
		</div>
	</div>

	<h3>Modul 6</h3>
	<div class="row">
		<div class="col-12 col-md-6 px-sm-0">
			<a href="assets/img/qr/6a.png" class="card">
				<img src="assets/img/qr/6a.png" alt="6a" />
				<div>
					<h4>Modul 6-A</h4> 
					<span>&bdquo;Dehnungs-h&ldquo;</span>
					<p><b>Beispiel:</b> Ohr vs. pur</p>
					<div class="download">Download QR-Code</div>
				</div>
			</a>
		</div>
		<div class="col-12 col-md-6 px-sm-0">
			<a href="assets/img/qr/6b.png" class="card">
				<img src="assets/img/qr/6b.png" alt="6b" />
				<div>
					<h4>Modul 6-B</h4> 
					<span>&bdquo;Dehnungs-h, Wörter mit ie, doppelte Mitlaute inklusive s-Laute&ldquo;</span>
					<p><b>Beispiel:</b> alle Wörter aus Modul 5 und 6</p>
					<div class="download">Download QR-Code</div>
				</div>
			</a>
		</div>
	</div>

	<h3>Modul 7</h3>
	<div class="row">
		<div class="col-12 col-md-6 px-sm-0">
			<a href="assets/img/qr/7a.png" class="card">
				<img src="assets/img/qr/7a.png" alt="7a" />
				<div>
					<h4>Modul 7-A</h4> 
					<span>&bdquo;Wörter mit Vorsilbe&ldquo;</span>
					<p><b>Beispiel:</b> bemerken, Umweg</p>
					<div class="download">Download QR-Code</div>
				</div>
			</a>
		</div>
		<div class="col-12 col-md-6 px-sm-0">
			<a href="assets/img/qr/7b.png" class="card">
				<img src="assets/img/qr/7b.png" alt="7b" />
				<div>
					<h4>Modul 7-B</h4> 
					<span>&bdquo;Wörter mit Nachsilbe&ldquo;</span>
					<p><b>Beispiel:</b> essbar, Hoffnung</p>
					<div class="download">Download QR-Code</div>
				</div>
			</a>
		</div>
		<div class="col-12 col-md-6 px-sm-0">
			<a href="assets/img/qr/7c.png" class="card">
				<img src="assets/img/qr/7c.png" alt="7c" />
				<div>
					<h4>Modul 7-C</h4> 
					<span>&bdquo;Wörter mit Vor- und Nachsilbe&ldquo;</span>
					<p><b>Beispiel:</b> Erholung, unpünktlich</p>
					<div class="download">Download QR-Code</div>
				</div>
			</a>
		</div>
		<div class="col-12 col-md-6 px-sm-0">
			<a href="assets/img/qr/7d.png" class="card">
				<img src="assets/img/qr/7d.png" alt="7d" />
				<div>
					<h4>Modul 7-D</h4> 
					<span>&bdquo;Wörter mit Vor-, Nachsilbe oder beidem&ldquo;</span>
					<p><b>Beispiel:</b> alle bisherigen Wörter dieses Moduls</p>
					<div class="download">Download QR-Code</div>
				</div>
			</a>
		</div>
		<div class="col-12 col-md-6 px-sm-0">
			<a href="assets/img/qr/7e.png" class="card">
				<img src="assets/img/qr/7e.png" alt="7e" />
				<div>
					<h4>Modul 7-E</h4> 
					<span>&bdquo;zusammengesetzte Wörter&ldquo;</span>
					<p><b>Beispiel:</b> Gartentor vs. zuckersüß</p>
					<div class="download">Download QR-Code</div>
				</div>
			</a>
		</div>
	</div>

	<h2 id="weiterbildung">Weiterbildung zu Wörterpässen</h2>
	<p>Ich kann die Weiterbildungen von Maria Seyed Nassir wärmstens empfehlen. Sie gibt regelmäßig in Berlin Fortbildungen zu diversen Deutsch-Themen, zu finden unter <a href="https://fortbildung-regional.de/">www.fortbildung-regional.de</a></p>

</section>

<style>
	.content {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
	}
	img {
		width: auto;
		max-width: 100%;
		margin-right: .3rem;
		vertical-align: top;
	}
	h2 {
		padding-bottom: .2rem;
		border-bottom: 1px solid #ddd;
		margin-top: 3rem;
	}
	h3 {
		margin-top: 2rem;
	}
	table tr:nth-child(even) {
		background: linear-gradient(90deg, #f6f6f6, transparent);
	}
	table th {
		font-weight: 600;
	}
	table tr > * {
		padding: .2rem .5rem;
	}
	.modul-btn {
		position: relative;
		width: 120px;
		height: 120px;
		display: flex;
    	align-items: center;
		cursor: default;
	}
	.verticle-align-middle {
		vertical-align: middle;
	}
	.modul-btn span,
	.download {
		position: absolute;
		font-size: 1rem;
		font-weight: 600;
		top: 5px;
		left: 5px;
		height: 25px;
		border-radius: 15px;
		padding: 0 10px;
		background: rgba(255,255,255,.6);
		color: rgba(0,0,0,.75);
		display: flex;
		align-items: center;
		justify-content: center;
		text-shadow: 0 0 5px rgba(255,255,255,.5);
	}
	.download {
		display: inline;
		top: unset;
		left: unset;
		bottom: .5rem;
		right: .5rem;
		width: auto;
		padding: .2rem .75rem;
		height: unset;
	}
	.card {
		position: relative;
		background: #eef;
		border-radius: 10px;
		padding: .5rem;
		margin: .5rem 0;
		display: flex;
		flex-direction: row;
		color: black;
		text-decoration: none;
		cursor: pointer;
	}
	.card img {
		border-radius: 8px;
		width: 33%;
		height: 100%;
		margin-right: 1rem;
	}
	.card h4 {
		margin-top: .25rem;
	}
	.card:hover .download {
		text-decoration: underline;
	}
	.card p,
	.card span {
		display: block;
	}
	@media (max-width:576px){
		.modul-btn span {
			top: 2px !important;
			left: 2px !important;
		}
		.scrollTable {
			overflow-x: auto;
			display: block;
			position: relative;
			box-shadow: inset -10px -5px 10px -10px rgba(0,0,0,.5), 1px 0 3px -2px rgba(0,0,0,.5);
		}
		.card p {
			margin-bottom: 2rem;
		}
	}
</style>
