"use client";

import config from "@/lib/config";
import { cn } from "@/lib/utils";
import {
  IKImage,
  ImageKitProvider,
  IKUpload,
  IKVideo,
} from "imagekitio-next";
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
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "light" | "dark";
  value?: string;
  onChangeField: (filePath: string) => void;
}

function FileUploader({
  type,
  accept,
  placeholder,
  folder,
  variant,
  value,
  onChangeField,
}: Props) {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: value ?? null,
  });
  const [progress, setProgress] = useState<number>(0);

  function onError(): void {
    toast.error(`${type} uploaded failed`, {
      description: `Your ${type} could not be uploaded. Please try again.`,
    });
  }
  function onSuccess(res: any): void {
    setFile(res);

    onChangeField(res.filePath);
    toast.success(`${type} uploaded succesfully`, {
      description: `${res.filePath} uploaded successfuly!`,
    });
  }
  function onValidate(file: File): boolean {
    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        toast.error("File size too large", {
          description:
            "Please upload a file that is less that 20MB in size",
        });

        return false;
      }
    } else if (type === "video") {
      if (file.size > 50 * 1024 * 1024) {
        toast.error("File size too large", {
          description:
            "Please upload a file that is less that 50MB in size",
        });

        return false;
      }
    }

    return true;
  }

  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-600 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : " text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  };

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
        validateFile={onValidate}
        useUniqueFileName={true}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);

          setProgress(percent);
        }}
        folder={folder}
        accept={accept}
      />
      <button
        className={cn("upload-btn cursor-pointer", styles.button)}
        onClick={(e) => {
          e.preventDefault();

          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current.click();
          }
        }}
      >
        {file && file.filePath ? (
          <p className={cn("upload-filename", styles.text)}>
            {file.filePath}
          </p>
        ) : (
          <>
            <Image
              src="/icons/upload.svg"
              alt="upload icon"
              height={20}
              width={20}
              className="object-contain"
            />
            <p className={styles.placeholder}>{placeholder}</p>
          </>
        )}
      </button>
      {progress > 0 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}
      {file && file.filePath && (
        <div className="relative h-[300px] overflow-hidden">
          {type === "image" ? (
            <IKImage
              alt={file.filePath}
              path={file.filePath}
              fill
              className="object-contain"
            />
          ) : type === "video" ? (
            <IKVideo
              path={file.filePath}
              controls
              className="h-full w-full"
            />
          ) : null}
        </div>
      )}
    </ImageKitProvider>
  );
}

export default FileUploader;
