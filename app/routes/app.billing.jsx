import { authenticate } from "../shopify.server";
import { redirect } from "react-router";

export const loader = async ({ request }) => {
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
        name: "Sales Analytics – Life time Access-Non refundable",
        returnUrl: `${process.env.SHOPIFY_APP_URL}/app`,
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
    throw new Error("Billing failed");
  }

  return redirect(confirmationUrl);
};
