	const api = {
		key: "883710f63e4383bc2fd1e058e89ea0ba",
	};
  const params = new URLSearchParams( globalLocation.search );
	let playing = false;
	const imgcache = new Image();

	function requestUpdate(api_key, user) {
		const url = `https://ws.audioscrobbler.com/2.0/?api_key=${api_key}&method=user.getRecentTracks&user=${user}&extended=1&limit=1&format=json`;

		let request = new Request(url, {
			"method": "GET",
		});

		return fetch(request);
	}

	function slide_out() {
		const el_info = document.querySelector(".info");
		el_info.classList.add("slideout");
		el_info.classList.remove("slidein");
	}

	function slide_in() {
		const el_info = document.querySelector(".info");
		el_info.classList.add("slidein");
		el_info.classList.remove("slideout");
	}

	function flip(cb) {
		const el_info = document.querySelector(".info");
		el_info.classList.add("flip");
		setTimeout(cb, 200);
		setTimeout(function() {el_info.classList.remove("flip");}, 500);
	}

	function successHandler(value) {
		value.json().then(data => {
			//console.log(data);
			let track = data.recenttracks.track[0];
			let img = track.image[0]["#text"];
			for (let imgdata of track.image) {
				img = imgdata["#text"];
			}
			if (img == "") {
				let art = track.artist;
				img = art.image[0]["#text"];
				for (let imgdata of art.image) {
					img = imgdata["#text"];
				}
			}
			if (img == "") {
				// Seems to be the default "no image" logo.
				img = "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png";
			}
			imgcache.src = img;

			let el_info = document.querySelector(".info");
			let el_logo = document.querySelector(".info .logo");
			let el_artist = document.querySelector(".info .artist");
			let el_title = document.querySelector(".info .title");

			if (track["@attr"] == undefined) {
				if (playing) {
					// Stop Playing
					console.log("Stopped playing track.");
					playing = false;
					slide_out();
				}
			} else if (playing == false) {
				// Start Playing
				console.log("Started playing track.");
				playing = true;
				imgcache.src = img;
				el_logo.src = img;
				el_artist.innerText = track.artist.name;
				el_title.innerText = track.name;
				slide_in();
			} else {
				// Track Change
				let old_artist = el_artist.innerText;
				let old_title = el_title.innerText;
				if ((old_artist != track.artist.name) || (old_title != track.name)) {
					console.log("Changed track.");
					flip(function() {
						el_logo.src = img;
						el_artist.innerText = track.artist.name;
						el_title.innerText = track.name;
					});
				}
			}
		}, reason => {
			slide_out();
		})
		setTimeout(tick, 15000);
	}

	function failureHandler(reason) {
		console.log("Last.FM Query failed:", reason);
		slide_out();
		setTimeout(tick, 60000);
	}

	function tick() {
		let rq = requestUpdate(api.key, params.get("user"));
		rq.then(successHandler, failureHandler);
		rq.catch(failureHandler);
	}
	
	(function() {
		tick();
	})();