function setCookie(cid, cvalue) {
    let date = new Date();
    date.setFullYear(date.getFullYear() + 10);
    document.cookie = cid + "=" + cvalue + "; expires=" + date.toUTCString() + "; path=/";
}

function deleteCookie(cid) {
    document.cookie = cid + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function addTask() {
    let data = prompt("กรอกหน่อยย!!!!!");
    let id = Date.now();
    if (data && data.trim() !== "") {
        addList(data, id);
        setCookie(id, data);
    }
}

function addList(value, id = "None") {
    if (!value) {
        alert("กรอกหน่อยยยยยยย!!!!");
        return;
    }
    let $div = $("<div>")
        .attr("id", id)
        .text(value)
        .on("click", function () {
            if (confirm("ลบใช่ไหม? : " + $(this).attr("id"))) {
                deleteCookie($(this).attr("id"));
                $(this).remove();
        }
    });
    $("#ft_list").prepend($div);
}

function checkList() {
    let cookies = document.cookie.split(";");
    if (!(cookies.length === 1 && cookies[0].trim() === "")) {
        cookies.forEach(function (c) {
            let [key, value] = c.split("=");
            if (key && value) {
                addList(value.trim(), key.trim());
            }
        });
    }
}

$(document).ready(function () {
    $("#new_todo").on("click", addTask);
    checkList();
});