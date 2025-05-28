export const resampleTypes: { label: string, value: ImagesProcessOptions["interpolator"] }[] = [
  { label: "Nearest neighbor", value: "nearest" },
  { label: "Bilinear", value: "bilinear" },
  { label: "Bicubic", value: "bicubic" }
];

export const actionTypes: { label: string, value: ImagesProcessOptions["action"] }[] = [
  { label: "Generate", value: "generate" },
  { label: "Scale", value: "scale" },
  { label: "Resize", value: "resize" }
];
