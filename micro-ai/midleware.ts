import createMiddleware from 'next-intl/middleware';
import intlConfig from './next-intl.config';

export default createMiddleware({
  ...intlConfig
});

export const config = {
  // Her locale için path yönlendirmesi
  matcher: ['/', '/(tr|en)/:path*']
};
