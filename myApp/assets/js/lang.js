import { getState, updateState } from "./stateManager.js";

function getNestedValue(obj, key)
{
  return key.split('.').reduce((currentObject, keyPart) => {
      return currentObject ? currentObject[keyPart] : undefined;
  }, obj);
}

async function fetchLang(lang)
{
  const stateLang = getState().language;
  if (stateLang && stateLang[lang] && Object.keys(stateLang[lang]).length > 0)
    return getState().language[lang];
  const response = await fetch(`assets/js/language/${lang}.json`);
  const data = await response.json();
  updateState({language: { [lang]: data }});
  return data;
}

function changeLanguage(langObj) {
  document.querySelectorAll("[data-i18n]").forEach(elem => {
    const key = elem.getAttribute("data-i18n");
    const translation = getNestedValue(langObj, key);
    if (translation) {
      elem.textContent = translation;
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(elem => {
    const key = elem.getAttribute("data-i18n-placeholder");
    const translation = getNestedValue(langObj, key);
    if (translation) {
      elem.setAttribute("placeholder", translation);
    }
  });
}

export async function handleLanguageChange(lang)
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