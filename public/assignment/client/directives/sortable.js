/**
 * Created by Dhruv on 3/19/2016.
 */
(function(){
    angular
        .module('mySortable', [])
        .directive("mySortable", mySortable);

    function mySortable() {
        var start = null;
        var end = null;
        function link(scope, element, attributes) {
            var myAxis = attributes.dmAxis;
            $(element).sortable({
                axis: myAxis,
                start: function(event, ui) {
                    start = ui.item.index();
                    console.log(ui.item);
                },
                stop: function(event, ui) {
                    end = ui.item.index();
                    console.log(ui.item);
                    var temp = scope.fields[start];
                    scope.fields[start] = scope.fields[end];
                    scope.fields[end] = temp;
                    scope.$apply();
                    scope.updateModelOnSort();
                }
            }); }

        return {
            link: link
        }
    }
})();