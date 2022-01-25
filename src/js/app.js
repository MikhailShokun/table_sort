const table = document.querySelector('.table');
// table.addEventListener('click', tableOnClick);
let colIndex = -1;

function sortTable(index, type, isSorted) {
    const tbody = table.querySelector('tbody');

    function compare(rowA, rowB) {
        const rowDataA = rowA.cells[index].innerHTML;
        const rowDataB = rowB.cells[index].innerHTML;
        switch (type) {
            case 'integer':
            case 'double':
                return rowDataA - rowDataB;
                break;
            case 'date':
                const dateA = rowDataA.split('.').reverse().join('-');
                const dateB = rowDataB.split('.').reverse().join('-');
                return new Date(dateA).getTime() - new Date(dateB).getTime();
                break;
            case 'text':
                if (rowDataA < rowDataB) return -1;
                else if (rowDataA > rowDataB) return 1;
                return 0;
                break;
        }
    }

    let rows = [].slice.call(tbody.rows);
    rows.sort(compare);
    if (isSorted) rows.reverse();
    table.removeChild(tbody);
    for (let i = 0; i < rows.length; i++) {
        tbody.appendChild(rows[i]);
    }
    table.appendChild(tbody);


    // const arrows = document.querySelectorAll('.arrow');
    // arrows.forEach(arrow => {
    //     arrow.addEventListener('click', function(e) {
    //         arrow.classList.toggle('rotate');
    //     });
    // })

}


table.addEventListener('click', tableOnClick);



function tableOnClick(e) {
    const el = e.target;
    if (el.nodeName !== 'TH') return;
    const index = el.cellIndex;
    const type = el.getAttribute('data-type');
    sortTable(index, type, colIndex === index);
    colIndex = (colIndex === index) ? -1 : index;
    const arrow = el.querySelector('.arrow');
    arrow.classList.toggle('rotate');
}