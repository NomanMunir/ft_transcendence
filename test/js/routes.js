// routes.js

import { setupForm } from "./formHandler.js";

export const routes = {
  home: null, // No specific functionality for home, just load the view
  about: null, // No specific functionality for about, just load the view
  contact: null, // No specific functionality for contact
  form: setupForm, // Form page requires specific setup
};
