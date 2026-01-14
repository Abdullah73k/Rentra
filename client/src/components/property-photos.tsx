import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { addPropertyPicture, queryClient } from "@/utils/http";

const PropertyPhotos = ({ propertyId, photos }: { propertyId: string; photos: string[] }) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        // 5 mb max size
        toast("File size must be less than 5MB");
        e.target.value = "";
        return;
      }
      setFile(file);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-property-picture", propertyId],
    mutationFn: (file: File) => addPropertyPicture(propertyId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["property", propertyId] });
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      toast("Photo uploaded successfully");
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error && error.message
          ? error.message
          : "Failed to upload photo";
      toast(message);
    },
  });

  function handleSavePropertyPicture(file: File) {
    mutate(file);
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Photos</CardTitle>
        <CardDescription>Manage the gallery for this property.</CardDescription>
        <CardAction>
          <div className="flex items-center gap-2">
            <Input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/jpeg, image/png, image/jpg, image/gif"
              onChange={handleFileChange}
            />

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 gap-2 bg-background/50"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Upload Picture
              </span>
            </Button>

            {file && (
              <>
                <Button
                  onClick={() => handleSavePropertyPicture(file)}
                  size="sm"
                  className="h-8"
                  disabled={isPending}
                >
                  {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    setFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos && photos.length > 0 ? (
            photos.map((photo, index) => (
              <div
                key={photo}
                className="aspect-video rounded-xl bg-muted/40 border border-dashed flex flex-col items-center justify-center text-muted-foreground gap-2 hover:bg-muted/60 transition-colors"
              >
                <img src={photo} alt={`Property photo ${index + 1}`} height={512} width={512} className="w-[512px] h-[512px] object-cover" />
              </div>
            ))
          ) : (
            <div className="aspect-video rounded-xl bg-muted/40 border border-dashed flex flex-col items-center justify-center text-muted-foreground gap-2 hover:bg-muted/60 transition-colors">
              <ImageIcon className="h-8 w-8 opacity-40" />
              <span className="text-xs font-medium">No photos</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyPhotos;
