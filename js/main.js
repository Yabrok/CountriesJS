const elForm = document.querySelector('.js-form');
const elSearch = document.querySelector('.js-search');
const elSelect = document.querySelector('.js-select');
const elList = document.querySelector('.js-list');




function render(array, node) {
    node.innerHTML = ''
    array.forEach((item) => {
        let newItem = document.createElement('li');
        newItem.classList.add('list-unstyled', 'border', 'mb-5', 'shadow-lg');
        newItem.style.width = '250px'
        newItem.style.borderRadius = '8px'
        newItem.style.overflow = 'hidden'


        let newFlag = document.createElement('img');
        newFlag.src = item.flags.svg;
        newFlag.style.width = '100%';
        // newFlag.style.marginBottom = '20px'
        let newCountry = document.createElement('h2');
        newCountry.textContent = item.name.common;
        newCountry.style.fontSize = '25px'

        let newPopulation = document.createElement('p');
        newPopulation.textContent = `Population: ${item.population}`;

        let newCapital = document.createElement('p');
        newCapital.textContent = `Capital: ${item.capital}`

        let newRegion = document.createElement('p');
        newRegion.textContent = `Region: ${item.region}`;

        let newBox = document.createElement('div');
        newBox.classList.add('p-3')
        newBox.appendChild(newCountry);
        newBox.appendChild(newPopulation);
        newBox.appendChild(newRegion);
        newBox.appendChild(newCapital);

        newItem.appendChild(newFlag);
        newItem.appendChild(newBox);

        node.appendChild(newItem);
    });

};

let newSet = new Set();

async function getCoutries() {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();

    // =====================Select======================
    data.forEach((item) => {
        newSet.add(item.region)
    })

    newSet.forEach((item) => {
        let newOption = document.createElement('option');
        newOption.value = item.toLowerCase();
        newOption.textContent = item;
        elSelect.appendChild(newOption)
    })
    // ======================================================

    render(data, elList)
};
getCoutries();





elSelect.addEventListener('change', () => {

    if (elSelect.value != 'all') {
        fetch('https://restcountries.com/v3.1/region/' + elSelect.value)
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    render(data, elList)
                }
            })
    } else {
        fetch('https://restcountries.com/v3.1/all')
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    render(data, elList)
                }
            })
    }
});

elForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (elSearch.value) {
        fetch('https://restcountries.com/v3.1/name/' + elSearch.value)
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    render(data, elList)
                }
            })
    }
})






