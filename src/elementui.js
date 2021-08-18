import {
  ElButton,
  ElRow,
  ElCol,
  ElInput,
  ElIcon,
  ElColorPicker,
  ElScrollbar,
  ElButtonGroup,
  ElForm,
  ElFormItem,
  ElTabs,
  ElTabPane,
  ElSelect,
  ElRadio,
  ElOption,
} from "element-plus";

const useElementUi = (app) => {
  app.component(ElOption.name, ElOption);
  app.component(ElRadio.name, ElRadio);
  app.component(ElSelect.name, ElSelect);
  app.component(ElButton.name, ElButton);
  app.component(ElInput.name, ElInput);
  app.component(ElIcon.name, ElIcon);
  app.component(ElColorPicker.name, ElColorPicker);
  app.component(ElScrollbar.name, ElScrollbar);
  app.component(ElButtonGroup.name, ElButtonGroup);
  app.component(ElForm.name, ElForm);
  app.component(ElFormItem.name, ElFormItem);
  app.component(ElTabs.name, ElTabs);
  app.component(ElTabPane.name, ElTabPane);
  app.component(ElRow.name, ElRow);
  app.component(ElCol.name, ElCol);
};

export default useElementUi;
