import axios from 'axios';

function getFileExt(url: string) {
  // @ts-ignore
  return url.split('/').pop().split('#')[0].split('?')[0].split('.')[1];
}

function downloadFile(address: string, name: string) {
  console.log(address);
  axios.get(address, {
    responseType: 'blob',
  }).then(({ data: blob }) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `${name}.${getFileExt(address)}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  });
}

export {downloadFile, getFileExt}