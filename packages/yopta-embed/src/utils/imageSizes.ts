export function getImageSizes(src): Promise<any> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      return resolve({ width: img.width, height: img.height });
    };

    img.onerror = (e) => {
      return reject(e);
    };
  });
}
