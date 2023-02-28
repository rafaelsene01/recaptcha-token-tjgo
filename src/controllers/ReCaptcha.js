import puppeteer from "puppeteer";

class ReAaptcha {
  async store(req, res) {
    let browser;
    let token;
    try {
      browser = await puppeteer.launch({
        // headless: false,
        executablePath: "/usr/bin/google-chrome",
        args: [
          "--disable-gpu",
          "--disable-dev-shm-usage",
          "--disable-setuid-sandbox",
          "--no-sandbox",
        ],
        ignoreDefaultArgs: ["--disable-extensions"],
      });
      const page = await browser.newPage();

      await page.goto("https://projudi.tjgo.jus.br/BuscaProcessoPublica", {
        waitUntil: "networkidle2",
        timeout: 5000,
      });

      // Pegar Chave do reCAPTCHA
      // const getKey =
      //   /render=(?:"?[^"]*"|^[^"]*$)/.exec(await page.content())[0] || '';
      // const siteKey = getKey.replace('render=', '').replace('"', '');
      // console.log(siteKey);

      await page.waitForSelector("#g-recaptcha-response", { timeout: 5000 });
      const response = await page.$("#g-recaptcha-response");
      token = await (await response.getProperty("value")).jsonValue();
      if (!token) res.status(400).send();
    } catch (error) {
      return res.status(500).send({ message: "timeout" });
    }

    await browser.close();

    return res.send({ token: token.trim() });
  }
}

export default new ReAaptcha();
