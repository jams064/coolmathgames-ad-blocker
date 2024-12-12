function isExtension() {
    return window.chrome && chrome.runtime && chrome.runtime.id;
}

function executeOnAllCoolmathTabs(func, args) {
    if (!isExtension()) {
        return
    }

    return chrome.tabs.query({ url: "*://*.coolmathgames.com/*" }).then((tabs) => {
        tabs.forEach((tab) => {
            chrome.scripting.executeScript({
                target: {tabId : tab.id},
                func: func,
                args: args
            })
            .then(() => console.log("injected a function"));
        })
    })
}

function onload() {
    // HANDLE ALL TOGGLE BUTTONS
    {
        // Get all toggle buttons
        const toggleButtons = document.querySelectorAll(".btn.toggle");
        
        // Define handler function
        const handleToggleButton = (btn) => {
            btn.addEventListener("click", () => {
                if (!btn.hasAttribute("disabled")) {
                    btn.toggleAttribute("checked");
                }
            })
        }
        
        // Hook each button to handler
        toggleButtons.forEach(handleToggleButton);
    }
    
    // HANDLE BLOCKING BUTTON
    const toggleBlockingButton = document.querySelector("#blockingToggleButton");
    
    if (toggleBlockingButton) {
        toggleBlockingButton.onclick = () => {
            if (toggleBlockingButton.getAttribute("checked")) {
                executeOnAllCoolmathTabs(() => {
                    validSubscriber = true;
                });
            } else {
                executeOnAllCoolmathTabs(() => {
                    validSubscriber = false;
                });
            }
        }
    }
}

document.addEventListener("load", onload);