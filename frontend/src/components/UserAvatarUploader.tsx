import { Camera } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";

type UserAvatarUploaderProps = {
  mediaUrl: string;
  fieldOnChange: (FILES: File) => void;
};

const UserAvatarUploader = ({
  mediaUrl,
  fieldOnChange,
}: UserAvatarUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      // Do something with the files
      setFile(acceptedFiles[0]);
      fieldOnChange(acceptedFiles[0]);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div className="w-full max-w-[7rem] h-[7rem] rounded-full cursor-pointer relative">
        <img
          src={fileUrl}
          alt={fileUrl}
          className={`w-full h-full object-contain rounded-full ring-1 ring-secondary ${
            isDragActive && "opacity-50"
          } transition-opacity duration-200`}
        />

        <div className="bg-gray-100 rounded-full absolute bottom-0 right-0 p-1">
          <Camera className="text-[#202020]" />
        </div>
      </div>
    </div>
  );
};

export default UserAvatarUploader;
