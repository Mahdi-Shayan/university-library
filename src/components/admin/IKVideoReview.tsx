"use client";

import config from "@/lib/config";
import { IKVideo } from "imagekitio-next";

const { urlEndpoint } = config.env.imageKit;

function IKVideoReview({ filePath }: { filePath: string }) {
  return (
    <div className="rounded-lg overflow-hidden">
      <IKVideo
        playsInline
        urlEndpoint={urlEndpoint}
        path={filePath}
        controls
        className="h-full w-full"
      />
    </div>
  );
}
export default IKVideoReview;
