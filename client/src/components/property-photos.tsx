import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { addPropertyPicture } from "@/utils/http";

const PropertyPhotos = ({ propertyId }: { propertyId: string }) => {
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size > 5 * 1024 * 1024) {
                // 5 mb max size
                toast("File size must be less that 5MB");
                e.target.value = "";
                return;
            }
            setFile(file);
        }
    };

    const { mutate } = useMutation({
        mutationKey: ["add-property-picture", propertyId],
        mutationFn: (file: File) => addPropertyPicture(propertyId, file)
    })

    function handleSavePropertyPicture(file: File) {
        mutate(file);
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Photos</CardTitle>
                <CardDescription>
                    Manage the gallery for this property.
                </CardDescription>
                <CardAction>
                    <div className="flex items-center gap-2">
                        <Input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/jpeg, image/png, image/jpg"
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
                                >
                                    Save
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                    onClick={() => {
                                        setFile(null);
                                        if (fileInputRef.current)
                                            fileInputRef.current.value = "";
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
                    <div className="aspect-video rounded-xl bg-muted/40 border border-dashed flex flex-col items-center justify-center text-muted-foreground gap-2 hover:bg-muted/60 transition-colors">
                        <ImageIcon className="h-8 w-8 opacity-40" />
                        <span className="text-xs font-medium">No photos</span>
                    </div>
                    {/* Placeholder slots for layout demonstration */}
                 
                </div>
            </CardContent>
        </Card>
    )
}

export default PropertyPhotos;