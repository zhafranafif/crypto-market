import type { ImageLoader } from "next/image";

const imageLoader: ImageLoader = ({ src }) => {
    return `https://flagcdn.com/w40/${src}.png`;
};

export default imageLoader;