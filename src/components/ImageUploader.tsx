"use client";

import config from "@/lib/config";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";

const {
  env: {
    imageKit: { publicKey, urlEndpoint },
  },
} = config;

async function authentication() {
  try {
    const res = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!res.ok) {
      const errortext = await res.text();

      throw new Error(
        `Request failed with status ${res.status}: ${errortext}`
      );
    }

    const data = await res.json();
    const { signature, expire, token } = data;

    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed ${error.message}`);
  }
}

interface Props {
  onChangeField: (filePath: string) => void;
}

function ImageUploader({ onChangeField }: Props) {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  function onError() {
    toast.custom(() => (
      <div className="bg-red-700 text-white p-5 text-[14px] rounded-md w-90">
        <h2>image uploaded failed</h2>
        <p className="text-light-100 text-[13px] mt-1">
          Your image could not be uploaded. Please try again.
        </p>
      </div>
    ));
  }
  function onSuccess(res: any) {
    setFile(res);

    onChangeField(res.filePath);
    toast.custom(() => (
      <div className="bg-dark-300 text-white p-5 text-[14px] rounded-md w-90">
        <h2>image uploaded succesfully</h2>
        <p className="text-light-100 text-[13px] mt-1">
          {res.filePath} uploaded successfuly!
        </p>
      </div>
    ));
  }

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authentication}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
      />
      <button
        className="upload-btn cursor-pointer"
        onClick={(e) => {
          e.preventDefault();

          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current.click();
          }
        }}
      >
        {file ? (
          <p className="upload-filename">{file.filePath}</p>
        ) : (
          <>
            <Image
              src="/icons/upload.svg"
              alt="upload icon"
              height={20}
              width={20}
              className="object-contain"
            />
            <p>Upload a file</p>
          </>
        )}
      </button>
      {file && (
        <div className="relative h-[300px] overflow-hidden">
          <IKImage alt={file.filePath} path={file.filePath} fill />
        </div>
      )}
    </ImageKitProvider>
  );
}

export default ImageUploader;
