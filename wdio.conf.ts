export const config: WebdriverIO.Config = {
  specs: ["./test/specs/**/*.ts"],
  exclude: [
    // 'path/to/excluded/files'
  ],
  path: "/wd/hub",
  port: 4723,
  maxInstances: 10,
  user: "merit",
  key: "ae3aa41c-1ec4-441f-992e-fd55bda01d44",
  region: "us",
  capabilities: [
    {
      app: "/Users/arvindlal/alj/sampleapp10feb.apk",
      // app: "/Users/arvindlal/alj/sampleapp18Jan.apk",
      automationName: "UiAutomator2",
      browserName: "",
      deviceName: "emulator-5554",
      platformVersion: "12",
      // deviceName: "ZY3227T6JK", // 7TCUVSEASG55EUWC
      // platformVersion: "8.1.0",
      fullReset: true,
      noReset: false,
      platformName: "Android",
    },
    // {
    //   automationName: "XCUITest",
    //   app: "/Users/arvindlal/alj/sampleapp18Jan.app",
    //   browserName: "",
    //   deviceName: "iPhone 11 Pro",
    //   fullReset: false,
    //   platformName: "iOS",
    //   platformVersion: "13.4",
    // },
  ],

  logLevel: "info",
  bail: 0,
  baseUrl: "http://localhost",
  waitforTimeout: 10000,
  connectionRetryTimeout: 240000,
  connectionRetryCount: 3,
  services: ["appium"],
  // services: ["sauce"],
  framework: "mocha",
  reporters: ["spec"],
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
};
