<template>
  <el-form size="medium">
    <el-row>
      <el-col :span="24">
        <el-form-item label="标签名:" label-width="73px">
          <el-input v-model="property.label" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="宽:" label-width="73px">
          <el-input
            type="number"
            v-model.number="property.style.width"
            @input="handleNumber('width', $event)"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="高:" label-width="73px">
          <el-input
            type="number"
            v-model.number="property.style.height"
            @input="handleNumber('height', $event)"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="X坐标:" label-width="73px">
          <el-input
            type="number"
            v-model.number="property.style.left"
            @input="handleNumber('X', $event)"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="Y坐标:" label-width="73px">
          <el-input
            type="number"
            v-model.number="property.style.top"
            @input="handleNumber('Y', $event)"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="跳转地址:" label-width="73px">
          <el-input v-model="property.url" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="旋转角度:" label-width="73px">
          <el-input
            type="number"
            v-model.number="property.style.rotate"
            @input="handleNumber('rotate', $event)"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="边框半径:" label-width="73px">
          <el-input
            type="number"
            v-model.number="property.style.borderRadius"
            @input="handleNumber('borderRadius', $event)"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24" v-if="property.type == 0">
        <el-form-item label="切换图片:" label-width="73px">
          <img
            :src="property.propValue"
            width="275"
            style="border-radius: 5px; transform: scale(0.9)"
          />
          <input
            class="previewUpload"
            type="file"
            @change="handleFileChange"
            id="input"
            title="点击上传图片"
          />
        </el-form-item>
        <!-- <el-form-item label="图片原始大小:" label-width="101px">
          <span>{{
            state.width + "px  *  " + state.height + "px"
          }}</span>
        </el-form-item>
        <el-form-item label="图片原始比例:" label-width="101px">
          <span>{{ (state.width / state.height).toFixed(2) }}</span>
        </el-form-item> -->
      </el-col>
      <el-col :span="24" v-if="property.type == 1">
        <el-form-item label="默认焦点:" label-width="73px">
          <el-select v-model="property.default">
            <el-option label="是" :value="true" />
            <el-option label="否" :value="false" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24" v-if="property.type == 1">
        <el-form-item label="焦点颜色:" label-width="73px">
          <el-color-picker v-model="property.style.color"></el-color-picker>
        </el-form-item>
      </el-col>
      <el-col :span="24" v-if="property.type == 2">
        <el-form-item label="文字颜色:" label-width="73px">
          <el-color-picker v-model="property.style.color"></el-color-picker>
        </el-form-item>
      </el-col>
      <el-col :span="24" v-if="property.type == 2">
        <el-form-item label="文字大小:" label-width="73px">
          <el-input
            type="number"
            v-model.number="property.style.fontSize"
            @input="handleNumber('fontSize', $event)"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24" v-if="property.type == 2">
        <el-form-item label="文字加粗:" label-width="73px">
          <el-radio v-model.number="property.style.fontWeight" :label="400"
            >否</el-radio
          >
          <el-radio v-model.number="property.style.fontWeight" :label="700"
            >是</el-radio
          >
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { defineComponent, reactive, watch, ref } from "vue";
import { ElMessage } from "element-plus";
export default defineComponent({
  props: {
    propertyData: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    const property = ref({});
    const state = reactive({
      width: "",
      height: "",
    });
    property.value = props.propertyData;
    watch(
      () => props.propertyData,
      (value) => {
        property.value = value;
      }
    );
    /* 边界限制 */
    const handleNumber = (name, value) => {
      switch (name) {
        case "width":
          if (value < 20) {
            property.value.style[name] = 20;
          }
          if (value > 1280) {
            property.value.style[name] = 1280;
          }
          break;
        case "height":
          if (value < 20) {
            property.value.style[name] = 20;
          }
          break;
        case "X":
          if (value <= 0) {
            // ""空值情况
            property.value.style["left"] = 0;
          }
          break;
        case "Y":
          if (value <= 0) {
            property.value.style["top"] = 0;
          }
          break;
        case "rotate":
          if (parseInt(value) == 360) {
            property.value.style["rotate"] = 0;
          }
          break;
        case "borderRadius":
          if (value <= 0) {
            property.value.style["borderRadius"] = 0;
          }
          break;
        case "fontSize":
          if (value <= 14) {
            property.value.style["fontSize"] = 14;
          }
          break;
        default:
          break;
      }
    };

    // 接收图片
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (!file.type.includes("image")) {
        ElMessage.error("只能传图片");
        return false;
      }
      const reader = new FileReader();
      reader.onload = (res) => {
        const fileResult = res.target.result;
        const img = new Image();
        img.onload = () => {
          property.value.propValue = fileResult;
          state.width = img.width;
          state.height = img.height;
          // 修复重复上传同一文件，@change 不触发的问题
          document.querySelector("#input").setAttribute("type", "text");
          document.querySelector("#input").setAttribute("type", "file");
        };

        img.src = fileResult;
      };
      reader.readAsDataURL(file);
    };

    return {
      property,
      handleNumber,
      handleFileChange,
      state,
    };
  },
});
</script>

<style scoped lang="scss">
.previewUpload {
  position: absolute;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  left: 0;
}
</style>