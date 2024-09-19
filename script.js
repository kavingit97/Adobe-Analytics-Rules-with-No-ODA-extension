addEventListener("DOMContentLoaded", () => {

    // extracting the data from the container once launch enabled
    extractData = () => {
        if(_satellite) {
            _satellite._container.rules.forEach( (rul)=> {
                document.querySelector('#showData').innerHTML = !JSON.stringify(rul.actions).includes('adobeAnalyticsSetDefaultVariables.js') && JSON.stringify(rul.actions).includes('adobe-analytics/src/lib/actions/setVariables.js') ? rul.name : 'No Rule Found';
            })
        }
        else {
            alert ("Launch is still not detectable, try hard refreshing the page and do it again");
        }
        document.querySelector('.loading').hidden = true;
    }

    // when user click on start audit 
    let count = 0;
    document.getElementById('startAudit').addEventListener('click', (event) => {
        if (document.querySelector('#showData').childElementCount === 0) {
            let sTag = document.getElementById('scriptTags').value;
            let src = sTag.substring(sTag.indexOf("https://assets.adobedtm.com"), sTag.indexOf(".min.js")) + '.min.js';
            if(!!src){
                count++;
                console.log(src);
                if(count === 1) {
                    let createScriptTag = document.createElement('script');
                    createScriptTag.src = src;
                    document.head.appendChild(createScriptTag);
                    document.querySelector('.loading').hidden = false;
                    var checkCount = 0;
                    var clearCount = 10;
                    var checkQSI = setInterval(function() {
                        if(typeof _satellite._container === 'object') {
                            extractData();
                            clearInterval(checkQSI);
                        }
                        else {
                            checkCount++;
                            if(checkCount === clearCount) {
                                alert ('Please refresh the page and do the needful');
                                clearInterval(checkQSI);
                            }
                        }
                    }, 2000);
                }            
            }
            else {
                alert ('Entered Script Tag is Not Valid');
            }
        }
        else {
            alert ('Please refresh the page and do the needful');
        }
    })
});
