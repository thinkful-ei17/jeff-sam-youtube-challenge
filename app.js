'use strict';

const GITHUB_SEARCH_URL = 'https://api.github.com/search/repositories';

function getDataFromApi(searchTerm, callback) {
  const query = {
    q: `${searchTerm} in:name`,
    per_page: 5
  };
  $.getJSON(GITHUB_SEARCH_URL, query, callback);
}

function renderResult(result) {
  console.log(result);
  return `
    <div>
      <h2>
      <a class="js-result-name" href="${result.html_url}" target="_blank">${result.name}</a> by <a class="js-user-name" href="${result.owner.html_url}" target="_blank">${result.owner.login}</a></h2>
      <p>Number of watchers: <span class="js-watchers-count">${result.watchers_count}</span></p>
      <p>Number of open issues: <span class="js-issues-count">${result.open_issues}</span></p>
    </div>
  `;
}

function displayGitHubSearchData(data) {
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
    getDataFromApi(searchTerm, displayGitHubSearchData);
  });
}

$(watchSubmit);
