$(document).ready(function(){

    $('.save').click(function(){
        var form = $(this).closest('form');
        form.submit(function(e){
            e.preventDefault();
            var formData = $(this).serializeObject();
            var formattedData1 = {
                'regionId': formData.regionId,
                'sensorValue': formData.sensorValue1
            };

            var formattedData2 = {
                'regionId': formData.regionId,
                'sensorValue': formData.sensorValue2
            };

            
            checkActuatorStatus(formattedData1);
            setTimeout(() => {
                checkActuatorStatus(formattedData2);
            }, 500);
        });

    });

    function checkActuatorStatus(formData){
        $.ajax({
            type: "POST",
            dataType: "json",
            data: JSON.stringify(formData),
            contentType: "application/json",
            url: "/getActuatorStatus",
            success: function (data) {
                var actuatorStatus = data.actuatorStart;
                var $region = $("#region" + formData.regionId);

                $region.find('.actuator input').removeAttr('checked').parent().removeClass('active');
                if(actuatorStatus) {
                    $region.find('.actuator input[name="act-on"]').attr('checked').parent().addClass('active');
                    $region.find('.current-status').text('Running').parent().addClass('text-success');
                } else {
                    $region.find('.actuator input[name="act-off"]').attr('checked').parent().addClass('active');
                    $region.find('.current-status').text('Stopped').parent().addClass('text-warning');
                }
            }
        });
    }

});