const { Given, When, Then } = require("cucumber");
const openUrl = require("../support/action/openUrl");
const checkUrlContains = require("../support/check/checkUrlContains");
const waitForSelector = require("../support/action/waitForSelector");
const assert = require("assert");
const checkElementVisible = require("../support/check/checkElementVisible");

Given("that User goes to Video Site Project's HomePage", async function () {
  await openUrl.call(this, "http://localhost:8080/");
});

When("page is loaded", async function () {
  await waitForSelector.call(this, "#header");
});

Then("User can see some of videos' title like", async function (dataTable) {
  const videos = dataTable.rawTable;

  const selector = ".video-list .title";
  const videoInnerTexts = await this.page.$$eval(selector, (elements) =>
    elements.map((element) => element.innerText)
  );

  for (const [videoTitle] of videos) {
    assert.ok(
      videoInnerTexts.includes(videoTitle),
      `Expected "${videoTitle}" to be included in "${videoInnerTexts}"`
    );
  }
});

Given("that User is on Video Site Project's HomePage", async function () {
  await openUrl.call(this, "http://localhost:8080/");
});

When("User clicks {string} video", async function (videoName) {
  const selector = ".video-item";

  this.videoId = await this.page.$$eval(
    selector,
    async (items, videoName) => {
      const video = items.find(
        (item) => item.querySelector(".title").textContent === videoName
      );

      const { id } = video.dataset;
      await video.click();
      return id;
    },
    videoName
  );
});

Then("User should see watch url correctly", async function () {
  await checkUrlContains.call(this, false, `/watch?id=${this.videoId}`);
});

When("User hovers {string} video", async function (videoName) {
  const selector = ".video-item";

  this.hoveredVideoId = await this.page.$$eval(
    selector,
    async (items, videoName) => {
      const video = items.find(
        (item) => item.querySelector(".title").textContent === videoName
      );

      const { id } = video.dataset;
      return id;
    },
    videoName
  );

  await this.page.hover(`[data-id="${this.hoveredVideoId}"]`);
});

Then("User should see hovered image", async function () {
  const selector = `[data-id="${this.hoveredVideoId}"] .hover-image`;

  await checkElementVisible.call(this, selector);
});
