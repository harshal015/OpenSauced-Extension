function runExtension() {

    // Get the username from the page
    const usernameElement = document.querySelector('.vcard-username');
    const username = usernameElement.textContent.trim().split(' ')[0].trim();


    // Check if the user has an account on OpenSauced

    async function checkOpenSaucedUser(username) {

        // function will not make API call and return the cached result, if the current user's data is there in cache
        const cachedResult = localStorage.getItem(`opensauced-${username}`);
        if (cachedResult) {
            return JSON.parse(cachedResult);
        }

        const response = await fetch(`https://api.opensauced.pizza/v1/users/${username}`);
        const exists = response.status === 200;
        localStorage.setItem(`opensauced-${username}`, JSON.stringify(exists));

        return exists;
    }


    // Find the follow button for other users and edit button for our own profile 

    let followButton = document.querySelector('.js-profile-editable-edit-button'); // self profile
    if (!followButton) {
        followButton = document.querySelector('.btn-block'); //other's profile
    }

    // Add the OpenSauced button if the user has an account

    checkOpenSaucedUser(username).then((exists) => {

        if (exists) {

            // Create the OpenSauced button
            const button = document.createElement('button');
            button.textContent = 'View on OpenSauced';
            button.classList.add('opensauced-button', 'btn', 'btn-block');


            // Set the button styles using the style property
            button.style.height = '2.1rem';
            button.style.backgroundColor = '#2da44e';
            button.style.color = 'rgba(255, 255, 255, 0.92)';
            button.style.marginBottom = '0.5rem';

            // Add a hover effect to the button
            button.addEventListener('mouseenter', () => {
                button.style.backgroundColor = '#2a9749';
            });

            button.addEventListener('mouseleave', () => {
                button.style.backgroundColor = '#2da44e';
            });


            // Add a click event listener to the button
            button.addEventListener('click', (e) => {
                e.preventDefault();
                window.open(`https://insights.opensauced.pizza/user/${username}/contributions`, '_blank');
            });

            // Insert the OpenSauced button before the follow button
            followButton.parentNode.insertBefore(button, followButton);
        }

    });
}

// Run the extension once the page loads
runExtension();

// Add an event listener to re-run the extension code when the URL hash changes
window.onhashchange = () => {
    runExtension();
};
