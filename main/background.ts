import { Menu, app, dialog } from "electron";
import log from "electron-log";
import serve from "electron-serve";
import { autoUpdater } from "electron-updater";
import path from "path";
import { createWindow } from "./helpers";
const isProd: boolean = process.env.NODE_ENV === "production";
const iconPath = `${path.join(__dirname, "../resources/windowIcon.png")}`;

if (isProd) serve({ directory: "app" });
else app.setPath("userData", `${app.getPath("userData")} (development)`);

autoUpdater.autoDownload = false;
log.transports.file.level = "info";
autoUpdater.logger = log;

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    height: 720,
    width: 1460,
    webPreferences: {
      backgroundThrottling: false,
      nodeIntegration: true,
    },
    icon: iconPath,
  });

  Menu.setApplicationMenu(null);

  if (isProd) await mainWindow.loadURL("app://./home.html");
  else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
  }

  mainWindow.webContents.openDevTools();

  autoUpdater.setFeedURL({
    provider: "github",
    owner: "epicquestti",
    repo: "inr-panel-app",
    token: "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",
    private: true,
  });

  autoUpdater.on("error", (error) => {
    dialog.showErrorBox(
      "Error: ",
      error == null ? "unknown" : (error.stack || error).toString()
    );
  });

  autoUpdater.on("update-available", () => {
    dialog
      .showMessageBox({
        type: "info",
        title: "Found Updates",
        message: "Found updates, do you want update now?",
        buttons: ["Yes", "No"],
      })
      .then((buttonIndex) => {
        if (buttonIndex.response === 0) {
          autoUpdater.downloadUpdate();
        }
      });
  });

  autoUpdater.on("update-not-available", () => {
    dialog.showMessageBox({
      title: "No Updates",
      message: "Current version is up-to-date.",
    });
  });

  autoUpdater.on("update-downloaded", () => {
    dialog
      .showMessageBox({
        title: "Install Updates",
        message: "Updates downloaded, application will be quit for update...",
      })
      .then(() => {
        setImmediate(() => autoUpdater.quitAndInstall());
      });
  });

  setInterval(async () => {
    const aaa = await autoUpdater.checkForUpdates();
    console.log("cancellationToken :" + aaa.cancellationToken);
    console.log("updateInfo :" + aaa.updateInfo);
  }, 3000);
})();

app.on("window-all-closed", () => {
  app.quit();
});
