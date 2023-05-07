export const CLOUDINARY = {
  PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET! || 'zxlncbgx',
  API: process.env.NEXT_PUBLIC_CLOUDINARY_API! || 'https://api.cloudinary.com/v1_1/ench-app',
  CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME! || 'ench-app',
};

export const uploadToCloudinary = async (file: File, type = 'image'): Promise<{ data: any; url: string }> => {
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
