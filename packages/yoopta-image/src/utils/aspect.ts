export const getAspectRatio = (srcWidth: number, srcHeight: number, maxWidth: number, maxHeight: number) => {
  if (!srcWidth || !srcHeight) return {};
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

  return { width: srcWidth * ratio, height: srcHeight * ratio };
};
