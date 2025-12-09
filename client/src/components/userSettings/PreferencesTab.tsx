import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import BetterAuthActionButton from "../form/BetterAuthActionButton";
import { authClient } from "@/utils/auth-client";

const PreferencesTab = () => {
  return (
    <div className="space-y-6">
      <Card className="border border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription className="text-destructive">
            This action cant be undone
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <BetterAuthActionButton
            requireAreYouSure
            variant="destructive"
            className="w-full"
            successMessage="Account deletion initiated. Please check you email to confirm."
            action={() => authClient.deleteUser({ callbackURL: "/" })}
          >
            Delete Account Permanently
          </BetterAuthActionButton>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreferencesTab;
