export const resampleTypes: { label: string, value: ImagesProcessOptions["resample"] }[] = [
  { label: "Nearest neighbor", value: "nearest" },
  { label: "Cubic", value: "cubic" },
  { label: "Mitchell", value: "mitchell" },
  { label: "Lanczos2", value: "lanczos2" },
  { label: "Lanczos3", value: "lanczos3" }
];

export const actionTypes: { label: string, value: ImagesProcessOptions["action"] }[] = [
  { label: "Generate", value: "generate" },
  { label: "Scale", value: "scale" },
  { label: "Resize", value: "resize" }
];
