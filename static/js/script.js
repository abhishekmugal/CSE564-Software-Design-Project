$(document).ready(function () {

    $('.save').click(function () {
        var form = $(this).closest('form');
        form.submit(function (e) {
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

    Number.prototype.padLeft = function(base,chr){
        var  len = (String(base || 10).length - String(this).length)+1;
        return len > 0? new Array(len).join(chr || '0')+this : this;
    }

    function checkActuatorStatus(formData, type) {
        $.ajax({
            type: "POST",
            dataType: "json",
            data: JSON.stringify(formData),
            contentType: "application/json",
            url: "http://192.168.0.5/getActuatorStatus",
            success: function (data) {
                var actuatorStatus = data.actuatorStart;
                var $region = $("#region" + data.regionId);
                [1, 2].forEach(e => {
                    type = e;
                    $region.find('.actuator' + type + ' input').removeAttr('checked').parent().removeClass('active');
                    if (actuatorStatus) {
                        $region.find('.actuator' + type + ' input[name="act-on"]').attr('checked');
                        $region.find('.actuator' + type + ' input[name="act-on"]').parent().addClass('active');
                        $region.find('.status' + type + ' .current-status').text('Running').parent().removeClass().addClass('text-success');

                        // Set the start time for the actuator
                        const d = new Date,
                            dformat = [(d.getMonth()+1).padLeft(),
                                    d.getDate().padLeft(),
                                    d.getFullYear()].join('/') +' ' +
                                    [d.getHours().padLeft(),
                                    d.getMinutes().padLeft(),
                                    d.getSeconds().padLeft()].join(':');

                        $region.find('.startTime' + type + ' p').empty().text(dformat);

                    } else {
                        $region.find('.actuator' + type + ' input[name="act-off"]').attr('checked');
                        $region.find('.actuator' + type + ' input[name="act-off"]').parent().addClass('active');
                        $region.find('.status' + type + ' .current-status').text('Stopped').parent().removeClass().addClass('text-warning');

                        // Set the end time for the actuator
                        const d = new Date,
                            dformat = [(d.getMonth()+1).padLeft(),
                                    d.getDate().padLeft(),
                                    d.getFullYear()].join('/') +' ' +
                                    [d.getHours().padLeft(),
                                    d.getMinutes().padLeft(),
                                    d.getSeconds().padLeft()].join(':');

                        $region.find('.endTime p').empty().text(dformat);
                    }
                })

            }
        });
    }

    $('.trigger-fail').click(function () {
        var actuatorId = $(this).data("id");
        var type = $(this).data("type");
        var regionId = $(this).closest('form').find('input[name="regionId"]').val();
        var $ele = $('.' + type + '-status .region' + regionId);
        
        alertify.set('notifier', 'position', 'top-right');
        alertify.error(`${type.toUpperCase()} with ID ${actuatorId} in region 1 has failed`);
        $(this).closest('.card').addClass('border-danger');

        if ($ele.attr('data-clicked') != actuatorId) {
            $ele.attr('data-clicked', actuatorId);

            var failCount = parseInt($ele.attr('data-fail'), 10);
            var runningCount = parseInt($ele.attr('data-running'), 10);

            if (failCount != 2) {
                $ele.attr("data-fail", failCount + 1);
                $ele.find('.fail').empty().append('<i class="fas fa-exclamation-triangle text-danger"></i> <span>' + (failCount + 1) + '</span>');
                $('.' + type + '-status').closest('.card').addClass('border-danger');
            }
            if (runningCount != 0) {
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

        $('.config-values .crop-type').each(function (i) {
            $(this).text(cropType[i]);
        });

        $('.config-values .soil-type').each(function (i) {
            $(this).text(soilType[i]);
        });

        $('.config-values .humidity-level').each(function (i) {
            $(this).text(soilThreshold[i]);
            // Data will be fetched from the soilThreshold span
            $('#region' + (i + 1) + ' .soil-threshold span').text(soilThreshold[i]);
        });
    });

    $('.system-mode input[name="system-mode"]').change(function () {
        let systemMode = $(this).val();
        if (systemMode == "on") {
            $('.water-source-actuator').empty().append('<p class="text-success"><i class="fas fa-check-circle"></i> ON</p>');

            let thresholdReachedRegions = [];

            let setSensorValues = setInterval(() => {
                let cntr = 20;

                $.get('http://192.168.0.5/getSensorValues?cntr=' + cntr + '&isReset=false', function (d) {
                    const data = JSON.parse(d);

                    data.forEach((v, i) => {
                        //console.log(i);
                        let sensorValue1 = parseInt(v[0].val, 10);
                        let sensorValue2 = parseInt(v[1].val, 10);
                        let regionId = (i + 1);

                        // Get threshold value to check with the current value
                        let soilThreshold = parseInt($('#region' + (i + 1) + ' .soil-threshold span').text(), 10);

                        if (!thresholdReachedRegions.includes(regionId)) {
                            $('#region' + regionId + ' input[name="sensorValue1"]').val(sensorValue1);
                            $('#region' + regionId + ' input[name="sensorValue2"]').val(sensorValue2);

                            // Check Actuator Status
                            let formattedData1 = {
                                'regionId': i + 1,
                                'sensorValue': sensorValue1
                            };
                            let formattedData2 = {
                                'regionId': i + 1,
                                'sensorValue': sensorValue2
                            };
                            console.log(formattedData1, formattedData2)

                            checkActuatorStatus(formattedData1, 1);
                            //checkActuatorStatus(formattedData2, 2);

                        }

                        if (sensorValue1 >= soilThreshold && sensorValue2 >= soilThreshold) {
                            if (!thresholdReachedRegions.includes(regionId))
                                thresholdReachedRegions.push(regionId);
                        }

                        if (thresholdReachedRegions.length == 4) {
                            $.get('http://192.168.0.5/getSensorValues?cntr=0&isReset=true');
                            thresholdReachedRegions = [];
                            clearInterval(setSensorValues);
                        }

                    });
                });

            }, 5000);


        } else {
            $('.water-source-actuator').empty().append('<p class="text-warning"><i class="fas fa-times-circle"></i> OFF</p>');
        }
    });
});

$.get('http://192.168.0.5/getSensorValues?cntr=0&isReset=true');


