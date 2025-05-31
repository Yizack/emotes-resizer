import path from "node:path";
import sharp, { type Sharp } from "sharp";
import { defineIpcHandler } from "../utils/handler";

export default defineIpcHandler("process-images", async (paths: string[], options: ImagesProcessOptions) => {
  for (const filePath of paths) {
    const isMaybeGif = path.extname(filePath).toLowerCase() === ".gif";
    const image = sharp(filePath, {
      autoOrient: true,
      animated: isMaybeGif || options.format === "gif"
    });

    const metadata = await image.metadata();
    const generateImage = async (pipeline: Sharp, sizeOptions: { width: number, height: number }) => {
      const { width, height } = sizeOptions;

      const isSquare = width === height;

      pipeline = pipeline.resize({
        width,
        height,
        fit: isSquare ? "inside" : "fill",
        position: "center",
        kernel: options.resample
      });

      const format = options.format === "auto" ? metadata.format : options.format;

      switch (format) {
        case "png":
          pipeline = pipeline.png();
          break;
        case "webp":
          pipeline = pipeline.webp();
          break;
        case "jpg":
        case "jpeg":
          pipeline = pipeline.jpeg();
          break;
      }

      const isScale = options.action === "scale" && options.percent !== undefined;
      const suffix = isScale ? `${options.percent}%` : isSquare ? `${width}` : `${width}x${height}`;
      const filename = path.parse(filePath).name;
      const fileDir = options.outputDir || path.dirname(filePath);

      await pipeline.toFile(path.join(fileDir, `${filename}-${suffix}.${metadata.format}`));
    };

    const currentHeight = metadata.pageHeight || metadata.height;
    const currentWidth = metadata.width;

    switch (options.action) {
      case "scale":
        await generateImage(image, {
          width: Math.round(currentWidth * ((options.percent || 100) / 100)),
          height: Math.round(currentHeight * ((options.percent || 100) / 100))
        });
        continue;
      case "resize":
        await generateImage(image, {
          width: options.width || currentWidth,
          height: options.height || currentHeight
        });
        continue;
      case "generate":
        for (const size of options.sizes || [100, 200, 300]) {
          await generateImage(image.clone(), {
            width: Number(size),
            height: Number(size)
          });
        }
        continue;
    }
  }
});
