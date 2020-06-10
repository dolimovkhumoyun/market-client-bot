const { Telegraf, Markup, Extra } = require("telegraf");
const _ = require("lodash");

const product = require("./models/productModel");
const category = require("./models/categoryModel");
const CONFIG = require("./config");

const startMenu = Telegraf.Extra.markdown().markup((m) =>
  m
    .keyboard([
      [m.callbackButton("📘 Продукция"), m.callbackButton("🏢 Магазины")],
      [m.callbackButton("📲 Написать нам"), m.callbackButton("🛒 Корзина")],
      [m.callbackButton("🚚 Доставка")],
    ])
    .resize()
);

const test = Markup.inlineKeyboard([
  // [Markup.callbackButton("👍", "product-1"), Markup.callbackButton("👎", "product-2")],
  // [Markup.callbackButton("👎", "product-2"), Markup.callbackButton("👎", "product-2")],
]).extra();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.hears("📘 Продукция", async (ctx) => {
  let { data } = await category.getAll();
  let { results } = data;
  let key = _.chunk(results, 2);
  const categoryMenu = Markup.inlineKeyboard(
    key.map((label) => [
      Markup.callbackButton(label[0].name, `/cat-${label[0].id}`),
      Markup.callbackButton(label[1].name, `/cat-${label[1].id}`),
    ])
  ).extra();
  ctx.reply("Выберите нужный раздел: ", categoryMenu);
});

bot.action(/\/[c][a][t]\-\w+/g, async (ctx) => {
  let id = ctx.match.input.split("/cat-")[1];
  let { data } = await product.getProducts(id);
  let { results } = data;
  results.map((item) =>
    ctx.replyWithPhoto(item.p_img, Extra.caption(`${item.p_name} - ${item.p_price}`).markdown())
  );
});

bot.start((ctx) => {
  ctx.reply("Начните делать покупки пройдя в раздел “📘 Продукция”", startMenu);
});

bot.launch();
