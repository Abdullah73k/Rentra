import OauthButton from "./oauth-button";
import { OAuthProviders } from "@/constants/auth.constants";

const OAuthButtons = () => {
  return (
    <>
      {OAuthProviders.map((provider) => {
        return (
          <OauthButton key={provider.provider} provider={provider.provider}>
            {provider.Icon} {provider.provider}
          </OauthButton>
        );
      })}
    </>
  );
};

export default OAuthButtons;
