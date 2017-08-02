import setViewConfig from '../actions';

const loadViewConfig = file => new Promise((resolve, reject) => {
  const reader = new FileReader();

  reader.addEventListener('load', (fileEvent) => {
    try {
      resolve('Loaded. Check Redux store');
      setViewConfig(JSON.parse(fileEvent.target.result));
    } catch (e) {
      reject('Only drop valid JSON', e);
    }
  });

  try {
    reader.readAsText(file);
  } catch (e) {
    reject('Only drop actual files');
  }
});

export default loadViewConfig;
