import { handleLocation, navigateTo } from "./routes.js"

export function validateForm()
{
	const needsValidation = document.querySelectorAll('.needs-validation')

	Array.prototype.slice.call(needsValidation)
	  .forEach(function(form) {
		form.addEventListener('submit', function(event) {
		  if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
		  }
  
		  form.classList.add('was-validated')
		}, false)
	})
}

export function setupGlobalHandlers() {
  document.addEventListener("click", (e) => {
      if (e.target.matches("[data-action='logout']"))
      {
        localStorage.setItem("isLoggedIn", "false");
        handleLocation();
      }
  });

  document.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (e.target.matches("#loginForm"))
    {
      const formData = new FormData(e.target);

      const username = formData.get("username").trim();
      const password = formData.get("password").trim();

      if (username && password) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);
        navigateTo("#home");
      } else {
        if (!username) {
          document.getElementById("yourUsername").classList.add("is-invalid");
        }
        if (!password) {
          document.getElementById("yourPassword").classList.add("is-invalid");
        }
      }
    }
    if (e.target.matches("#regForm"))
    {
      console.log("Register form submitted");
      const formData = new FormData(e.target);

      const name = formData.get("name").trim();
      const email = formData.get("email").trim();
      const username = formData.get("username").trim();
      const password = formData.get("password").trim();  
      // Basic validation (you can extend this)
      if (name && email && username && password)
      {
        // Assuming registration is successful, store data in localStorage (this can be replaced by an API call)
        localStorage.setItem("username", username); // Save username if needed
        localStorage.setItem("email", email); // Save email if needed

        navigateTo("#login");
      }
      else
      {
        // Show error messages if validation fails
        if (!name) {
          document.getElementById("yourName").classList.add("is-invalid");
        }
        if (!email) {
          document.getElementById("yourEmail").classList.add("is-invalid");
        }
        if (!username) {
          document.getElementById("yourUsername").classList.add("is-invalid");
        }
        if (!password) {
          document.getElementById("yourPassword").classList.add("is-invalid");
        }
      }
    }
  });
}

export function initNavBar()
{
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  if (mobileNavToggleBtn)
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  function mobileNavToogle() 
  {
    console.log("mobileNavToggleBtn clicked");
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }

  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  document.querySelector('.mobile-nav-toggle').addEventListener('click', function() {
    const navMenu = document.getElementById('navmenu');
    
    // Toggle the class on the menu
    if (navMenu.classList.contains('mobile-menu-active')) {
        navMenu.classList.remove('mobile-menu-active');
    } else {
        navMenu.classList.add('mobile-menu-active');
    }
});


}
