import Image from 'next/image';
import { SignInForm } from '../../../features/auth/components/SignInForm';
// import SvgGithub from '@public/svg/github.svg';
// import SvgGoogle from '@public/svg/google.svg';

export default function Example() {
  return (
    <div className="flex min-h-full flex-1">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex flex-col justify-center items-center">
            <Image
              alt="Logo"
              src="/logo/logo_transparentbg.png"
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

            {/* <div className="mt-10">
              <div className="relative">
                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white px-6 text-gray-900">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <a
                  href="#"
                  className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-textPrimary ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                >
                  <SvgGoogle className="w-5 h-5" />
                  <span className="text-sm font-semibold leading-6">Google</span>
                </a>

                <a
                  href="#"
                  className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-textPrimary ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                >
                  <SvgGithub className="w-5 h-5" />
                  <span className="text-sm font-semibold leading-6">GitHub</span>
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block bg-gray-50">
        <Image
          alt=""
          src="/images/nobrain.png"
          fill={true}
          className="absolute inset-0 h-full w-full object-scale-down"
        />
      </div>
    </div>
  );
}
