import DocsSectionLayout from "./DocumentLayout";
import { NonDeveloperGuideItems } from "./NonDevelopersGuide/NonDeveloperGuideItems";

const NonDevelopersGuide = () => {
  return (
    <DocsSectionLayout
      title="Non - Developers Guide"
      items={NonDeveloperGuideItems}
    />
  );
};

export default NonDevelopersGuide;