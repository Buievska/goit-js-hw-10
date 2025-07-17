const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

loadFormData();

function loadFormData() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      formData = { ...formData, ...parsedData };

      if (parsedData.email) form.email.value = parsedData.email;
      if (parsedData.message) form.message.value = parsedData.message;
    } catch (error) {
      console.error('Error parsing saved data:', error);
    }
  }
}

form.addEventListener('input', e => {
  const { name, value } = e.target;
  formData[name] = value.trimStart();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener('submit', e => {
  e.preventDefault();

  const { email, message } = formData;

  if (email.trim() === '' || message.trim() === '') {
    alert('Fill please all fields');
    return;
  }

  console.log('Submitted data:', formData);

  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
});
