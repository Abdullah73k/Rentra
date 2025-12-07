import type { ComponentProps } from "react";
import { ActionButton } from "../ui/action-button";

const BetterAuthActionButton = ({
  action,
  successMessage,
  ...props
}: Omit<ComponentProps<typeof ActionButton>, "action"> & {
  action: () => Promise<{ error: null | { message?: string } }>;
  successMessage?: string;
}) => {
  return (
    <ActionButton {...props} action={async () => {
        const res = await action()
        if (res.error) {
            return {error: true, message: res.error.message || "Action failed"}
        } else {
            return {error: false, message: successMessage}
        }
    }} />
  )
};

export default BetterAuthActionButton;
