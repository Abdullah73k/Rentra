import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import BetterAuthActionButton from "../form/auth-action-button";
import { authClient } from "@/utils/auth-client";

const PreferencesTab = () => {
  return (
    <div className="space-y-6">
      <Card className="border border-destructive">
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription>
            This action can't be undone
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <BetterAuthActionButton
            requireAreYouSure
            variant="destructive"
            className="w-full"
            successMessage="Account deletion initiated. Please check your email to confirm."
            action={() => authClient.deleteUser({ callbackURL: "http://localhost:5173" })}
          >
            Delete Account Permanently
          </BetterAuthActionButton>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreferencesTab;
