import DocsSectionLayout from "./DocumentLayout";
import { developerGuideItems } from "../DocumentsComponent/DeveloperGuideComponents/developerGuide";

const DeveloperGuide = () => {
  return (
    <DocsSectionLayout
      title="Developers Guide"
      items={developerGuideItems}
    />
  );
};

export default DeveloperGuide;