const puppeteer = require('puppeteer')

const { browser: browser_config, user: user_config } = require('./config.js')

const wait = (timeout = 1000) => new Promise((res) => setTimeout(() => res(), timeout))

const run = async () => {
  const browser = await puppeteer.launch(browser_config)
  const page = await browser.newPage()
  //
  await page.goto('https://iaead.cps.sp.gov.br/my/courses.php')
  await page.waitForSelector('#username')
  await wait(1000)
  await page.type('#username', user_config.username)
  await page.type('#password', user_config.password)
  await page.click('#loginbtn')
  await page.waitForNavigation()
  //
  //
  const paragraphs = await page.$$eval('a', as => as.map(a => a.textContent.trim()))
  console.log(paragraphs)
  await browser.close()
}

run()
