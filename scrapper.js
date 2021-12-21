const URL = "https://www1.gogoanime.cm"

const options = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
    'Referer': "https://www.gogoplay1.com/",
  },
};

const formatTitle = (title, episode) => {
  const formattedTitle = `${title
    .replace(/\b\W\b|\b\W\W\b/g, "-")
    .replace(/\W$/g, "")
    .toLowerCase()}-episode-${episode}`;

  return formattedTitle;
};

export const getLink = async (title, episode) => {
  const f_title = formatTitle(title, episode);

  const res = await fetch(`${URL}/${f_title}`, options);
  const data = await res.text();
  let s_index = data.indexOf('<li class="vidcdn">');
  let l_index = data.indexOf('<li class="streamsb">');
  let snip = data.slice(s_index, l_index);
  s_index = snip.indexOf("data-video");
  l_index = snip.indexOf("><i");
  snip = snip
    .slice(s_index + 12, l_index)
    .trim()
    .slice(0, -1);

  let link = "https:";
  if (snip) {
    link = link.concat(snip);
    link = getVideoLink(link);

    return link;
  } else {
    return null;
  }
};

export const getVideoLink = async (link) => {
  let res = await fetch(link, options);
  res = await res.text();
  res = res.match(/(?<=\[\{file:\s').*(?=',label)/g)[0];

  return res;
};
