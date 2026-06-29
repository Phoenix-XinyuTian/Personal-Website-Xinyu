import { generateOgImage, ogImageContentType, ogImageSize } from "./og-card";

export const alt = "Xinyu Tian and Phoenix Tian personal website preview";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return generateOgImage();
}
