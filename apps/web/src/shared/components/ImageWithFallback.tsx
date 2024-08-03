import Image from 'next/image';
import { ComponentType, useCallback, useState } from 'react';

type ImageWIthFallbackProps = Omit<React.ComponentProps<typeof Image>, 'onError'> & {
  fallbackSrc?: string;
  Fallback?: ComponentType;
};

export const ImageWithFallback = ({
  src,
  fallbackSrc,
  Fallback = () => null,
  ...rest
}: ImageWIthFallbackProps): JSX.Element => {
  const [shouldRenderFallback, setShouldRenderFallback] = useState(!src);

  const onError = useCallback(() => {
    if (shouldRenderFallback) {
      return;
    }

    return () => setShouldRenderFallback(true);
  }, [shouldRenderFallback]);

  return (
    <>
      {shouldRenderFallback ? null : (
        <Image
          {...rest}
          alt={rest.alt}
          src={shouldRenderFallback ? fallbackSrc ?? '' : src}
          onError={onError}
        />
      )}
      {shouldRenderFallback && <Fallback />}
    </>
  );
};
