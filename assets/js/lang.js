
function getNestedValue(obj, key)
{
  return key.split('.').reduce((currentObject, keyPart) => {
      return currentObject ? currentObject[keyPart] : undefined;
  }, obj);
}

async function fetchLang(lang)
{
  const response = await fetch(`/assets/js/language/${lang}.json`);
  const data = await response.json();
  return data;
}

function changeLanguage(langObj) {
  document.querySelectorAll("[data-i18n]").forEach(elem => {
    const key = elem.getAttribute("data-i18n");
    if (getNestedValue(langObj, key))
    {
      elem.textContent = getNestedValue(langObj, key);
      // elem.textContent = lang[key];
    }
  });
}

async function handleLanguageChange(lang)
{
  localStorage.setItem('language', lang);
  const fetchedLangObj = await fetchLang(lang);
  changeLanguage(fetchedLangObj);
  console.log(`Language changed to: ${lang}`);
}

document.addEventListener('click', (event) => {
	if (event.target.matches('.dropdown a[data-lang]'))
	{
		event.preventDefault();
		let lang = event.target.getAttribute('data-lang') || 'en';
		handleLanguageChange(lang);
	}
});