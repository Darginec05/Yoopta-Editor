# StarterKit plugin

StarterKit is package for quick start with full setup
It includes all plugins, tools and marks

### Installation

```bash
yarn add @yoopta/starter-kit
```

### Usage

```jsx
import StarterKit from '@yoopta/starter-kit';

const Editor = () => {
  const [value, setValue] = useState<YooptaContentValue>();
  const selectionBoxRoot = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={selectionBoxRoot}
      className="md:py-[100px] md:pl-[200px] md:pr-[80px] px-[20px] pt-[80px] pb-[40px] flex justify-center"
    >
      <YooptaStarterKit
        value={value}
        onChange={(data) => setValue(data)}
        style={{ width: 650 }}
        selectionBoxRoot={selectionBoxRoot}
        placeholder="Start typing here..."
        media={{
          imageUpload: async (file) => {
            const data = await uploadToCloudinary(file, 'image');

            return {
              src: data.secure_url,
              alt: 'cloudinary',
              sizes: {
                width: data.width,
                height: data.height,
              },
            };
          },
          fileUpload: async (file) => {
            const response = await uploadToCloudinary(file, 'auto');
            return { src: response.url, name: response.name };
          },
          videoUpload: async (file) => {
            const data = await uploadToCloudinary(file, 'video');
            return {
              src: data.secure_url,
              alt: 'cloudinary',
              sizes: {
                width: data.width,
                height: data.height,
              },
            };
          },
        }}
      />
    </div>
  );
};
```

### Props

```ts
type StarterKitProps = {
  id?: string;
  value?: YooptaContentValue;
  onChange?: (value: YooptaContentValue) => void;
  readOnly?: boolean;
  autoFocus?: boolean;
  className?: string;
  placeholder?: string;
  style?: CSSProperties;
  selectionBoxRoot?: React.RefObject<HTMLDivElement> | false;
  media?: MediaUploadsFn;
};
```
