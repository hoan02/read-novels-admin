import slugify from "slugify";

export default function generateSlug(name: string) {
  const slug = slugify(name, { replacement: "-", lower: true, locale: "vi" });
  return slug;
}
