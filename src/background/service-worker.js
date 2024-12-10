const StorageKeyName = "isBlockingCMGAds";

document.addEventListener("load", (e) => {
	chrome.storage.local.get([StorageKeyName]).then((result) => {
		if (result.value) {
			validSubscriber = true;
			console.log("Set validSubscriber to true", validSubscriber);
		}
	});
});
