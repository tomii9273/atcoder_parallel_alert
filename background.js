chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
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
  const bodyContent = document.body.innerHTML;
  const newContent = bodyContent.replace(
    /ソースコードは「Main.<i>拡張子<\/i>」で保存されます<\/span>/g,
    'ソースコードは「Main.<i>拡張子</i>」で、保存されます</span><br><br><span style="color:red;"><b><font size="7">【警告】これはAHCではありません！</font></b></span>'
  );
  document.body.innerHTML = newContent;
}
