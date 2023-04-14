import { Text } from "@chakra-ui/react";
import { AppLayout, SeoLayout } from "../../page-components";

const AppPage: React.FC = () => {
  return (
    <SeoLayout title="Dashboard">
      <AppLayout>
        <Text>OI</Text>
      </AppLayout>
    </SeoLayout>
  );
};

export default AppPage;
