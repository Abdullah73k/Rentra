import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import type { User } from "@/lib/types";

const ProfileTab = ({user}: {user: User}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your personal details and contact information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="fullName"
                className="text-xs font-medium uppercase tracking-wide text-gray-600"
              >
                Full Name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                className="h-12 rounded-lg border-gray-300 bg-white text-sm disabled:opacity-60"
              />
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
                value={user.email}
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
              <Label
                htmlFor="phone"
                className="text-xs font-medium uppercase tracking-wide text-gray-600"
              >
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                placeholder="+971 50 123 4567"
                className="h-12 rounded-lg border-gray-300 bg-white text-sm disabled:opacity-60"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="company"
                className="text-xs font-medium uppercase tracking-wide text-gray-600"
              >
                Company
              </Label>
              <Input
                id="company"
                name="company"
                placeholder="Company Name"
                className="h-12 rounded-lg border-gray-300 bg-white text-sm disabled:opacity-60"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="country"
              className="text-xs font-medium uppercase tracking-wide text-gray-600"
            >
              Country
            </Label>
            <Input
              id="country"
              name="country"
              placeholder="United Arab Emirates"
              className="h-12 rounded-lg border-gray-300 bg-white text-sm disabled:opacity-60"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileTab;
