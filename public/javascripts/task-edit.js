let taskForm = document.getElementById('taskEditForm');
let deleteContentCheck = document.getElementById('contentDelete') || null;
let contentUpload = document.getElementById('contentUpload');

taskForm.addEventListener('submit', function (event) {
    if (deleteContentCheck) {
        if (deleteContentCheck.checked) {
            // Delete Existing Content
        } else {
            if (contentUpload.value != "") {
                event.preventDefault();
                alert('You can not upload extra additional content. Max uploads reached!');
            }
        }
    }
});
