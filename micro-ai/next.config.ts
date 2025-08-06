import withNextIntl from 'next-intl/plugin';

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // serverActions veya appDir burada artık kullanılmaz
  },
  // i18n konfigürasyonu App Router’da desteklenmiyor, next-intl ile yönetilecek
};

export default withNextIntl(nextConfig, 
);
