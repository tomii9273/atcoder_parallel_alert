chrome.tabs.onUpdated.addListener((_tabId, changeInfo, _tab) => {
  if (changeInfo.status === "complete") {
    chrome.tabs.query({}, (tabs) => {
      let hasAHC = false;
      for (let t of tabs) {
        if (t.url.includes("atcoder") && t.url.includes("ahc")) {
          hasAHC = true;
          break;
        }
      }
      if (hasAHC) {
        for (let t of tabs) {
          if (t.url.includes("atcoder") && !t.url.includes("ahc")) {
            chrome.scripting.executeScript({
              target: { tabId: t.id },
              func: insertWarningText,
            });
          }
        }
      }
    });
  }
});

function insertWarningText() {
  const element = document.querySelector(
    "div.col-sm-9.col-md-10 span[class='gray']"
  );
  if (element) {
    element.innerHTML =
      '</span><br><span style="color:red;"><b><font size="7">【警告】これは AHC ではありません！</font></b></span><br><span class="gray">※ 512 KiB まで</span>';
  }
}
