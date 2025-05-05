"use client";

import config from "@/lib/config";
import { IKImage } from "imagekitio-next";
import Image from "next/image";

const {
  env: {
    imageKit: { publicKey, urlEndpoint },
  },
} = config;

interface Props {
  path: string;
  username?: string;
}

function IDCardPreview({ path, username }: Props) {
  if (!path)
    return (
      <div className="w-full h-full">
        <Image
          src="/icons/loading-circle.svg"
          alt="loading"
          width={50}
          height={50}
        />
      </div>
    );

  return (
    <IKImage
      path={path}
      alt={`${username} ID card`}
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      className="object-contain"
      fill
    />
  );
}
export default IDCardPreview;
