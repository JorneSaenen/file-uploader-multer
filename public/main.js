const form = document.querySelector('form');
const imageHolder = document.querySelector('.holder');

const upload = async (file) => {
  const response = await fetch('/upload', {
    method: 'POST',
    body: file,
  });
  const data = await response.json();
  if (data.file.mimetype.includes('image')) {
    imageHolder.innerHTML += `<img src="/uploads/${data.file.filename}" alt="${data.file.filename}">`;
    return data;
  }
  if (data.file.mimetype.includes('video')) {
    imageHolder.innerHTML += `<video src="/uploads/${data.file.filename}" alt="${data.file.filename}" controls></video>`;
    return data;
  }
  if (data.file.mimetype.includes('audio')) {
    imageHolder.innerHTML += `<audio src="/uploads/${data.file.filename}" alt="${data.file.filename}" controls></audio>`;
    return data;
  } else {
    imageHolder.innerHTML += `<a href="/uploads/${data.file.filename}" alt="${data.file.filename}" target="_blank">${data.file.filename}</a>`;
    return data;
  }
};

form.onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  await upload(formData);
  form.reset();
};
