import type { AffineOptions } from "sharp";

declare global {
  type ImagesProcessActions = {
    action: "generate";
    sizes?: (number | string)[];
  } | {
    action: "scale";
    percent?: number;
  } | {
    action: "resize";
    width?: number;
    height?: number;
  };

  type ImagesProcessOptions<T = ImagesProcessActions["action"]> = Pick<AffineOptions, "interpolator"> & ImagesProcessActions & {
    action: T;
    outputDir?: string;
  };
}

export {};
