import { Label } from "@/components/ui/label";
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
import TextInput from "../form/TextInput";
import { Form } from "../ui/form";
import SelectField from "../form/SelectField";
import { COUNTRY_OPTIONS, CURRENCY_OPTIONS } from "@/constants/auth.constants";
import { Button } from "../ui/button";
import { LoadingSwap } from "../ui/loading-swap";
import { authClient } from "@/utils/auth-client";
import { toast } from "sonner";

const profileSchema = z.object({
  fullName: z.string().optional(),
  currency: z.string().optional(),
  country: z.string().optional(),
  vatRate: z.coerce.number<number>().optional(),
});

type ProfileSchema = z.infer<typeof profileSchema>;

const ProfileTab = ({ user }: { user: Session }) => {
  if (user == null) return;

  const { user: userInfo } = user;

  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: userInfo.name,
      currency: userInfo.currency,
      country: userInfo.country,
      vatRate: userInfo.vatProfile,
    },
  });

  const { isSubmitting } = form.formState;

  function handleUpdateUser(data: ProfileSchema) {
    authClient.updateUser(
      {
        name: data.fullName,
        currency: data.currency,
        country: data.country,
        vatProfile: data.vatRate,
      },
      {
        onSuccess: () => {
          toast.success("Update Info Successfully");
        },
        onError: (error) => {
          toast.error(
            error?.error?.message ?? "Failed to update info, try again"
          );
        },
      }
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdateUser)}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <TextInput form={form} name="fullName" label="Name" />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-xs font-medium uppercase tracking-wide text-gray-600"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={user?.user.email}
                    disabled
                    className="h-12 rounded-lg border-gray-300 bg-gray-100 text-sm opacity-60 cursor-not-allowed"
                  />
                  <p className="text-xs text-muted-foreground">
                    Email cannot be changed
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <TextInput
                    form={form}
                    name="vatRate"
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

              <Button
                type="submit"
                className="h-12 w-full rounded-full bg-black text-sm font-medium text-white hover:bg-black/90"
                disabled={isSubmitting}
              >
                <LoadingSwap isLoading={isSubmitting}>
                  Update Account
                </LoadingSwap>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileTab;
