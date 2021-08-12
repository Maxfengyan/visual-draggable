import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElIcon,
  ElColorPicker,
  ElTag,
  ElScrollbar,
  ElMenu,
  ElMenuItem,
  ElSubmenu,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElRow,
  ElCol,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElButtonGroup,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElDialog,
  ElUpload,
  ElCollapse,
  ElCollapseItem,
  ElCheckbox,
  ElCheckboxGroup,
  ElTabs,
  ElTabPane,
  ElCard,
  ElSwitch,
  ElDescriptions,
  ElDescriptionsItem,
  ElPageHeader,
  ElRadio,
} from "element-plus";
// import "dayjs/locale/zh-cn";
// import lang from "@/plugin/language/zh-cn";
// 设置语言
// locale(lang);

const useElementUi = (app) => {
  app.component(ElButton.name, ElButton);
  app.component(ElForm.name, ElForm);
  app.component(ElFormItem.name, ElFormItem);
  app.component(ElInput.name, ElInput);
  app.component(ElIcon.name, ElIcon);
  app.component(ElColorPicker.name, ElColorPicker);
  app.component(ElTag.name, ElTag);
  app.component(ElScrollbar.name, ElScrollbar);
  app.component(ElMenu.name, ElMenu);
  app.component(ElMenuItem.name, ElMenuItem);
  app.component(ElSubmenu.name, ElSubmenu);
  app.component(ElBreadcrumb.name, ElBreadcrumb);
  app.component(ElBreadcrumbItem.name, ElBreadcrumbItem);
  app.component(ElDropdown.name, ElDropdown);
  app.component(ElDropdownItem.name, ElDropdownItem);
  app.component(ElDropdownMenu.name, ElDropdownMenu);
  app.component(ElRow.name, ElRow);
  app.component(ElCol.name, ElCol);
  app.component(ElSelect.name, ElSelect);
  app.component(ElOption.name, ElOption);
  app.component(ElDatePicker.name, ElDatePicker);
  app.component(ElButtonGroup.name, ElButtonGroup);
  app.component(ElTable.name, ElTable);
  app.component(ElTableColumn.name, ElTableColumn);
  app.component(ElPagination.name, ElPagination);
  app.component(ElDialog.name, ElDialog);
  app.component(ElUpload.name, ElUpload);
  app.component(ElCollapse.name, ElCollapse);
  app.component(ElCollapseItem.name, ElCollapseItem);
  app.component(ElCheckbox.name, ElCheckbox);
  app.component(ElCheckboxGroup.name, ElCheckboxGroup);
  app.component(ElTabs.name, ElTabs);
  app.component(ElTabPane.name, ElTabPane);
  app.component(ElCard.name, ElCard);
  app.component(ElSwitch.name, ElSwitch);
  app.component(ElDescriptions.name, ElDescriptions);
  app.component(ElDescriptionsItem.name, ElDescriptionsItem);
  app.component(ElPageHeader.name, ElPageHeader);
  app.component(ElRadio.name, ElRadio);
};

export default useElementUi;
