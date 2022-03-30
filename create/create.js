import { 
    createBunny, 
    getFamilies, 
    checkAuth, 
    logout 
} from '../fetch-utils.js';

const form = document.querySelector('.bunny-form');
const logoutButton = document.getElementById('logout');

form.addEventListener('submit', async e => {
    // prevent default
    e.preventDefault();
    // get the name and family id from the form
    let data = new FormData(form);
    let name = data.get('bunny-name');
    let familyId = data.get('family-id');
    let bunny = { name: name, family_id: familyId };
    await createBunny(bunny);
    // use createBunny to create a bunny with this name and family id
    form.reset();
});

window.addEventListener('load', async () => {
    // let's dynamically fill in the families dropdown from supabase
    // grab the select HTML element from the DOM
    const selector = document.querySelector('select');
    // go get the families from supabase
    let families = await getFamilies();
    // for each family
    for (let family of families) {
        // create an option tag
        let option = document.createElement('option');
        // set the option's value and text content
        option.value = family.id;
        option.textContent = family.name;
        // and append the option to the select
        selector.append(option);
    }
});

checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});
