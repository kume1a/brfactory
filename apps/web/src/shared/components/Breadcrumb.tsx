import { HomeIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import Link from 'next/link';

type BreadcrumbPage = {
  name: string;
  href: string;
  current: boolean;
};

type Props = {
  pages: BreadcrumbPage[];
};

export const Breadcrumb = ({ pages }: Props): JSX.Element => {
  return (
    <nav aria-label="Breadcrumb" className="flex mb-2">
      <ol role="list" className="flex items-center space-x-3">
        <li>
          <HomeIcon
            aria-hidden="true"
            className="h-5 w-5 flex-shrink-0 text-gray-400 hover:text-gray-500"
          />
        </li>
        {pages.map(page => (
          <li key={page.name}>
            <div className="flex items-center">
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="h-5 w-5 flex-shrink-0 text-gray-300"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <Link
                href={page.href}
                aria-disabled={page.current}
                aria-current={page.current ? 'page' : undefined}
                className={classNames(
                  'ml-3 text-sm font-medium text-gray-500',
                  page.current ? 'pointer-events-none' : 'hover:text-gray-700'
                )}
              >
                {page.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};
