import puppeteer from 'puppeteer';

class ReAaptcha {
  async store(req, res) {
    const browser = await puppeteer.launch({
      // headless: false,
      // executablePath: '/usr/bin/chromium-browser',
      executablePath: 'google-chrome-stable',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      ignoreDefaultArgs: ['--disable-extensions'],
    });
    const page = await browser.newPage();

    await page.goto('https://projudi.tjgo.jus.br/BuscaProcessoPublica', {
      waitUntil: 'networkidle2',
    });

    // Pegar Chave do reCAPTCHA
    // const getKey =
    //   /render=(?:"?[^"]*"|^[^"]*$)/.exec(await page.content())[0] || '';
    // const siteKey = getKey.replace('render=', '').replace('"', '');
    // console.log(siteKey);

    await page.waitForSelector('#g-recaptcha-response');
    const response = await page.$('#g-recaptcha-response');
    const token = await (await response.getProperty('value')).jsonValue();

    await browser.close();

    if (!token) res.status(400).send();

    return res.send({ token: token.trim() });
  }
}

export default new ReAaptcha();
