"use client";
import {
  CldImage,
  CldUploadWidget,
  CloudinaryUploadWidgetInfo,
} from "next-cloudinary";
import { useState } from "react";

const UploadPage = () => {
  const [publicId, setPublicId] = useState("");
  return (
    <>
      {publicId && (
        <CldImage
          src={publicId}
          alt={"uploaded image"}
          width={200}
          height={200}
        ></CldImage>
      )}
      <CldUploadWidget
        uploadPreset="dqo8fdhd"
        onSuccess={(result, widget) => {
          if (result.event === "success") {
            const info = result.info as CloudinaryUploadWidgetInfo;
            const id = info.public_id;
            setPublicId(id);
          } else {
            return;
          }
        }}
      >
        {({ open }) => (
          <button className="btn btn-primary" onClick={() => open()}>
            Upload
          </button>
        )}
      </CldUploadWidget>
    </>
  );
};

export default UploadPage;
