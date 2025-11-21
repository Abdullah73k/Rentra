import type { ReactNode } from "react";
import { Button } from "../ui/button";

const OauthButton = ({ children }: { children: ReactNode }) => {
  return (
    <Button
      type="button"
      variant="outline"
      className="h-12 flex-1 rounded-full border-2 border-black bg-white text-sm font-medium hover:bg-black hover:text-white"
    >
      {children}
    </Button>
  );
};

export default OauthButton;
