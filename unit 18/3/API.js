"use strict";

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(term) {
  try {
    const response = await axios.get(
      `https://api.tvmaze.com/search/shows?q=${term}`
    );
    const showsData = response.data;

    const shows = showsData.map((showData) => {
      const show = showData.show;
      return {
        id: show.id,
        name: show.name,
        summary: show.summary,
        image: show.image
          ? show.image.medium
          : "https://tinyurl.com/tv-missing",
      };
    });

    return shows;
  } catch (error) {
    console.error("Error fetching shows:", error);
    return [];
  }
}

/** Given list of shows, create markup for each and add to DOM */

function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {
    const $show = $(
      `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img src="${show.image}" alt="${show.name}" class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>
       </div>`
    );

    $showsList.append($show);
  }
}

/** Given a show ID, get episodes from API and return (promise) array of episodes: {id, name, season, number} */

async function getEpisodesOfShow(id) {
  try {
    const response = await axios.get(
      `https://api.tvmaze.com/shows/${id}/episodes`
    );
    const episodesData = response.data;

    const episodes = episodesData.map((episode) => ({
      id: episode.id,
      name: episode.name,
      season: episode.season,
      number: episode.number,
    }));

    return episodes;
  } catch (error) {
    console.error("Error fetching episodes:", error);
    return [];
  }
}

/** Populate episodes into the #episodesList part of the DOM */

function populateEpisodes(episodes) {
  const $episodesList = $("#episodesList");
  $episodesList.empty();

  for (let episode of episodes) {
    const $episodeItem = $(
      `<li>${episode.name} (Season ${episode.season}, Episode ${episode.number})</li>`
    );
    $episodesList.append($episodeItem);
  }
}

/** Handle search form submission: get shows from API and display */

async function searchForShowAndDisplay() {
  const term = $("#searchForm-term").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});

$showsList.on("click", ".Show-getEpisodes", async function () {
  const $showCard = $(this).closest(".Show");
  const showId = $showCard.data("show-id");
  const episodes = await getEpisodesOfShow(showId);
  populateEpisodes(episodes);
  $episodesArea.show();
});
