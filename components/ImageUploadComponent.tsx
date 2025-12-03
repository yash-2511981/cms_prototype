"use client";

import { useState } from "react";
import Image from "next/image";
import { UploadImage } from "@/app/serveraction";

interface Props {
  onUpload: (url: string) => void;
  initialUrl?: string | null;
}

export default function ImageUploadComponent({ onUpload, initialUrl }: Props) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");
  const [currentUrl, setCurrentUrl] = useState(initialUrl || "");

  const MAX_SIZE = 1 * 1024 * 1024;

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_SIZE) {
      alert("File size must be less than 1 MB.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Only images are allowed.");
      return;
    }

    setUploading(true);
    const { success, url } = await UploadImage(file, currentUrl);
    if (success) {
      setCurrentUrl(url);
      onUpload(url);
    } else {
      setErr("Failed to upload");
    }
    setUploading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-black">Hero Image</label>

      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="text-black border p-1 rounded-sm"
      />

      {uploading && <p className="text-xs text-gray-600">Uploading...</p>}

      {currentUrl && (
        <Image
          src={currentUrl}
          alt="Uploaded preview"
          className="h-32 w-32 object-cover rounded-lg border border-black/20 mt-2"
          width={128}
          height={128}
          unoptimized
        />
      )}

      <p>{err}</p>
    </div>
  );
}
