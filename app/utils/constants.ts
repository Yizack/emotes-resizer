interface UItem<T> {
  label: string;
  value: T;
}

export const resampleItems: UItem<ImagesProcessOptions["resample"]>[] = [
  { label: "Nearest neighbor", value: "nearest" },
  { label: "Cubic", value: "cubic" },
  { label: "Mitchell", value: "mitchell" },
  { label: "Lanczos2", value: "lanczos2" },
  { label: "Lanczos3", value: "lanczos3" }
];

export const actionItems: UItem<ImagesProcessOptions["action"]>[] = [
  { label: "Generate", value: "generate" },
  { label: "Scale", value: "scale" },
  { label: "Resize", value: "resize" }
];

export const defaultSizes: UItem<string>[] = [
  { label: "28x28", value: "28" },
  { label: "56x56", value: "56" },
  { label: "112x112", value: "112" }
];

export const formatItems: UItem<ImagesProcessOptions["format"]>[] = [
  { label: "Auto detect", value: "auto" },
  { label: "PNG", value: "png" },
  { label: "WebP", value: "webp" },
  { label: "JPEG", value: "jpg" },
  { label: "GIF", value: "gif" }
];
