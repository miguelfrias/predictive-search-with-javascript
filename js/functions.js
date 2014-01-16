function ajax(url, callback) {

    function ensureReadiness() {
        if(xhr.readyState < 4) {
            return;
        }
        
        if(xhr.status !== 200) {
            return;
        }

        // all is well  
        if(xhr.readyState === 4) {
            callback(xhr);
        }           
    }

    var xhr;
    
    xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = ensureReadiness;
    
    xhr.open('GET', url, true);
    xhr.send('');

}