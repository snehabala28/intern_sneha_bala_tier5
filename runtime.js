console.log(`It's Runtime JS!`);

chrome.runtime.onConnect.addListener((port) => {
    if (port.name == 'extPopup') {
    	port.onMessage.addListener((request) => {
            if (request.action == 'openNewTab') {
                let keyword = request.data;
                let url = 'https://www.google.com/search?q='+keyword;
                chrome.tabs.create({ url: url }, (tab) => {
                    setTimeout(()=> {
                        chrome.tabs.remove(tab.id);
                    }, 300000);
                });
            }else if(request.action == 'printTab'){
            	chrome.tabs.query({
			        active: true,
			        lastFocusedWindow: true
			    },(tabs)=>{
			        let tab = tabs[0];
			        chrome.scripting.executeScript({
			            target: { tabId: tab.id },  
			            function: ()=> { 
			              return window.print();
			            }
			        });
			      
			    });
            }
        });
	}else if(port.name == 'extNotify'){		
		port.onMessage.addListener((request) => {
            if (request.action == "notify") {
               console.log(request);
                chrome.notifications.create("noitifyTest",
                    {
                        iconUrl:
                            "icon.png",
                        type: "basic",
                        title: request.data.title,
                        message: request.data.description
                    }
                );
            }
        });
	}
});