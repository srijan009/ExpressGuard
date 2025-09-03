import type {
  RunInput,
  FunctionRunResult,
} from "../generated/api";

const NO_CHANGES: FunctionRunResult = {
  operations: [],
};

type Configuration = {};

type ProductTag = {
  hasTag: boolean;
  tag: string;
};

export function run(input: RunInput): FunctionRunResult {
  const configuration: Configuration = JSON.parse(
    input?.deliveryCustomization?.metafield?.value ?? "{}"
  );
  

  // Check if any product has the perishable tag
  const cartLines = input.cart?.lines || [];
  const deliveryGroups = input.cart?.deliveryGroups || [];
  if (!deliveryGroups.length) return NO_CHANGES;

  const hasPerishableItem = cartLines.some(line => {
    // More flexible check that doesn't require __typename

    return (line.merchandise.__typename == 'ProductVariant' &&
      line.merchandise?.product)?.hasTags?.some((tagResponse : ProductTag ) =>
        tagResponse.hasTag && tagResponse.tag === "hazardous"
      );
  });

  if (!hasPerishableItem) return NO_CHANGES;
  
  // Find Express delivery option
  const deliveryOptions = deliveryGroups[0]?.deliveryOptions || [];
  const expressDeliveryOption = deliveryOptions.find(option => option.title == 'Express (3 Business Days, Mon-Fri)');

  if (!expressDeliveryOption) return NO_CHANGES;
    // Hide the free delivery option
  return {
    operations: [
      {
        hide: {
          deliveryOptionHandle: expressDeliveryOption.handle
        }
      }
    ]
  };

  return NO_CHANGES;
};