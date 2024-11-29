import { useCallback, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";

type ProductImageUploaderProps = {
  fieldOnChange: (FILES: File) => void;
};

const ProductImageUploader = ({ fieldOnChange }: ProductImageUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>("");

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      // Do something with the files
      setFile(acceptedFiles[0]);
      fieldOnChange(acceptedFiles[0]);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="w-full h-full border rounded-md cursor-pointer flex-center"
    >
      <input {...getInputProps()} />
      {fileUrl ? (
        <img src={fileUrl} alt="" className="w-full h-full object-contain" />
      ) : (
        <div className="flex-center flex-col">
          <img
            src="/assets/icons/upload.png"
            alt=""
            width={80}
            height={80}
            className="opacity-50"
          />
          <p className="text-sm font-medium text-gray-500">
            Upload Product Image
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductImageUploader;
