import {useUploadThing} from "@/lib/uploadthing/uploadthing";
import {useState, useRef} from "react";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {CloudUpload, X} from "lucide-react";

interface OptionImageUploadProps {
  images: string[];
  setImages: (images: string[]) => void;
}

export default function VariantImages({
  images,
  setImages,
}: OptionImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const {startUpload} = useUploadThing("profilePicture", {
    onClientUploadComplete: async (res) => {
      setIsUploading(false);
      if (res && res.length > 0) {
        setImages([...images, res[0].ufsUrl]);
      }
    },
    onUploadError: () => setIsUploading(false),
    onUploadBegin: () => setIsUploading(true),
  });

  const onFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await startUpload([files[0]]);
    }
  };

  const onDeleteImage = (idx: number) => {
    setImages(images.filter((_: string, i: number) => i !== idx));
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileSelected}
        className="hidden"
        accept="image/*"
      />
      <Button
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
      >
        <CloudUpload size={16} /> Upload
      </Button>
      <div className="flex gap-2 mt-2">
        {images.map((img: string, idx: number) => (
          <div key={img} className="relative">
            <Image
              src={img ? img : "/avatar/placeholder-avatar.png"}
              alt="Option Image"
              width={190}
              height={190}
              className="rounded"
            />
            <Button
              variant="destructive"
              onClick={() => onDeleteImage(idx)}
              className="absolute bottom-0 right-0"
            >
              <X size={16} />
            </Button>
            {/* For update, you can add another upload button here to replace the image */}
          </div>
        ))}
      </div>
    </div>
  );
}
