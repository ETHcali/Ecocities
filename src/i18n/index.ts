import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      "nav.home": "Home",
      "nav.dashboard": "Dashboard",
      "nav.about": "About",
      "nav.contact": "Contact",
      "nav.watchToken": "Watch Token",
      "nav.toggleTheme": "Toggle Theme",
      "nav.language": "Language",
      
      // Header
      "header.title": "EcoCity Token Dashboard",
      "header.subtitle": "First Waste-to-Value Token for Smart Cities in Colombia",
      "header.prelaunch": "Pre-Launch",
      "header.comingSoon": "Coming Soon",
      "header.description": "Transforming urban waste into digital value through community governance and renewable energy",
      
      // Metrics
      "metrics.communityHolders": "Community Holders",
      "metrics.dailyVolume": "Daily Volume",
      "metrics.wasteRecovered": "Waste Recovered",
      "metrics.activeCommunities": "Active Communities",
      "metrics.solarEnergy": "Solar Energy Generated",
      "metrics.governanceProposals": "Governance Proposals",
      "metrics.copBacking": "COP Backing",
      "metrics.recyclingSites": "Recycling Sites",
      
      // Units
      "units.cop": "COP",
      "units.kg": "kg",
      "units.kwh": "kWh",
      "units.daily": "/day",
      "units.total": "Total",
      
      // Chart titles
      "chart.environmentalImpact": "Environmental Impact Trends",
      "chart.solarProduction": "Solar Energy Production",
      "chart.communityGrowth": "Community Participation Growth",
      "chart.wasteRecovery": "Waste Recovery Value",
      
      // Transactions
      "transactions.title": "Recent Transactions",
      "transactions.hash": "Transaction Hash",
      "transactions.from": "From",
      "transactions.to": "To",
      "transactions.value": "Value",
      "transactions.timestamp": "Time",
      "transactions.loading": "Loading transactions...",
      "transactions.error": "Error loading transactions",
      "transactions.noData": "No transactions found",
      
      // Features
      "features.wasteToValue": "Waste-to-Value",
      "features.wasteToValueDesc": "Each token backed 1:1 by Colombian Peso value of recycled materials",
      "features.communityGov": "Community Governance",
      "features.communityGovDesc": "Democratic decision-making for environmental initiatives",
      "features.renewableEnergy": "Renewable Energy",
      "features.renewableEnergyDesc": "Powered by solar panels and battery systems",
      "features.smartCities": "Smart Cities",
      "features.smartCitiesDesc": "Creating energy-autonomous waste collection points",
      
      // Footer
      "footer.poweredBy": "Powered by",
      "footer.partnership": "Partnership with",
      "footer.forSustainability": "for renewable energy solutions",
      "footer.rights": "All rights reserved",
      "footer.builtWith": "Built with 💚 for a sustainable future",
      
      // Actions
      "actions.learnMore": "Learn More",
      "actions.getStarted": "Get Started",
      "actions.joinCommunity": "Join Community",
      "actions.viewMore": "View More",
      "actions.refresh": "Refresh",
      "actions.close": "Close",
      
      // Status
      "status.live": "Live",
      "status.prelaunch": "Pre-Launch",
      "status.comingSoon": "Coming Soon",
      "status.active": "Active",
      "status.growing": "Growing",
      "status.stable": "Stable"
    }
  },
  es: {
    translation: {
      // Navigation
      "nav.home": "Inicio",
      "nav.dashboard": "Panel",
      "nav.about": "Acerca de",
      "nav.contact": "Contacto",
      "nav.watchToken": "Ver Token",
      "nav.toggleTheme": "Cambiar Tema",
      "nav.language": "Idioma",
      
      // Header
      "header.title": "Panel EcoCity Token",
      "header.subtitle": "Primer Token de Residuos-a-Valor para Ciudades Inteligentes en Colombia",
      "header.prelaunch": "Pre-Lanzamiento",
      "header.comingSoon": "Próximamente",
      "header.description": "Transformando residuos urbanos en valor digital a través de gobernanza comunitaria y energía renovable",
      
      // Metrics
      "metrics.communityHolders": "Participantes Comunitarios",
      "metrics.dailyVolume": "Volumen Diario",
      "metrics.wasteRecovered": "Residuos Recuperados",
      "metrics.activeCommunities": "Comunidades Activas",
      "metrics.solarEnergy": "Energía Solar Generada",
      "metrics.governanceProposals": "Propuestas de Gobernanza",
      "metrics.copBacking": "Respaldo COP",
      "metrics.recyclingSites": "Sitios de Reciclaje",
      
      // Units
      "units.cop": "COP",
      "units.kg": "kg",
      "units.kwh": "kWh",
      "units.daily": "/día",
      "units.total": "Total",
      
      // Chart titles
      "chart.environmentalImpact": "Tendencias de Impacto Ambiental",
      "chart.solarProduction": "Producción de Energía Solar",
      "chart.communityGrowth": "Crecimiento de Participación Comunitaria",
      "chart.wasteRecovery": "Valor de Recuperación de Residuos",
      
      // Transactions
      "transactions.title": "Transacciones Recientes",
      "transactions.hash": "Hash de Transacción",
      "transactions.from": "De",
      "transactions.to": "Para",
      "transactions.value": "Valor",
      "transactions.timestamp": "Tiempo",
      "transactions.loading": "Cargando transacciones...",
      "transactions.error": "Error al cargar transacciones",
      "transactions.noData": "No se encontraron transacciones",
      
      // Features
      "features.wasteToValue": "Residuos-a-Valor",
      "features.wasteToValueDesc": "Cada token respaldado 1:1 por el valor en pesos colombianos de materiales reciclados",
      "features.communityGov": "Gobernanza Comunitaria",
      "features.communityGovDesc": "Toma de decisiones democrática para iniciativas ambientales",
      "features.renewableEnergy": "Energía Renovable",
      "features.renewableEnergyDesc": "Alimentado por paneles solares y sistemas de baterías",
      "features.smartCities": "Ciudades Inteligentes",
      "features.smartCitiesDesc": "Creando puntos de recolección de residuos autónomos en energía",
      
      // Footer
      "footer.poweredBy": "Impulsado por",
      "footer.partnership": "Alianza con",
      "footer.forSustainability": "para soluciones de energía renovable",
      "footer.rights": "Todos los derechos reservados",
      "footer.builtWith": "Construido con 💚 para un futuro sostenible",
      
      // Actions
      "actions.learnMore": "Saber Más",
      "actions.getStarted": "Comenzar",
      "actions.joinCommunity": "Unirse a la Comunidad",
      "actions.viewMore": "Ver Más",
      "actions.refresh": "Actualizar",
      "actions.close": "Cerrar",
      
      // Status
      "status.live": "En Vivo",
      "status.prelaunch": "Pre-Lanzamiento",
      "status.comingSoon": "Próximamente",
      "status.active": "Activo",
      "status.growing": "Creciendo",
      "status.stable": "Estable"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n; 