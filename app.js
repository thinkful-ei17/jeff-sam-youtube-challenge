'use strict';
/* global $ */

const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

let nextPageTokenValue = '';
let previousPageTokenValue = '';
let pageTokenValue = '';
let searchTerm = '';

function getDataFromApi(searchTerm, callback) {
  const query = {
    q: searchTerm,
    maxResults: 5,
    pageToken: pageTokenValue,
    part: 'snippet',
    key: 'AIzaSyB7SZee8z4v5Ij9xDi3PTKAsZrQ6111aCc',
  };
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
  console.log(result);
  return `
    <div>

      <h2><a class="" href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank">${result.snippet.channelTitle}</a> :  
      </h2><span><a class="js-result-name" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">  ${result.snippet.title}</a></span>
   

      <div class="lightbox">
        <img class="thumbnail js-thumbnail" src="${result.snippet.thumbnails.medium.url}">
        <div class="modal" class="hide">
          <span class="close js-close"> &times; </span>
          <img class="modal-content" src="">
        </div>   
      </div>
    </div>
  `;
}

/* <a class="js-result-name" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank"><img src="${result.snippet.thumbnails.medium.url}"></a> */

function displayYouTubeSearchData(data) {
  nextPageTokenValue = data.nextPageToken;
  previousPageTokenValue = data.prevPageToken;
  console.log(data);
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const searchTarget = $(event.currentTarget).find('.js-query');
    searchTerm = searchTarget.val();
    // clear out the input
    searchTarget.val('');
    getDataFromApi(searchTerm, displayYouTubeSearchData);
  });
}

function thumbnailClickListener() {
  $('.js-search-results').on('click', '.js-thumbnail', function(event) {
    let source = $(this).attr('src');
    console.log($(this).attr('src'));
    $('.modal-content').attr('src', source);
    $('.modal').show();
  });
}

function lightBoxCloseListener() {
  $('.js-search-results').on('click', '.js-close', function(event) {
    $('.modal').hide();
  });
}

function previousButtonClickListener() {
  $('.js-previous-btn').click(function(event){
    pageTokenValue = previousPageTokenValue;
    getDataFromApi(searchTerm, displayYouTubeSearchData);
  });
}

function nextButtonClickListener() {
  $('.js-next-btn').click(function(event){
    pageTokenValue = nextPageTokenValue;
    getDataFromApi(searchTerm, displayYouTubeSearchData);
  });
}

$(watchSubmit);
$(thumbnailClickListener);
$(lightBoxCloseListener);
$(nextButtonClickListener);
$(previousButtonClickListener);