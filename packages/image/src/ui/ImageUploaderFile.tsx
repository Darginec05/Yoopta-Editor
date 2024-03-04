const ImageUploaderFile = ({ accept = 'image/*', onChangeFile }) => {
  return (
    <div className="user-select-none transition-bg duration-20 ease-in white-space-nowrap rounded-[4px] h-[32px] px-[12px] border border-[rgba(55,53,47,0.16)] w-full cursor-pointer">
      <label
        htmlFor="image-uploader"
        className="text-[14px] leading-[1.2] font-medium cursor-pointer w-full flex items-center justify-center h-full"
      >
        <input
          type="file"
          id="image-uploader"
          className="absolute left-0 top-0 invisible"
          accept={accept}
          onChange={onChangeFile}
          multiple={false}
        />
        Upload image
      </label>
    </div>
  );
};

export { ImageUploaderFile };
