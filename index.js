import { TopicsSection } from "./topic/topics-section.js";
import { topicsData } from "./topic/topicsData.js";
import { GiphySection } from "./giphy/giphy-section.js";
import { config } from "./config/config.js";

const SEARCH_URL = `${config.apiUrl}/v1/gifs/search`;
const TRENDING_URL = `${config.apiUrl}/v1/gifs/trending`;

let topicsElement = document.getElementById("topics");
var topicsBlock = new TopicsSection(topicsElement);

rerenderTopicsBlock(topicsData);

let trendingButtonElement = document.getElementById("trending-button");
trendingButtonElement.onclick = function (event) {
  renderGiphy("", TRENDING_URL);
};

let submitButtonElement = document.getElementById("submit");
submitButtonElement.onclick = function (event) {
  let userSearchElement = document.getElementById("user-search");
  let value = userSearchElement.value;
  if (!value) {
    return;
  }

  renderGiphy(value, SEARCH_URL);

  topicsData.push(value);
  if (topicsData.length > 6) {
    topicsData.shift();
  }
  rerenderTopicsBlock(topicsData);
};

function rerenderTopicsBlock(topicsData) {
  topicsBlock.setTopicsList = topicsData;
  topicsBlock.render();

  let topicButtonElements = document.getElementsByClassName("topics-item");
  for (var i = 0; i < topicButtonElements.length; i++) {
    let topicButtonElement = topicButtonElements[i];
    topicButtonElement.onclick = function (event) {
      renderGiphy(event.target.innerHTML, SEARCH_URL);
    };
  }
}

var renderGiphy = function (userSearch, url) {
  let giphyPromise = fetch(url + "?" + generateParams(userSearch));
  giphyPromise
    .then((res) => {
      return res.json();
    })

    .then((res) => {
      let giphyId = document.getElementById("giphy");
      let giphyBlock = new GiphySection(giphyId);
      giphyBlock.setGiphyList = res.data;
      giphyBlock.render();
    });
};

function generateParams(searchValue) {
  var params = {
    q: searchValue,
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
