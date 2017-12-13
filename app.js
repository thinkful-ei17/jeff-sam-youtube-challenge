'use strict';

const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const query = {
    q: `${searchTerm}`,
    per_page: 5,
    part: 'snippet',
    key: 'AIzaSyB7SZee8z4v5Ij9xDi3PTKAsZrQ6111aCc',
  };
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

// in:name

function renderResult(result) {
  console.log(result);
  return `
    <div>
      <h2>
      <a class="js-result-name" href="" target="_blank">${result.snippet.title}</a> by <a class="js-user-name" href="" target="_blank"></a>${result.snippet.channelTitle}</h2>
    
      <img src="${result.snippet.thumbnails.medium.url}">
    </div>
  `;
}

function displayYouTubeSearchData(data) {
  console.log(data);
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const searchTarget = $(event.currentTarget).find('.js-query');
    const searchTerm = searchTarget.val();
    // clear out the input
    searchTarget.val('');
    getDataFromApi(searchTerm, displayYouTubeSearchData);
  });
}

$(watchSubmit);
