import type { KernelEnum, Metadata } from "sharp";

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

  type ImagesProcessOptions<T = ImagesProcessActions["action"]> = ImagesProcessActions & {
    resample?: KernelEnum[keyof KernelEnum];
    action: T;
    format?: "auto" | Metadata["format"];
    outputDir?: string;
  };
}

export {};
