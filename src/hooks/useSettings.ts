import { useState, useEffect } from 'react';
import { SiteSettings } from '../types';
import { settingsService } from '../services/settingsService';

export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings>(settingsService.getSettings());

  useEffect(() => {
    const handleUpdate = () => {
      setSettings(settingsService.getSettings());
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'acn_site_settings') {
        handleUpdate();
      }
    };

    window.addEventListener('settingsUpdated', handleUpdate);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('settingsUpdated', handleUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return settings;
}
