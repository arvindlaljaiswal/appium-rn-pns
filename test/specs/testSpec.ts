async function lookForNotification(
  numOfTries: number,
  notificationText: string
) {
  let found: boolean = false;

  if (numOfTries > 0) {
    await driver.openNotifications();
    const elements = await driver.findElements("id", "android:id/title");

    for (let index = 0; index < elements.length; index++) {
      const element = elements[index];
      let text: string = await $(element).getText();
      console.log(
        "title text ==========================================================>>>>>>>>>",
        text
      );
      if (text === notificationText) {
        found = true;
        console.log(">>>>>Notification Found<<<<<<");

        await $(element).click();
        break;
      }
    }
    if (!found) {
      await driver.back();
      lookForNotification(numOfTries - 1, notificationText);
    }
  }
}

async function lookForFBNotification(
  numOfTries: number,
  notificationText: string
) {
  let found: boolean = false;

  if (numOfTries > 0) {
    for (let index = 0; index < numOfTries; index++) {
      const element = await driver.findElement("id", "android:id/title");
      console.log(
        "=============== isDisplayed ===========",
        await $(element).isDisplayed()
      );
      let text: string = await $(element).getText();
      if (text === notificationText) {
        found = true;
        console.log("===============Notification Found ===========");

        return await $(element).isDisplayed();
      }
    }
    if (!found) {
      lookForFBNotification(numOfTries - 1, notificationText);
    }
  }
}

describe("Sample application Test", () => {
  it("Testing", async () => {
    if (driver.isIOS) {
      await $("~Allow").click();
    }

    await expect($("~greeting")).toHaveText("Welcome!");
    await expect($("~welcome")).toHaveText(
      "Push Notification Demo using Firebase"
    );
    await $("~localNotification").click();

    if (driver.isAndroid) {
      await driver.updateSettings({
        enableMultiWindows: true,
      });
      await driver.waitUntil(
        async () =>
          await driver
            .findElement("id", "android:id/title")
            .then(async (element) => await $(element).isDisplayed())
      );

      await driver.openNotifications();
      const elements = await driver.findElements("id", "android:id/title");
      console.log("LENGTH", elements.length);
      for (let index = 0; index < elements.length; index++) {
        const notificationElement = elements[index];
        let text: string = await $(notificationElement).getText();
        console.log("title text =>", text);
        if (text === "Title of the Notification") {
          console.log(">>>>>Notification Found<<<<<<");

          await $(notificationElement).click();
          break;
        }
      }
    } else {
      await $("~NotificationShortLookView").waitForDisplayed();
      await $("~NotificationShortLookView").waitForExist({ reverse: true });

      const windowSize = await driver.getWindowSize();
      const height = windowSize.height;

      await driver.touchAction([
        { action: "press", x: 50, y: 10 },
        { action: "wait", ms: 1000 },
        { action: "moveTo", x: 50, y: height - 100 },
        { action: "release" },
      ]);

      await driver.findElements("name", "NotificationCell").then((elements) => {
        console.log("--->", elements.length);
        elements.forEach(async (element) => {
          let text: string = await $(element).getText();
          console.log("text", text);
          if (
            text ===
            "SAMPLEAPP, now, Local Notification, Hello this is a local notification!!!"
          ) {
            console.log("inside");
            const ele = await $(element);
            const size = await ele.getSize();
            console.log(size);

            await $(element).touchAction([
              { action: "press", x: 50, y: size.height / 2 },
              { action: "wait", ms: 1000 },
              { action: "moveTo", x: size.width - 100, y: size.height / 2 },
              { action: "release" },
            ]);
          }
        });
      });
    }
    await $("~nextScreen").waitForDisplayed();
    await $("~nextScreen").click();
    await expect($("~details")).toHaveText("This is Details Screen");
  });
});
