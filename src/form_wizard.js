$(document).ready(function(){
    user_form_wizard();
    org_form_wizard();
});

function user_form_next()
{
    $(".bwizard-steps li:last a").trigger('click');
}

function org_form_next()
{
    //$(".step-first").trigger('click');
}


function org_tab(tab)
{
//    switch(tab) {
//        case '1' : $("#org_tabs ul li:first a").trigger('click'); break;
//        case '2' : $("#org_tabs ul li").eq(1).children('a').trigger('click'); break;
//        case '3' : $("#org_tabs ul li:last a").trigger('click'); break;
//        default : console.log(tab+' case not found.');
//    }
}


function user_form_wizard()
{
    var bWizardTabClass = 'bwizard-steps';



    var wiz = $('#admin-wizard');

    $('#admin-wizard').bootstrapWizard(
            {
                onNext: function (tab, navigation, index)
                {
                    alert('1243');
//                            if (index == 1)
//                            {
//                                return $("#form-add-user").valid();
//                                // Make sure we entered the title
////                                if (!wiz.find('#username').val()) {
////                                    alert('You must enter the username ');
////                                    wiz.find('#username').focus();
////                                    return false;
////                                }
//                            }
                },
                onLast: function (tab, navigation, index)
                {
                    // Make sure we entered the title
                    if (!wiz.find('#inputTitle').val()) {
                        alert('You must enter the product title');
                        wiz.find('#inputTitle').focus();
                        return false;
                    }
                },
                onTabClick: function (tab, navigation, index)
                {
                    return $("#form-add-user").valid();
                    // Make sure we entered the title
//                            if (!wiz.find('#username').val()) {
//                                alert('You must enter the username ');
//                                wiz.find('#username').focus();
//                                return false;
//                            }
                },
                onTabShow: function (tab, navigation, index)
                {
                    var $total = navigation.find('li:not(.status)').length;
                    var $current = index + 1;
                    var $percent = ($current / $total) * 100;

                    if (wiz.find('.bar').length)
                    {
                        wiz.find('.bar').css({width: $percent + '%'});
                        wiz.find('.bar')
                                .find('.step-current').html($current)
                                .parent().find('.steps-total').html($total)
                                .parent().find('.steps-percent').html(Math.round($percent) + "%");
                    }

                    // update status
                    if (wiz.find('.step-current').length)
                        wiz.find('.step-current').html($current);
                    if (wiz.find('.steps-total').length)
                        wiz.find('.steps-total').html($total);
                    if (wiz.find('.steps-complete').length)
                        wiz.find('.steps-complete').html(($current - 1));

                    // mark all previous tabs as complete
                    navigation.find('li:not(.status)').removeClass('primary');
                    navigation.find('li:not(.status):lt(' + ($current - 1) + ')').addClass('primary');

                    // If it's the last tab then hide the last button and show the finish instead
                    if ($current >= $total) {
                        wiz.find('.pagination .next').hide();
                        wiz.find('.pagination .finish').show();
                        wiz.find('.pagination .finish').removeClass('disabled');
                    } else {
                        wiz.find('.pagination .next').show();
                        wiz.find('.pagination .finish').hide();
                    }
                },
                tabClass: bWizardTabClass,
                nextSelector: '.next',
                previousSelector: '.previous',
                firstSelector: '.first',
                lastSelector: '.last'
            });

    wiz.find('.finish').click(function ()
    {
        alert('Finished!, Starting over!');
        wiz.find("a[data-toggle*='tab']:first").trigger('click');
    });
}


function org_form_wizard() {
	var bWizardTabClass = 'bwizard-steps';



    var wiz = $('#org-wizard');

    $('#org-wizard').bootstrapWizard(
            {
                onNext: function (tab, navigation, index)
                {
                },
                onLast: function (tab, navigation, index)
                {
                },
                onTabClick: function (tab, navigation, index)
                {   
                    if(index=='0'){
                        return $("#form-add-org-step-1").valid();
                    }
                    if(index=='1'){
                        return $("#form-add-org-step-2").valid();
                    }
                    if(index=='2'){
                        return $("#form-add-org-step-3").valid();
                    }
                },
                onTabShow: function (tab, navigation, index)
                {
                    var $total = navigation.find('li:not(.status)').length;
                    var $current = index + 1;
                    var $percent = ($current / $total) * 100;

                    if (wiz.find('.bar').length)
                    {
                        wiz.find('.bar').css({width: $percent + '%'});
                        wiz.find('.bar')
                                .find('.step-current').html($current)
                                .parent().find('.steps-total').html($total)
                                .parent().find('.steps-percent').html(Math.round($percent) + "%");
                    }

                    // update status
                    if (wiz.find('.step-current').length)
                        wiz.find('.step-current').html($current);
                    if (wiz.find('.steps-total').length)
                        wiz.find('.steps-total').html($total);
                    if (wiz.find('.steps-complete').length)
                        wiz.find('.steps-complete').html(($current - 1));

                    // mark all previous tabs as complete
                    navigation.find('li:not(.status)').removeClass('primary');
                    navigation.find('li:not(.status):lt(' + ($current - 1) + ')').addClass('primary');

                    // If it's the last tab then hide the last button and show the finish instead
                    if ($current >= $total) {
                        wiz.find('.pagination .next').hide();
                        wiz.find('.pagination .finish').show();
                        wiz.find('.pagination .finish').removeClass('disabled');
                    } else {
                        wiz.find('.pagination .next').show();
                        wiz.find('.pagination .finish').hide();
                    }
                },
                tabClass: bWizardTabClass,
                nextSelector: '.next',
                previousSelector: '.previous',
                firstSelector: '.first',
                lastSelector: '.last'
            });

    wiz.find('.finish').click(function ()
    {
        //alert('Finished!, Starting over!');
        //wiz.find("a[data-toggle*='tab']:first").trigger('click');
    });
	
}

