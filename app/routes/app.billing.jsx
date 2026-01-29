import { authenticate } from "../shopify.server";
import { redirect } from "react-router";

export const loader = async ({ request }) => {
  try {
    const { admin } = await authenticate.admin(request);

    const response = await admin.graphql(
      `#graphql
      mutation AppPurchaseOneTimeCreate(
        $name: String!
        $price: MoneyInput!
        $returnUrl: URL!
      ) {
        appPurchaseOneTimeCreate(
          name: $name
          price: $price
          returnUrl: $returnUrl
        ) {
          confirmationUrl
          userErrors {
            message
          }
        }
      }`,
      {
        variables: {
          name: "Sales Analytics – One-Time Access",
          returnUrl: "https://test-shopify-app-pi.vercel.app/app",
          price: {
            amount: 700,
            currencyCode: "USD",
          },
        },
      }
    );

    const data = await response.json();

    const confirmationUrl =
      data?.data?.appPurchaseOneTimeCreate?.confirmationUrl;

    if (!confirmationUrl) {
      throw new Error("No confirmation URL");
    }

    return redirect(confirmationUrl);
  } catch (err) {
    console.error("BILLING ERROR", err);
    return redirect("/app?billing_error=true");
  }
};
