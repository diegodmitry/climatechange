const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
// const { add } = require("cheerio/lib/api/traversing");

const PORT = process.env.PORT || 8000;

const app = express();

const newspapers = [
  {
    name: "thetimes",
    address: "https://www.thetimes.co.uk/environment/climate-change",
  },
  {
    name: "guardian",
    address: "https://www.theguardian.com/environment/climate-crisis",
  },
  {
    name: "telegraph",
    address: "https://www.telegraph.co.uk/climate-change",
  },
];

const articles = [];

newspapers.forEach((newspaper) => {
  axios.get(newspaper.address).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);

    $("a:contains('climate')", html).each(function () {
      const title = $(this).text();
      const url = $(this).attr("href");

      articles.push({
        title,
        url,
        source: newspaper.name,
      });
    });
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome Climate Change API" });
});

app.get("/news", (req, res) => {
  res.json(articles);
});

app.get("/news/:newspaperId", (req, res) => {
  const newspaperId = req.params.newspaperId;

  const newspaperAddress = newspapers.filter(
    (newspaper) => newspaper.name === newspaperId
  )[0].address;

  console.log(newspaperAddress);

  axios.get(newspaperAddress).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const specificArticles = [];

    $("a:contains('climate')", html).each(function () {
      const title = $(this).text();
      const url = $(this).attr("href");

      specificArticles.push({
        title,
        url,
        source: newspaperId,
      });
    });

    res.json(specificArticles);
  });
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
