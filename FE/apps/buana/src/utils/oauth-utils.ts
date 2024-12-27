export const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://notulensia.id";

const authLink = "https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount";
const clientId = "898862951743-ort2u42i3kgdfuhsf9jn1ffi9a39embv.apps.googleusercontent.com";

export const getAccessToken = ({ redirectUri, scope, inWindow }: { redirectUri: string, scope: string, inWindow?: boolean }) => {
  const queryParams = {
    client_id: clientId,
    redirect_uri: `${baseUrl}${redirectUri}`,
    scope,
    prompt: "select_account",
    response_type: "token",
    include_granted_scopes: true,
    enable_granular_consent: true,
  };
  const queryString = Object.keys(queryParams)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(
          queryParams[key],
        )}`,
    )
    .join("&");

  const url = `${authLink}?${queryString}`;
  if (inWindow) {
    window.location.href = url;
  } else {
    const newWindow = window.open(url, "_blank");
    if (newWindow) {
      newWindow.focus();
    }
  }
}