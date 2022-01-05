export default (link: string, url: URL, add_to: string[]) => {
  if (
    !link ||
    link[0] === "#" ||
    link.slice(0, 4) === "tel:" ||
    link.slice(0, 5) === "data:" ||
    link.slice(0, 5) === "http:" ||
    link.slice(0, 6) === "https:" ||
    link.slice(0, 7) === "mailto:"
  )
    return;

  const href = url.href.replace(/\/$/, "");
  if (link.length >= 185) return;

  if (link[0] == ".") {
    const _link = href + link.slice(1);
    add_to.push(_link);
  } else if (link[0] == "/") {
    const _link = url.origin + link;
    add_to.push(_link);
  } else {
    const _link = href + "/" + link;
    add_to.push(_link);
  }

  return;
};
