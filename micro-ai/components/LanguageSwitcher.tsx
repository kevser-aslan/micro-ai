'use client';

interface LanguageSwitcherProps {
  locale: string;
  onLocaleChange: (locale: 'tr' | 'en') => void;
}

export default function LanguageSwitcher({ locale, onLocaleChange }: LanguageSwitcherProps) {
  return (
    <select
      value={locale}
      onChange={(e) => onLocaleChange(e.target.value as 'tr' | 'en')}
      className="bg-gray-700 text-white px-2 py-1 rounded"
      style={{ position: 'fixed', top: 10, right: 10, zIndex: 1000 }}
    >
      <option value="tr">Türkçe</option>
      <option value="en">English</option>
    </select>
  );
}
