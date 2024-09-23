import Image from 'next/image';
import { SignInForm } from '../../../features/auth/components/SignInForm';
import { ServerUrlOriginMenu } from '../../../features/dynamicServer/ui/ServerUrlOriginMenu';
import IconServer from '@public/svg/server.svg';
import { Button } from '../../../shared/components/Button';

export default function Page() {
  return (
    <div className="flex min-h-full flex-1">
      <div className="flex flex-1 flex-col">
        <ServerUrlOriginMenu className="m-4">
          <Button>
            <IconServer />
            Server url origin
          </Button>
        </ServerUrlOriginMenu>

        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="flex flex-col justify-center items-center">
              <Image
                alt="Logo"
                src="/brfactory/logo/logo_transparentbg.png"
                className="rounded-full border-2 border-textSecondary"
                width={56}
                height={56}
              />
              <h2 className="mt-4 text-2xl font-bold leading-9 tracking-tight text-textPrimary">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-10">
              <SignInForm />
            </div>
          </div>
        </div>
      </div>

      <div className="relative hidden w-0 flex-1 lg:block bg-gray-50">
        <Image
          alt=""
          src="/brfactory/images/nobrain.png"
          fill={true}
          className="absolute inset-0 h-full w-full object-scale-down"
        />
      </div>
    </div>
  );
}
