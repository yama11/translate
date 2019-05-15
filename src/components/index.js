import AppFormAlert from './AppFormAlert';
import AppSearch from './AppSearch';
import AppList from './AppList';
import AppForm from './AppForm/Main';
import AppFormPage from './AppForm/AppFormPage';
import AppFormDialog from './AppForm/AppFormDialog';
import AppUploadBatch from './AppUploadBatch';

const components = {
  AppFormAlert,
  AppSearch,
  AppList,
  AppForm,
  AppFormPage,
  AppFormDialog,
  AppUploadBatch,
};

export default (Vue) => {
  Object.keys(components)
    .forEach(name => Vue.component(name, components[name]));
};
