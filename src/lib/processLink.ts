import path from "path";

const postProcess = (processedLink: string) => {
  return processedLink.replace(/(\/*#.*|\/$)/g, "");
};

const processLink = (
  link: string,
  url: URL,
  add_to: string[],
  authorize: RegExp[] = []
) => {
  if (
    !link ||
    link[0] === "#" ||
    link.slice(0, 4) === "tel:" ||
    link.slice(0, 5) === "data:" ||
    link.slice(0, 7) === "mailto:"
  )
    return;

  let processedURL = url;
  if (link.slice(0, 2) === "//") link = "https:" + link;

  if (link.slice(0, 5) === "http:" || link.slice(0, 6) === "https:") {
    const linkUrl = new URL(link);
    
    if (authorize.some((domainRegex) => domainRegex.test(linkUrl.hostname))) {
      link = path.join(linkUrl.pathname, linkUrl.search);
      processedURL = linkUrl;
    }else return;
  }

  const href = processedURL.protocol + "//" + processedURL.hostname + processedURL.pathname.replace(/\.[a-zA-Z]+$/g, "")

  if (link.length >= 185) return;

  if (link[0] == ".") {
    const _link = href + link.slice(1);
    add_to.push(postProcess(_link));
  } else if (link[0] == "/") {
    const _link = processedURL.origin + link;
    add_to.push(postProcess(_link));
  } else {
    const _link = href + "/" + link;
    add_to.push(postProcess(_link));
  }

  return;
};

export default processLink;
