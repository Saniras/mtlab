var xhr = new XMLHttpRequest();
var url = 'http://apis.data.go.kr/B551220/vsslBerthStatService/getVsslBerthStatList'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'bk6ddxKvfWKBwDP8BBho2aPrKXqlODLOABJ4OGpNFiQpYbrfCPgjejab0I5g8lfqiwHtEwhhGOaObmppZOqvjQ=='; /*Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('2'); /**/
queryParams += '&' + encodeURIComponent('startDate') + '=' + encodeURIComponent('20220107'); /**/
queryParams += '&' + encodeURIComponent('endDate') + '=' + encodeURIComponent('20220111'); /**/
queryParams += '&' + encodeURIComponent('trminlCode') + '=' + encodeURIComponent(''); /**/
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('XML'); /**/
xhr.open('GET', url + queryParams);
xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        alert('Status: '+this.status+'nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'nBody: '+this.responseText);
    }
};

xhr.send('');

//부산항만공사_선석배정현황정보 https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15085024
