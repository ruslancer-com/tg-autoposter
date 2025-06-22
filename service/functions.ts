const axios = require('axios');
const {OpenAI} = require("openai");

export async function postCatBarsikBlog(openAiApiKey: string, channelId: string, telegramBotToken: string) {
    const openaiApi = new OpenAI({
        apiKey: openAiApiKey,
      });
  
    const descriptionResponse = await openaiApi.chat.completions.create({
        model:  "gpt-4o",
        messages: [{ role: "user", content: "You are a cat called Барсик. You write a daily blog about stuff you do in russian language (adventurous). Use a simple language as a kid would use, add мяу or emojis once in a while. Create a short description for your daily blog (start with title with format: Понедельник - 06 января 2025 года, then from new line text) for today, make sure to correctly determine the day of the week " + (new Date).toISOString() + '. also at the last line separated by *** return keywords separated by ","' }],
      });
  
      const description = descriptionResponse.choices[0].message.content;
  
      const descrParts = description.split('***');
  
      const openAiResponseCat = await openaiApi.images.generate({
        model: "dall-e-3",
        prompt: ("Generate a cute, photorealistic image of a fluffy, gray britain cat with white chest, doing things matching keywords: "  + descrParts[1]),
        n: 1,
        size: '1024x1024',
      });
  
      const imageUrlCat = openAiResponseCat.data[0].url;
      const telegramUrlCat = `https://api.telegram.org/bot${telegramBotToken}/sendPhoto`;
      await axios.post(telegramUrlCat, {
          chat_id: channelId,
          video: '',
          caption: descrParts[0],
      });
}

const fetchLatestNews = async (apiKey) => {
    const url = `https://newsapi.org/v2/top-headlines?category=sports&country=us&pageSize=5&apiKey=${apiKey}`;

    try {
        const newsResponse = await axios.get(url);
        const articles = newsResponse.data.articles;
        const summary = articles.map(article => article.title).join('. ') + '.';
        return summary;
    } catch (error) {
        console.error('Error fetching news:', error);
        return 'Unable to fetch the latest news.';
    }
};

export async function postNewsChannel(openAiApiKey: string, channelId: string, telegramBotToken: string, newsApiKey: string) {
    const openaiApi = new OpenAI({
        apiKey: openAiApiKey,
      });
  
    const newsSummary = await fetchLatestNews(newsApiKey);
    
    const descriptionResponse = await openaiApi.chat.completions.create({
        model:  "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a creative content generator for social media."+
            "You can write about news in a funny, engaging way."+
            "You must remember what you created before. Always unique interessting content."
          },
          { role: "user", content: `Translate this news content into Russian language, summarize in one paragraph and add hashtags at the end also in Russian language: ${newsSummary}` }
        ],
      });
  
      const description = descriptionResponse.choices[0].message.content;
  
      const telegramUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
      await axios.post(telegramUrl, {
          chat_id: channelId,
          text: description
      });
}
