import path from "node:path";
import sharp from "sharp";
import { ipcMain } from "electron";

export default function () {
  return ipcMain.handle("process-images", async (_, paths: string[], options: ImagesProcessOptions) => {
    for (const filePath of paths) {
      const fileDir = options.outputDir || path.dirname(filePath);
      const image = sharp(filePath);
      const metadata = await image.metadata();

      const generateImage = async (pipeline: sharp.Sharp, sizeOptions: { width: number, height: number }) => {
        const fileNameWithoutExt = path.parse(filePath).name;
        const isSquare = sizeOptions.width === sizeOptions.height;
        const fileSizeText = isSquare ? `${sizeOptions.width}` : `${sizeOptions.width}x${sizeOptions.height}`;
        const outputName = `${fileNameWithoutExt}-${fileSizeText}.png`;

        pipeline = pipeline.resize({
          width: sizeOptions.width,
          height: sizeOptions.height,
          fit: isSquare ? "inside" : "fill",
          position: "center"
        }).affine([[1, 0], [0, 1]], { interpolator: options.interpolator });
        await pipeline.png().toFile(path.join(fileDir, outputName));
      };

      switch (options.action) {
        case "scale":
          await generateImage(image, {
            width: Math.round(metadata.width * ((options.percent || 100) / 100)),
            height: Math.round(metadata.height * ((options.percent || 100) / 100))
          });
          continue;
        case "resize":
          await generateImage(image, {
            width: options.width || metadata.width,
            height: options.height || metadata.height
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
}
