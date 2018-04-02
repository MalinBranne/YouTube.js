// ...

//https://www.npmjs.com/package/youtube-api-v3-search <----LÄÄÄÄÄÄSSSSSSS INSTRUKTIONER

// This is the main module (entry point) for the application.
//
// It implements "Youtube Instant Search", providing search results while a title is entered by the user.
//
// NOTE: You must first create a project and API key @ console.developers.google.com and enable YouTube Data API v3.
//My API CREDENTIALS:  AIzaSyCUDpJSJsYMLbzk6aZKTHQGw-f2rmwzmGA  youtube.googleapis.com

// NOTE 2: This application currently doesn't work in Chrome! Use another browser to test.

// ...
import $ from "jquery";
var _ = require("lodash"); //Enligt hemsidan
import __ from "lodash"; //SE LODASH HEMSDA HUR MAN IMPORTERAR
import { debug } from "util";

// ...
// TODO: Require youtube-api-v3-search. DONE!

// ...
// TODO:
//
// Implement a function that takes a video title entered by the user and performs a Youtube Search of type video,
// using the youtube-api-v3-search package.
//
// Read the documentation for youtube-api-v3-search for how such a search is performed. Set an extra option of
// maxResults: 10.

/**
//  * Searching YouTube.
//  * @param {string} $YOUTUBE_KEY youtube api-key
//  * @param {Object} $options search parameters.
//  * @return {void}
//  */
const youtubeSearch = require("youtube-api-v3-search");
//const q = $("#videoTitle").val(); // det som skrivs in i input blir värdet av nyckeln q i objektet options
const $YOUTUBE_KEY = "AIzaSyCUDpJSJsYMLbzk6aZKTHQGw-f2rmwzmGA";

function search(titleToSearch) {
  const $options = {
    q: titleToSearch,
    part: "snippet",
    maxResults: 10,
    type: "video"
  };

  $("#videos").html(" ");
  youtubeSearch($YOUTUBE_KEY, $options) //yourubeSearch är en funktion som är inbyggd i paketet vi hämtat i const youtubeSearch. Det resulterar i ett löfte.
    .then(results => {
      console.log(results);
      const videoIds = results.items.map(a => a.id.videoId);
      console.log(videoIds);

      for (var index in videoIds) {
        const videoId = videoIds[index];

        var output = "";
        output += `
        <iframe src="https://www.youtube.com/embed/${videoId}" />
        `;

        $("#videos").append(output);
      }
    });
}

//NEXT:hämta videoID för varje resultat och sen loopa ut i htmlen (append for each)
//--->
// Inspect the results from YouTube Data API v3 to see what it returns; the goal is to fetch the videoId of
// each video that was found (tip: use Array.map). <---
//
// Finally append the following HTML under #videos for each video:
//
// <iframe src="https://www.youtube.com/embed/${videoId}" />   DONE!

// ...
// TODO:
//
// Use debounce in lodash to "throttle" the execution of multiple calls to the search function if they occur
// too frequently, which will happen as the user enters the title to search for.

const debounced = _.debounce(search, 300);

$("#videoTitle").on("keyup", e => {
  const titleToSearch = e.target.value;
  debounced(titleToSearch);
  // TODO: Invoke the (debounced) search function with the title to search.
});
