import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import type { Session } from "@/lib/types";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../form/text-input";
import { Form } from "../ui/form";
import SelectField from "../form/select-field";
import { COUNTRY_OPTIONS, CURRENCY_OPTIONS } from "@/constants/auth.constants";
import { Button } from "../ui/button";
import { LoadingSwap } from "../ui/loading-swap";
import { authClient } from "@/utils/auth-client";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { editUserAvatar, queryClient } from "@/utils/http";

const profileSchema = z.object({
  fullName: z.string().optional(),
  currency: z.string().optional(),
  country: z.string().optional(),
  vatProfile: z.coerce.number<number>().optional(),
});

type ProfileSchema = z.infer<typeof profileSchema>;

const ProfileTab = ({ user }: { user: Session }) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (user == null)
    return <LoadingSwap isLoading={true} children={undefined} />;

  const { user: userInfo } = user;

  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: userInfo?.name,
      currency: userInfo?.currency,
      country: userInfo?.country,
      vatProfile: userInfo?.vatProfile,
    },
  });

  const { isSubmitting } = form.formState;

  const { mutate } = useMutation({
    mutationKey: ["avatar"],
    mutationFn: editUserAvatar,
    onSuccess: () => {
      toast.success("Profile picture updated successfully");
    },
    onError: (error) => {
      toast.error(
        error?.message ?? "Failed to update profile picture, try again"
      );
    },
  });

  async function handleUpdateUser(data: ProfileSchema) {
    await authClient.updateUser(
      {
        name: data.fullName,
        currency: data.currency,
        country: data.country,
        vatProfile: data.vatProfile,
      },
      {
        onSuccess: () => {
          toast.success("Updated Info Successfully");
        },
        onError: (error) => {
          toast.error(
            error?.error?.message ?? "Failed to update info, try again"
          );
        },
      }
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        // 2 mb max size
        toast.message("File size must be less that 2MB");
        e.target.value = "";
        return;
      }
      setFile(file);
    }
  };

  const handleSaveProfilePicture = (file: File) => {
    mutate(file);
    queryClient.invalidateQueries({ queryKey: ["avatar"] });
    setFile(null);
  };

  const initial = userInfo.name ? userInfo.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your personal details and profile picture
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <Avatar className="h-24 w-24 border-2 border-border/50 shadow-sm">
              <AvatarImage
                src={userInfo.image || ""}
                className="object-cover"
              />
              <AvatarFallback className="text-2xl font-medium bg-muted text-muted-foreground">
                {initial}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-4 items-center sm:items-start">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-sm font-medium leading-none">
                  Profile Picture
                </h3>
                <p className="text-xs text-muted-foreground">
                  Update your profile picture. Supported formats: JPG, PNG.
                </p>
              </div>

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
                  className="h-9 dark:bg-zinc-900/50 dark:border-zinc-800"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mr-2 h-3.5 w-3.5" />
                  Change Picture
                </Button>

                {file && (
                  <>
                    <Button
                      onClick={() => handleSaveProfilePicture(file)}
                      size="sm"
                      className="h-9 bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                    >
                      Save
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 text-muted-foreground hover:text-foreground"
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
            </div>
          </div>

          <div className="h-px bg-border/40" />

          {/* Personal Info Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdateUser)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <TextInput form={form} name="fullName" label="Name" />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-xs font-medium uppercase tracking-wide text-muted-foreground/70"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={userInfo.email}
                    disabled
                    className="h-10 rounded-md border-input bg-muted/50 text-sm opacity-100 cursor-not-allowed text-muted-foreground font-medium"
                  />
                  <p className="text-[10px] text-muted-foreground/60 pl-1">
                    Email address cannot be changed
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <TextInput
                    form={form}
                    name="vatProfile"
                    label="Vat rate"
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <SelectField
                    form={form}
                    name="currency"
                    label="Currency"
                    options={CURRENCY_OPTIONS}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <SelectField
                  form={form}
                  name="country"
                  label="Country"
                  placeholder="Select your country"
                  options={COUNTRY_OPTIONS}
                />
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  className="h-10 px-6 rounded-full bg-black text-sm font-medium text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                  disabled={isSubmitting}
                >
                  <LoadingSwap isLoading={isSubmitting}>
                    Update Account
                  </LoadingSwap>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileTab;
