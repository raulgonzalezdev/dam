export function toURL(url?: number | string | Array<string | number> | null) {
  if (!url) return "";

  return typeof url === "string" || typeof url === "number"
    ? `${url.toString()}/`
    : url.join("/").concat("/");
}
