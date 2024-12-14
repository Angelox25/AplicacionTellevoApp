import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tellevoapp.app',
  appName: 'TeLlevoApp',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000, // Duración de la pantalla de inicio (ms)
      backgroundColor: "#ffffff", // Color de fondo
      androidScaleType: "CENTER_CROP", // Ajuste de imagen
      showSpinner: false // Ocultar spinner de carga
    }
  }
};

export default config;

