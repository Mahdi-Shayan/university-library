"use client"

import config from "@/lib/config";
import { IKVideo, ImageKitProvider } from "imagekitio-next";

function BookVideo({ videoUrl }: { videoUrl: string }) {
  return (
    <ImageKitProvider
      publicKey={config.env.imageKit.privateKey}
      urlEndpoint={config.env.imageKit.urlEndpoint}
    >
      <IKVideo
        path={videoUrl}
        controls={true}
        className="w-full rounded-xl"
      />
    </ImageKitProvider>
  );
}

export default BookVideo;
