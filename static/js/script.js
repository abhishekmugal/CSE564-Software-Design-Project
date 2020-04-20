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

            checkActuatorStatus(formattedData1, 1);
            setTimeout(() => {
                checkActuatorStatus(formattedData2, 2);
            }, 500);
        });

    });

    function checkActuatorStatus(formData, type){
        $.ajax({
            type: "POST",
            dataType: "json",
            data: JSON.stringify(formData),
            contentType: "application/json",
            url: "http://192.168.0.5/getActuatorStatus",
            success: function (data) {
                var actuatorStatus = data.actuatorStart;
                var $region = $("#region" + formData.regionId);
                
                $region.find('.actuator'+type+' input').removeAttr('checked').parent().removeClass('active');
                if(actuatorStatus) {
                    $region.find('.actuator'+type+' input[name="act-on"]').attr('checked');
                    $region.find('.actuator'+type+' input[name="act-on"]').parent().addClass('active');
                    $region.find('.status'+type+' .current-status').text('Running').parent().removeClass().addClass('text-success');
                } else {
                    $region.find('.actuator'+type+' input[name="act-off"]').attr('checked');
                    $region.find('.actuator'+type+' input[name="act-off"]').parent().addClass('active');
                    $region.find('.status'+type+' .current-status').text('Stopped').parent().removeClass().addClass('text-warning');
                }
            }
        });
    }

    $('.trigger-fail').click(function(){
        var actuatorId = $(this).data("id");
        var type = $(this).data("type");
        var regionId = $(this).parent().find('input[name="regionId"]').val();
        var $ele = $('.'+type+'-status .region'+regionId);

        $(this).closest('.card').addClass('border-danger');

        if($ele.attr('data-clicked') != actuatorId) {
            $ele.attr('data-clicked', actuatorId);

            var failCount = parseInt($ele.attr('data-fail'), 10);
            var runningCount = parseInt($ele.attr('data-running'), 10);
            
            if(failCount != 2) {
                $ele.attr("data-fail", failCount + 1);
                $ele.find('.fail').empty().append('<i class="fas fa-exclamation-triangle text-danger"></i> <span>'+(failCount + 1)+'</span>');
                $('.'+type+'-status').closest('.card').addClass('border-danger');
            }
            if(runningCount != 0) {
                $ele.attr("data-running", runningCount - 1);
                $ele.find('.running span').text(runningCount - 1);
            }
        }
    });

    $.get("http://192.168.0.5/getFarmConfiguration", function (data, status) {
        const cropType = data.configuration.map(e => e[2]);
        const soilType = data.configuration.map(e => e[3]);
        const soilThreshold = data.configuration.map(e => e[4]);
        
        $('.config-values .farm-location').text(data.farmLocation);

        $('.config-values .crop-type').each(function(i){
            $(this).text(cropType[i]);
        });

        $('.config-values .soil-type').each(function(i){
            $(this).text(soilType[i]);
        });

        $('.config-values .humidity-level').each(function(i){
            $(this).text(soilThreshold[i]);
            // Data will be fetched from the soilThreshold span
            $('#region'+(i + 1)+ ' .soil-threshold span').text(soilThreshold[i]);
        });
    });

    $('.system-mode input[name="system-mode"]').change(function(){
        var systemMode = $(this).val();
        if(systemMode == "on") {
            $('.water-source-actuator').empty().append('<p class="text-success"><i class="fas fa-check-circle"></i> ON</p>');

            var thresholdReachedRegions = [];
            
            var setSensorValues = setInterval(function(){
                var cntr = 20;

                $.get('http://192.168.0.5/getSensorValues?cntr='+cntr+'&isReset=false', function(data){
                    data = JSON.parse(data);

                    $.each(data, function(i, v){
                        var sensorValue1 = parseInt(v[0].val, 10);
                        var sensorValue2 = parseInt(v[1].val, 10);
                        var regionId = (i + 1);

                        // Get threshold value to check with the current value
                        var soilThreshold = parseInt($('#region'+regionId+ ' .soil-threshold span').text(), 10);

                        if(!thresholdReachedRegions.includes(regionId)) {
                            $('#region'+regionId+' input[name="sensorValue1"]').val(sensorValue1);
                            $('#region'+regionId+' input[name="sensorValue2"]').val(sensorValue2);
                        
                            // Check Actuator Status
                            var formattedData1 = {
                                'regionId': regionId,
                                'sensorValue': sensorValue1
                            };
                            var formattedData2 = {
                                'regionId': regionId,
                                'sensorValue': sensorValue2
                            };
                
                            setTimeout(() => {
                                checkActuatorStatus(formattedData1, 1);
                            }, 500);
                            setTimeout(() => {
                                checkActuatorStatus(formattedData2, 2);
                            }, 500);

                        }
                        
                        if (sensorValue1 >= soilThreshold && sensorValue2 >= soilThreshold) {
                            if(!thresholdReachedRegions.includes(regionId))
                                thresholdReachedRegions.push(regionId);
                        }

                        if(thresholdReachedRegions.length == 4) {
                            $.get('http://192.168.0.5/getSensorValues?cntr=0&isReset=true');
                            thresholdReachedRegions = [];
                            clearInterval(setSensorValues);
                        }

                    });
                });

            }, 10000);


        } else {
            $('.water-source-actuator').empty().append('<p class="text-warning"><i class="fas fa-times-circle"></i> OFF</p>');
        }
    });
});