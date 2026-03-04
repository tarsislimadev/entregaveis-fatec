const Parser = require('rss-parser');

const fs = require('fs')

const urls = fs.readFileSync('urls.txt').toString('utf-8').split('\n').map(url => url.trim()).filter(Boolean)

const parser = new Parser();

const run = async (url) => {
  const feed = await parser.parseURL(url);

  console.log(feed.title);

  feed.items.map(({ title, link, pubDate }) => console.log({ title, link, pubDate }));
}

urls.map((url) => run(url))
