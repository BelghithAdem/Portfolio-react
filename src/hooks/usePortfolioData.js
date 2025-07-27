import { useTranslation } from 'react-i18next';
import { portfolioDataFr } from '../data/portfolioDataFr';
import { portfolioDataEn } from '../data/portfolioDataEn';

export const usePortfolioData = () => {
  const { i18n } = useTranslation();
  
  const getPortfolioData = () => {
    switch (i18n.language) {
      case 'en':
        return portfolioDataEn;
      case 'fr':
      default:
        return portfolioDataFr;
    }
  };

  return getPortfolioData();
}; 