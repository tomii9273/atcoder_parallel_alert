chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url.includes("ahc")) {
    chrome.tabs.query({}, (tabs) => {
      for (let t of tabs) {
        chrome.scripting.executeScript({
          target: {tabId: t.id},
          func: insertWarningText,
        });
      }
    });
  }
});

function insertWarningText() {
  const bodyContent = document.body.innerHTML;
  const newContent = bodyContent.replace(/ソースコードは「Main.<i>拡張子<\/i>」で保存されます/g, 'ソースコードは「Main.<i>拡張子</i>」で保存されます\n<span style="color:red;">警告！！！！！！これはABCです！！！！！</span>');
  document.body.innerHTML = newContent;
}
