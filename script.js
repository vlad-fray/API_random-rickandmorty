'use strict';

const btn = document.querySelector('.btn');
const charactersContainer =
	document.querySelector('.characters');

const getAPI = (url) => {
	return fetch(url).then((res) => {
		if (!res) throw new Error('No access to this page');
		return res.json();
	});
};

const create3RandomCharacters = async () => {
	const chPage = await getAPI(
		'https://rickandmortyapi.com/api/character'
	).then((data) =>
		Math.floor(Math.random() * data.info.pages)
	);

	const chsData = await getAPI(
		`https://rickandmortyapi.com/api/character?page=${chPage}`
	);

	const characters = [...chsData.results];
	const ranChs = [
		Math.floor(Math.random() * characters.length),
		Math.floor(Math.random() * characters.length),
		Math.floor(Math.random() * characters.length),
	];

	return [
		characters[ranChs[0]],
		characters[ranChs[1]],
		characters[ranChs[2]],
	];
};

btn.addEventListener('click', function () {
	while (charactersContainer.firstChild) {
		charactersContainer.removeChild(
			charactersContainer.firstChild
		);
	}
	create3RandomCharacters().then((data) => {
		data.forEach((char) => {
			console.log(char);
			charactersContainer.insertAdjacentHTML(
				'beforeend',
				`
          <div class="character-wrp">
            <img
              src="${char.image}"
              class="character-image"
            />
            <span>Name: ${char.name}</span>
            <span>Gender: ${char.gender}</span>
            <span>Location: ${char.location.name}</span>
            <span>Species: ${char.species}</span>
            <span>Status: ${char.status}</span>
          </div>
        `
			);
		});
	});
});
