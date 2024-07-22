const puppeteer = require("puppeteer");

const fs = require("fs");

const FetchContent = async (req, res) => {
  const { url } = req.body;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  //   await page.screenshot({ path: "example.png", fullPage: true });
  //   await page.pdf({ path: "example.pdf", format: "A4" });
  //   const html = await page.content();
  //   console.log(html);

  const title = await page.evaluate(() => document.title);
  //   const text = await page.evaluate(() => document.body.innerText);
  //   console.log(text);

  //   const links = await page.evaluate(() =>
  //     Array.from(document.querySelectorAll("a"), (e) => e.href)
  //   );
  //   console.log(links);

  const heading = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll("h1,h2,h3,h4,h5,h6"),
      (e) => e.innerHTML
    )
  );
  console.log(heading);

  const paragraphs = await page.evaluate(() =>
    Array.from(document.querySelectorAll("p,span"), (e) => e.innerHTML)
  );
  console.log(paragraphs);

  //   const paragraph = await page.evaluate(() =>
  //     Array.from(document.querySelectorAll("p, span"), (e) => e.textContent)
  //   );

  //   console.log(paragraph);

  //   const courses = await page.evaluate(() =>
  //     Array.from(document.querySelectorAll(" .card"), (e) => ({
  //       title: e.querySelector(".card-body h3").innerText,
  //       level: e.querySelector(".card-body .level").innerText,
  //       url: e.querySelector(".card-footer a").href,
  //     }))
  //   );
  //   console.log(courses);

  // SAVE DATA TO JSON FILE
  //   fs.writeFile("course.json", JSON.stringify(courses), (err) => {
  //     if (err) {
  //       throw err;
  //     }

  //     console.log("File Saved");
  //   });

  // Extract the meta keywords and meta description
  const metaTags = await page.evaluate(() => {
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    const metaDescription = document.querySelector('meta[name="description"]');

    return {
      keywords: metaKeywords ? metaKeywords.getAttribute("content") : null,
      description: metaDescription
        ? metaDescription.getAttribute("content")
        : null,
    };
  });

  // Log the results
  console.log("Meta Keywords:", metaTags.keywords);
  console.log("Meta Description:", metaTags.description);

  //   const cleanAndFormatText = (textArray) => {
  //     // Combine the array into a single string
  //     let combinedText = textArray.join(" ");

  //     // Clean the text
  //     let cleanedText = combinedText
  //       .replace(/<sup>.*?<\/sup>/g, "") // Remove <sup> tags and their content
  //       .replace(/<\/?[^>]+(>|$)/g, "") // Remove all remaining HTML tags
  //       .replace(/&nbsp;/g, " ") // Replace &nbsp; with a regular space
  //       .replace(/\s+/g, " ") // Replace multiple spaces/newlines with a single space
  //       .trim(); // Trim leading and trailing whitespace

  //     return cleanedText;
  //   };

  const cleanAndFormatText = (textArray) => {
    // Combine the array into a single string
    let combinedText = textArray.join(" ");

    // Clean the text
    let cleanedText = combinedText
      .replace(/<sup>.*?<\/sup>/g, "") // Remove <sup> tags and their content
      .replace(/<\/?[^>]+(>|$)/g, "") // Remove all remaining HTML tags
      .replace(/&nbsp;/g, " ") // Replace &nbsp; with a regular space
      .replace(/\s+/g, " ") // Replace multiple spaces/newlines with a single space
      .replace(/\n/g, ", ") // Replace newlines with a comma followed by a space
      .trim(); // Trim leading and trailing whitespace

    return cleanedText;
  };

  await browser.close();

  res.status(200).json({
    message: "Content Fetched",
    success: true,
    website: url,
    content: {
      keywords: metaTags.keywords,
      description: metaTags.description,
      title: title,
      headings: cleanAndFormatText(heading),
      paragraphs: cleanAndFormatText(paragraphs),
    },
  });
};

module.exports = {
  FetchContent,
};
