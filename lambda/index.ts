import { postCatBarsikBlog, postMaski, postNewsChannel, postZenChannel, vkusnoDlyaVsehChannelPost } from "../service/functions";

export const handlerMaski = async (event: any) => {
  try {
    const openAiApiKey = process.env.OPENAI_API_KEY!;
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN!;
    const channelId = process.env.MASKI_TELEGRAM_CHANNEL_ID!;

    await postMaski(openAiApiKey, channelId, telegramBotToken);
  } catch (e) {
    console.log(e.message)

    return 'ERROR';
  }

  return 'OK'
}

export const handlerCatBarsik = async (event: any) => {
  try {
    const openAiApiKey = process.env.OPENAI_API_KEY!;
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN!;
    const channelId = process.env.CAT_BLOG_TELEGRAM_CHANNEL_ID!;

    await postCatBarsikBlog(openAiApiKey, channelId, telegramBotToken);
  } catch (e) {
    console.log(e.message)

    return 'ERROR';
  }

  return 'OK'
}

export const handlerNewsChannel = async (event: any) => {
  try {
    const openAiApiKey = process.env.OPENAI_API_KEY!;
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN!;
    const channelId = process.env.NEWS_TELEGRAM_CHANNEL_ID!;
    const newsApiKey = process.env.NEWS_API_KEY!;

    await postNewsChannel(openAiApiKey, channelId, telegramBotToken, newsApiKey);
  } catch (e) {
    console.log(e.message)

    return 'ERROR';
  }

  return 'OK'
}


export const handlerZenChannel = async (event: any) => {
  try {
    const openAiApiKey = process.env.OPENAI_API_KEY!;
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN!;
    const channelId = process.env.ZEN_TELEGRAM_CHANNEL_ID!;

    await postZenChannel(openAiApiKey, channelId, telegramBotToken);
  } catch (e) {
    console.log(e.message)

    return 'ERROR';
  }

  return 'OK'
}


export const vkusnoDlyaVsehChannel = async (event: any) => {
  try {
    const openAiApiKey = process.env.OPENAI_API_KEY!;
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN!;
    const channelId = process.env.EDA_TELEGRAM_CHANNEL_ID!;

    await vkusnoDlyaVsehChannelPost(openAiApiKey, channelId, telegramBotToken);
  } catch (e) {
    console.log(e.message)

    return 'ERROR';
  }

  return 'OK'
}