import { useCallback } from 'react';
import { useSidebar } from '@/contexts/SidebarContext';

export const usePdfHandler = () => {
  const { closeSidebar } = useSidebar();

  const handlePdfClick = useCallback((path: string) => {
    if (path.endsWith('.pdf')) {
      window.open(path, '_blank');
      closeSidebar();
      return true;
    }
    return false;
  }, [closeSidebar]);

  return { handlePdfClick };
};