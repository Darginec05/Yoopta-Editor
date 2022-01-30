/* eslint-disable camelcase */
/* eslint-disable implicit-arrow-linebreak */
export const pipe = <R>(fn1: (a: R) => R, ...fns: Array<(a: R) => R>) =>
  fns.reduce((prevFn, nextFn) => (value) => nextFn(prevFn(value)), fn1);

export const compose = <R>(fn1: (a: R) => R, ...fns: Array<(a: R) => R>) =>
  fns.reduce((prevFn, nextFn) => (value) => prevFn(nextFn(value)), fn1);

export const CLOUDINARY = {
  PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET!,
  API: process.env.NEXT_PUBLIC_CLOUDINARY_API!,
  CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
};

export const uploadToCloudinary = async (file, type = 'image'): Promise<{ data: any; url: string }> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY.PRESET);

  try {
    const call = await fetch(`${CLOUDINARY.API}/${type}/upload`, { method: 'POST', body: formData });
    const response = await call.json();
    const { asset_id, public_id, format, width, height, secure_url } = response;

    const media = {
      width,
      height,
      format,
      name: public_id,
      id: asset_id,
      secure_url,
    };

    return {
      data: media,
      url: secure_url,
    };
  } catch (error) {
    return Promise.reject(error);
  }
};
