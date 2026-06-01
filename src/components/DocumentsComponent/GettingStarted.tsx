import DocsSectionLayout from "./DocumentLayout";
import { gettingStartedItems } from "./GettingStartedComponents/GettingStarted";

const GettingStarted = () => {
  return (
    <DocsSectionLayout
      title="Getting Started"
      items={gettingStartedItems}
    />
  );
};

export default GettingStarted;