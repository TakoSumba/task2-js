import { TopicsSection } from "./topic/topics-section.js";
import { topics } from "./topic/topicsData.js";
import { GiphySection } from "./giphy/giphy-section.js";
import { config } from "./config/config.js";

let topicsId = document.getElementById("topics");
var topicsBlock = new TopicsSection(topicsId);

rerenderTopicsBlock(topics);

let trendingButton = document.getElementById("trending-button");
trendingButton.onclick = function (event) {
  renderGiphy("", true);
};

var renderGiphy = function (userSearch, isTrending) {
  var url = isTrending
    ? `${config.apiUrl}/v1/gifs/trending`
    : `${config.apiUrl}/v1/gifs/search`;

  let giphyPromise = fetch(url + "?" + generateParams(userSearch));
  giphyPromise
    .then((res) => {
      return res.json();
    })

    .then((res) => {
      console.log(res);
      let giphyId = document.getElementById("giphy");
      let giphyBlock = new GiphySection(giphyId);
      giphyBlock.setGiphyList = res.data;
      giphyBlock.render();
    });
};

var userSearch = document.getElementById("user-search");
let submitButton = document.getElementById("submit");
submitButton.onclick = function (event) {
  let value = userSearch.value;
  if (!value) {
    return;
  }

  renderGiphy(value, false);
  topics.push(value);
  if (topics.length > 6) {
    topics.shift();
  }

  rerenderTopicsBlock(topics);
};

function rerenderTopicsBlock(topics) {
  topicsBlock.setTopicsList = topics;
  topicsBlock.render();

  let topicButtons = document.getElementsByClassName("topics-item");
  for (var i = 0; i < topicButtons.length; i++) {
    let topicButton = topicButtons[i];

    topicButton.onclick = function (event) {
      renderGiphy(event.target.innerHTML, false);
      console.log(event.target.innerHTML);
    };
  }
}

function generateParams(query) {
  var params = {
    q: query,
    limit: 10,
    api_key: "aFFKTuSMjd6j0wwjpFCPXZipQbcnw3vB",
    fmt: "json",
  };

  let paramsParray = [];
  Object.entries(params).forEach(([key, value]) => {
    paramsParray.push(`${key}=${value}`);
  });

  const resQuery = paramsParray.join("&");
  return resQuery;
}
