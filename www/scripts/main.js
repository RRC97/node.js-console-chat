$(document).ready(function() {
    var viewConsole = $('#view-console');
    var inputConsole = $('#input-console');
    
    var system = new System(viewConsole, inputConsole);
    
    inputConsole.focus();
    $(document).click(function() {
        inputConsole.focus();
    });
    
    $('#console').submit(system.submit);
});