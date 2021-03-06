setTimeout(function() {
    $(".createdAt").css({
        opacity: "1"
    })
}, 100);
var getTime = function() {
    var e = moment();
    $(".createdAt").each(function(t, n) {
        var r = moment($(n).attr("datetime"));
        var i = r.dayOfYear();
        var s = moment().dayOfYear();
        var o = s - i;
        if (o > 30) {
            var u = $(this).attr("data-job");
            $.ajax({
                type: "POST",
                url: "/post/setToInactive",
                data: {
                    jobIDs: u
                }
            })
        }
        $(n).text(r.from(e))
    })
};
$(document).ready(function() {
    getTime();
    setInterval(getTime, 6e5);
    var e = $(".jobTitle").length;
    if (e == 0) {
        $(".resultsCount").append("No jobs were found")
    } else if (e == 1) {
        $(".resultsCount").append(e + " job found")
    } else {
        $(".resultsCount").append(e + " jobs found")
    }
});
$(".jobSubmission").each(function() {
    $(this).on("click", function() {
        var e = $(this).attr("data-job");
        $.ajax({
            type: "POST",
            url: "/post/addSubmission",
            data: {
                jobID: e
            }
        })
    })
});
$("#editor").wysiwyg();
$(".stripe-button-el, .savePost").click(function() {
    var e = $("#editor").cleanHtml();
    var t = "<input type='text' style='display:none' name='jobDescription' value='" + e + "' />";
    $("#postSubmit").append(t)
});
var postHtml = $(".getHtml").text();
$(".job-info").append(postHtml);
var postHtml = $(".getHtml").text();
$("#editor").append(postHtml);
var url = window.location.pathname.split("/");
console.log(url);
if (url[1] == "post" && url[2] == "show") {
    var jobID = window.location.pathname.split("/");
    $.ajax({
        type: "POST",
        url: "/post/addView",
        data: {
            jobID: jobID
        }
    })
}
