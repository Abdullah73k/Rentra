

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    fetchPrivateDocs,
    uploadPrivateDocs,
    deletePropertyDoc,
} from "@/utils/http";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    FileText,
    Loader2,
    Trash2,
    Upload,
    ExternalLink,
    Ban,
} from "lucide-react";
import { toast } from "sonner";
import { ActionButton } from "@/components/ui/action-button";

type DocType = "leaseDocs" | "loanDocs" | "tenantDocs";

const DocumentSection = ({
    title,
    type,
    referenceId,
    propertyId,
}: {
    title: string;
    type: DocType;
    referenceId: string;
    propertyId: string;
}) => {
    const queryClient = useQueryClient();
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

    const { data: documents, isLoading } = useQuery({
        queryKey: ["documents", type, referenceId],
        queryFn: () => fetchPrivateDocs(type, referenceId, propertyId),
    });

    const { mutateAsync: uploadDocs, isPending: isUploading } = useMutation({
        mutationFn: async () => {
            if (!selectedFiles || selectedFiles.length === 0) return;
            const filesArray = Array.from(selectedFiles);
            await uploadPrivateDocs(propertyId, referenceId, type, filesArray);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["documents", type, referenceId] });
            setIsUploadOpen(false);
            setSelectedFiles(null);
            toast.success("Documents uploaded successfully");
        },
        onError: () => {
            toast.error("Failed to upload documents");
        },
    });

    const { mutateAsync: deleteDoc, isPending: isDeleting } = useMutation({
        mutationFn: deletePropertyDoc,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["documents", type, referenceId] });
            toast.success("Document deleted successfully");
        },
        onError: () => {
            toast.error("Failed to delete document");
        },
    });

    const parseDocInfo = (url: string) => {
        try {
            const decodedUrl = decodeURIComponent(url);
            const urlObj = new URL(decodedUrl);
            const pathname = urlObj.pathname;
            const parts = pathname.split("/");
            const filename = parts[parts.length - 1];

            if (filename.length > 37) {
                const id = filename.substring(0, 36);
                const name = filename.substring(37);
                return { id, name, url };
            }
            return { id: null, name: filename, url };
        } catch (e) {
            return { id: null, name: "Unknown Document", url };
        }
    };

    const parsedDocs = documents?.map(parseDocInfo) || [];

    return (
        <Card className="mb-4">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle className="text-lg font-medium">{title}</CardTitle>
                    <CardDescription>
                        Manage documents for this {title.toLowerCase().slice(0, -1)}
                    </CardDescription>
                </div>
                <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm" variant="outline" className="gap-2">
                            <Upload className="h-4 w-4" />
                            Upload
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Upload {title}</DialogTitle>
                            <DialogDescription>
                                Select files to upload for this section.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor={`file-${type}`}>Documents</Label>
                                <Input
                                    id={`file-${type}`}
                                    type="file"
                                    multiple
                                    onChange={(e) => setSelectedFiles(e.target.files)}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                onClick={() => uploadDocs()}
                                disabled={isUploading || !selectedFiles}
                            >
                                {isUploading && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Upload
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex items-center justify-center py-4">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                ) : parsedDocs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                        <FileText className="h-10 w-10 mb-2 opacity-20" />
                        <p className="text-sm">No documents found</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {parsedDocs.map((doc, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                            >
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="bg-primary/10 p-2 rounded">
                                        <FileText className="h-4 w-4 text-primary" />
                                    </div>
                                    <a
                                        href={doc.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="truncate text-sm font-medium hover:underline flex items-center gap-1"
                                    >
                                        {doc.name}
                                        <ExternalLink className="h-3 w-3 opacity-50" />
                                    </a>
                                </div>
                                <div className="flex items-center gap-2">
                                    {doc.id ? (
                                        <ActionButton
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                            requireAreYouSure
                                            action={async () => {
                                                await deleteDoc(doc.id!);
                                                return { error: false, message: "Deleted" };
                                            }}
                                            disabled={isDeleting}
                                        >
                                            {isDeleting ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <Trash2 className="h-4 w-4" />
                                            )}
                                        </ActionButton>
                                    ) : (
                                        <span title="Cannot delete: ID not found">
                                            <Ban className="h-4 w-4 text-muted-foreground opacity-30 cursor-not-allowed" />
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default DocumentSection;