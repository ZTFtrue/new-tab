chrome.runtime.onInstalled.addListener(function (object) {
    let externalUrl = "https://github.com/ZTFtrue/new-tab/blob/main/update-log.md";
    if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({ url: externalUrl }, function (tab) {
        });
    }
});