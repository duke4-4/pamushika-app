module.exports = {
  expo: {
    name: "pamushika-app",
    slug: "pamushika-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.pamushika.app",
      // EAS Build injects this from the GOOGLE_SERVICES_IOS_PLIST file env var;
      // falls back to the local (gitignored) file for local/dev-client builds.
      googleServicesFile: process.env.GOOGLE_SERVICES_IOS_PLIST ?? "./GoogleService-Info.plist",
    },
    android: {
      package: "com.pamushika.app",
      // EAS Build injects this from the GOOGLE_SERVICES_JSON file env var;
      // falls back to the local (gitignored) file for local/dev-client builds.
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON ?? "./google-services.json",
      adaptiveIcon: {
        backgroundColor: "#FFFFFF",
        foregroundImage: "./assets/android-icon-foreground.png",
        backgroundImage: "./assets/android-icon-background.png",
        monochromeImage: "./assets/android-icon-monochrome.png",
      },
      predictiveBackGestureEnabled: false,
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: [
      "@react-native-firebase/app",
      "@react-native-firebase/auth",
      [
        "expo-splash-screen",
        {
          image: "./assets/splash-icon.png",
          imageWidth: 220,
          resizeMode: "contain",
          backgroundColor: "#16a34a",
        },
      ],
    ],
    extra: {
      eas: {
        projectId: "aed057c7-d40e-4f93-96af-4a566b57ed01",
      },
    },
    owner: "just_duke",
  },
};
