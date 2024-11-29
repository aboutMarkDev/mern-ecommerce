import { useCallback, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { Button } from "./ui/button";
import { X } from "lucide-react";

type ProductImageUploaderProps = {
  mediaUrl: string[];
  fieldOnChange: (FILES: File[]) => void;
};

const ProductVariationsUploader = ({
  mediaUrl,
  fieldOnChange,
}: ProductImageUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string[]>(mediaUrl || []);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      // Do something with the files
      setFile((prevFile) => [...prevFile, ...acceptedFiles]);

      const newFileUrls = acceptedFiles.map((item) =>
        URL.createObjectURL(item)
      );

      setFileUrl((prevUrls) => [...prevUrls, ...newFileUrls]);
      fieldOnChange([...file, ...acceptedFiles]);
    },
    [file, fieldOnChange]
  );

  const removeFile = (index: number) => {
    const updatedFileUrls = [...fileUrl];
    updatedFileUrls.splice(index, 1); // Remove the selected file from the URL list
    setFileUrl(updatedFileUrls);

    // If the removed item was a newly uploaded file, update the file state as well
    if (index >= mediaUrl.length) {
      const updatedFiles = [...file];
      updatedFiles.splice(index - mediaUrl.length, 1); // Adjust index for files
      setFile(updatedFiles);
      fieldOnChange(updatedFiles); // Notify parent of the updated files
    }
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className="w-full h-full border rounded-md relative overflow-y-auto"
    >
      <input {...getInputProps()} />
      {file.length > 0 ? (
        <div className="flex flex-wrap gap-2 h-full p-3">
          {fileUrl.map((url, index) => (
            <div key={url} className="relative">
              <img src={url} alt="" width={110} height={110} />
              <p className="absolute bottom-1 text-xs left-0 ring-1 ring-[#202020] flex-center bg-white rounded-full h-5 w-5">
                {index + 1}
              </p>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-0 right-0 rounded-full h-6 w-6"
                onClick={() => removeFile(index)}
              >
                <X />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-center flex-col gap-1">
          <img
            src="/assets/icons/upload.png"
            alt=""
            width={80}
            height={80}
            className="opacity-50"
          />
          <p className="text-sm font-medium text-gray-500">
            Upload Variations here...
          </p>
          <Button variant="outline" size="sm" type="button" onClick={open}>
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductVariationsUploader;
