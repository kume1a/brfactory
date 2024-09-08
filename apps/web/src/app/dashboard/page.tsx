import { Breadcrumb } from '../../shared/components/Breadcrumb';
import { MainLayout } from '../../shared/components/MainLayout';
import { routes } from '../../shared/constant/routes';

export default function Example() {
  return (
    <MainLayout>
      <Breadcrumb pages={[{ name: 'Dashboard', href: routes.dashboard, current: true }]} />
    </MainLayout>
  );
}
