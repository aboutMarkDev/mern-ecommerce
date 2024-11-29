import { useCallback, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";

type VariationsUploaderProps = {
  mediaUrl: string[];
  fieldOnChange: (FILES: File[]) => void;
};

const VariationsUploader = ({
  mediaUrl,
  fieldOnChange,
}: VariationsUploaderProps) => {
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

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className="border h-52 rounded w-full overflow-auto p-3 cursor-pointer"
    >
      <input {...getInputProps()} />
      <div className="flex-center flex-wrap gap-2">
        {fileUrl?.map((item, index) => (
          <div key={item} className="relative h-40 w-40">
            <img src={item} alt="" className="w-full h-full object-contain" />
            <button
              type="button"
              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
              onClick={() => removeFile(index)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* {file.length > 0 ? (
        <div className="flex-center flex-wrap gap-2">
          {fileUrl.map((item) => (
            <div key={item} className="h-40 w-40">
              <img src={item} alt="" className="w-full h-full object-contain" />
            </div>
          ))}
        </div>
      ) : (
        <p>Drop files here...</p>
      )} */}
    </div>
  );
};

export default VariationsUploader;
