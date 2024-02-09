 console.log('JavaScript loaded');

const search = document.getElementById("search-btn");
const row = document.getElementsByTagName('tr');

search.addEventListener('click' , searchData);

function searchData () {

    // convert input value to lowercase
    const input = document.getElementById("inputText").value.toLowerCase();
    // console.log('Input :',input);

    for (let i = 0; i< row.length; i++) {
        const rowText = row[i].textContent.toLowerCase();
        // console.log('RowText', rowText);

        // highlight the row
        if (rowText.includes(input)) {
            row[i].classList.add('highlight');
        } else {
            row[i].classList.remove('highlight');
        }
    }
}