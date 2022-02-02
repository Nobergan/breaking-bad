const baseUrl = 'https://www.breakingbadapi.com/api/';

function fetchEpisodes() {
    const url = `${baseUrl}episodes`;

    return fetch(url).then(res => res.json()).then(data => data).catch(error => error)
}

export default fetchEpisodes;