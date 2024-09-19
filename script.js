addEventListener("DOMContentLoaded", () => {

    // extracting the data from the container once launch enabled
    extractData = () => {
        if(_satellite) {

            _satellite._container.rules.forEach( (rul)=> {

                !JSON.stringify(rul.actions).includes('adobeAnalyticsSetDefaultVariables.js') && JSON.stringify(rul.actions).includes('adobe-analytics/src/lib/actions/setVariables.js') ? console.log(rul.name) : null;
            })
            
        }
        else {
            alert ("Launch is still not detectable, try hard refreshing the page and do it again");
        }
        document.querySelector('.loading').hidden = true;
    }

    // when user click on start audit 
    document.getElementById('startAudit').addEventListener('click', (event) => {
        extractData();
    })
});
