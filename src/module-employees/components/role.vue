<template>
  <div class="add-form">
    <el-dialog
      title="角色"
      :visible.sync="dialogFormVisible"
      @close="handleClose"
      @open="handleOpen"
    >
      <el-form
        ref="dataForm"
        :model="formData"
        label-position="left"
        label-width="120px"
        style="margin-left: 120px; width: 500px"
      >
        <el-form-item label="可选角色">
          <el-checkbox-group v-model="formData.checkList">
            <el-checkbox
              v-for="roleData in formBase"
              :key="roleData.id"
              :label="roleData.id"
              :name="roleData.id"
              >{{ roleData.name }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createData">提交</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { list, update, getUserRoles } from "@/api/base/role";
import commonApi from "@/utils/common";
var _this = null;
export default {
  name: "rolesAdd",
  data() {
    return {
      formBase: [],
      formData: {
        checkList: [],
      },
      userId: "",
      dialogFormVisible: false,
    };
  },
  methods: {
    createData() {
      update({ userId: this.userId, roleIds: this.formData.checkList }).then(
        (res) => {
          this.$message({
            message: res.data.message,
            type: res.data.success ? "success" : "error",
          });
          if (res.data.success) {
            this.dialogFormVisible = false;
            this.$emit("doQuery", {});
          }
        }
      );
    },
    // 弹框打开
    handleOpen() {
      getUserRoles({ userId: this.userId }).then((res) => {
        this.formData.checkList = res.data.data;
      });

      console.log("弹框打开");
    },
    // 弹框关闭
    handleClose() {
      this.formData.checkList = [];
      console.log("弹框关闭");
    },
  },
  // 创建完毕状态
  created: function () {
    list().then((ret) => {
      this.formBase = ret.data.data;
      console.log(this.formBase);
    });
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.inputText {
  width: 400px;
  height: 32px;
  resize: none;
  line-height: 22px;
  overflow: hidden;
  font-size: 12px;
  border: 1px solid #dddee1;
  padding: 4px 7px;
  border-radius: 5px;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.objectTree {
  position: absolute;
  width: 300px;
  z-index: 999;
  border: 1px solid #dddee1;
  left: 0;
  border-radius: 5px;
}
</style>
