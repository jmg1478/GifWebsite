const GIPHY_API_KEY = 'LU5RsLdby7qj4zBFFfHNRygXzE3zKCyd';

const searchCache = {};

const buildImageTags = (search) => {
	return searchCache[search].map(url => `<img src="${url}" /><br/>`)
}
// ================================================================================
function setGifs(searchVal) {
	document.getElementById('gifs').innerHTML = buildImageTags(searchVal);
}
	function searchGifs() {
		const searchVal = document.getElementById('searchGifs').value;
		if (!searchVal) {
			return alert('you need to enter some searchy things');
		}
		console.log(`going to start a search for: ${searchVal}`);
	
		fetch(`https://api.giphy.com/v1/gifs/search?q=${encodeURI(searchVal)}&api_key=${GIPHY_API_KEY}&limit=5`)
		.then(resp => resp.json())
		.then(data => {
			const gifs = data.data;
			console.log('we got gifs', gifs);
			if (gifs.length > 0) {
				const firstGif = gifs.find(el => el.type === 'gif');
				const imageUrl = firstGif.images.original.url;

				// pull out the image url and add it to the cache for future use!
				const urlsOnly = gifs.filter(gif => gif.type === 'gif').map(el => el.images.original.url);
				searchCache[searchVal] = urlsOnly;

			setGifs(searchVal);

		const searchHistory = document.getElementById('searchHistory');

			const setImageButton = document.createElement("button");
    setImageButton.innerText = `${searchVal}`;
    setImageButton.type = "button";
    setImageButton.onclick = () => setGifs(`${searchVal}`);
		console.log('append button', setImageButton);
			searchHistory.appendChild(setImageButton);

			}
		})
		.catch(err => console.log('oh no, an error happened', err));
	};