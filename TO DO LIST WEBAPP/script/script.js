
$(document).ready(() => {

    //array of to dos
    const to_dos = [];

    //is editing
    var isEditing = false;
    var editID;

    //delete item
    const handleDel = (id) => {
        to_dos.splice(id, 1);

        $(`#to_do${id}`).remove();
    }

    //edit item
    const handleEdit = (id) => {

        isEditing = true;
        editID = id;

        //get text to be edited
        const edit_txt = $(`#to_do${id}`).text();
        $("#to_do").val(edit_txt);

        //add new button => save button
        $("#add_new_btn").text("Save");
    }  

    //add new to do
    $("#add_new_btn").click(() => {

        //get text
        const to_do = $("#to_do").val();

        //id of item
        let item_no;
        if (!isEditing) {
            item_no = to_dos.length;
        } else {
            item_no = editID;
        }

        //del and edit buttons html
        const btnsHTML = `<span><img class='edit_btns' id='edit${item_no}' src='assets/edit_icon.png' /><img id='del${item_no}' src='assets/del_icon.jpg' /></span>`;

        //add new
        if (!isEditing) {

            //if not empty
            if (to_do !== "") {
                to_dos.push(to_do);
                const item_no = to_dos.length - 1;

                //add new element
                $("#list").append(`<p id='to_do${item_no}' class='to_dos'>${to_do} ${btnsHTML} </p>`);
            }

        } else {
            //save edit
            $(`#to_do${editID}`).html(to_do + btnsHTML);

            //reset
            isEditing = false;
            $("#add_new_btn").text("Add New");
            
        }

        //clear input
        $("#to_do").val("");

        //del and edit functions
        $(`#del${item_no}`).on("click", () => handleDel(item_no))
        $(`#edit${item_no}`).on("click", () => handleEdit(item_no))

    });

    //delete all items
    $("#del_btn").on("click", () => {
        $(".to_dos").remove();
    })

    //search to dos
    $("#search").on("input", () => {

        const txt_searched = $("#search").val();

        if (txt_searched === "") {
            //reset
            $(".to_dos").show();

        } else {
            //show specific to dos
            const to_dos = $(".to_dos");

            to_dos.map((index, to_do) => {
                if (!to_do.textContent.includes(txt_searched)) {
                    $(to_do).hide();
                } else {
                    $(to_do).show();
                }
            });

        }
    });

});