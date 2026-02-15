const Parser = require('rss-parser');

const parser = new Parser();

const run = async (url) => {
  const feed = await parser.parseURL(url);

  console.log(feed.title);

  feed.items.map(({ title, link, pubDate }) => console.log({ title, link, pubDate }));
}

process.argv.slice(2).map(url => run(url));
