import { checkAuth, deleteBunny, getFamilies, logout } from '../fetch-utils.js';

checkAuth();

const familiesEl = document.querySelector('.families-container');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

async function fetchAndDisplayFamilies() {
    // fetch families from supabase
    let families = await getFamilies();
    // clear out the familiesEl
    familiesEl.innerHTML = '';
    for (let family of families) {
        // create three elements for each family, one for the whole family, one to hold the name, and one to hold the bunnies
        // your HTML Element should look like this:
        // <div class="family">
        let familyEl = document.createElement('div');
        //    <h3>the Garcia family</h3>
        let familyNameHolder = document.createElement('h3');
        //    <div class="bunnies">
        let bunniesEl = document.createElement('div');
        //        <div class="bunny">Fluffy</div>
        //        <div class="bunny">Bob</div>
        //    </div>
        // </div>
        // add the bunnies css class to the bunnies el, and family css class to the family el
        bunniesEl.classList.add('bunnies');
        familyEl.classList.add('family');
        // put the family name in the name element
        familyNameHolder.textContent = family.name;
        // for each of this family's bunnies
        for (let bunny of family.fuzzy_bunnies) {
            //make an element with the css class 'bunny', and put the bunny's name in the text content
            let bunnyEl = document.createElement('div');
            bunnyEl.classList.add('bunny');
            bunnyEl.textContent = bunny.name;
            //add an event listener to the bunny el.
            bunnyEl.addEventListener('click', async () => {
            //On click, delete the bunny, then refetch and redisplay all families.
                await deleteBunny(bunny.id);
                fetchAndDisplayFamilies();
            });
            // append this bunnyEl to the bunniesEl
            bunniesEl.append(bunnyEl);
        }
        // append the bunniesEl and nameEl to the familyEl
        familyEl.append(bunniesEl, familyNameHolder);    
        // append the familyEl to the familiesEl
        familiesEl.append(familyEl);
    }
}

window.addEventListener('load', async () => {
    fetchAndDisplayFamilies();
});
