
var Q = window.dendryUI?.dendryEngine?.state?.qualities;

Q.generic_news = {
    'booming economy' : 'The economy is booming'
};

Q.active_news = {
    depression : {
        start : {
            date : [1, 1932],
            info : 'It is a dire time for Saskatchewan. The province is wracked by extreme drought the likes of which has never been seen before on the Canadian prairies. Two thirds of farmers have already been forced to rely on relief.',
            condition : Q.started = 1
        }
    }
}