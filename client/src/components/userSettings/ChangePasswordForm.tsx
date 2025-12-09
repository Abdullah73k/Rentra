import { PasswordSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form } from "../ui/form";
import CustomPasswordInput from "../form/PasswordInput";
import CheckBoxInput from "../form/CheckBoxInput";
import { authClient } from "@/utils/auth-client";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { LoadingSwap } from "../ui/loading-swap";

const passwordChangeSchema = z.object({
  currentPassword: PasswordSchema,
  newPassword: PasswordSchema,
  revokeOtherSessions: z.boolean(),
});

type PasswordChangeSchema = z.infer<typeof passwordChangeSchema>;

const ChangePasswordForm = () => {
  const form = useForm<PasswordChangeSchema>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      revokeOtherSessions: true,
    },
  });

  const { isSubmitting } = form.formState;

  async function handlePasswordChange(data: PasswordChangeSchema) {
    await authClient.changePassword(data, {
      onError: (error) => {
        toast.error(error.error.message || "Failed to change password");
      },
      onSuccess: () => {
        toast.success("Successfully changed password");
        form.reset();
      },
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handlePasswordChange)}>
        <CustomPasswordInput
          form={form}
          name="currentPassword"
          label="Current Password"
        />
        <CustomPasswordInput
          form={form}
          name="newPassword"
          label="New Password"
        />
        <CheckBoxInput
          form={form}
          name="revokeOtherSessions"
          label="Log out other sessions"
        />

        <Button
          type="submit"
          className="h-12 w-full rounded-full bg-black text-sm font-medium text-white hover:bg-black/90"
          disabled={isSubmitting}
        >
          <LoadingSwap isLoading={isSubmitting}>Update Password</LoadingSwap>
        </Button>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
