<template>
  <div class="boxInfo">
    <!-- 表单内容 -->
    <div class="formInfo">
      <div>
        <!-- 头部信息  -->
        <div class="userInfo">
          <div class="headInfo clearfix">
            <div class="headText">
              <el-form ref="formData" :model="formData" label-width="215px">
                <el-form-item label="姓名：">
                  <el-input
                    v-model="formData.username"
                    placeholder="请输入"
                    class="inputW"
                  ></el-input>
                </el-form-item>
                <el-form-item label="密码：">
                  <el-input
                    v-model="formData.password"
                    placeholder="请输入"
                    class="inputW"
                  ></el-input>
                </el-form-item>
                <el-form-item label="部门：">
                  <el-input
                    placeholder="请选择"
                    v-model="formData.departmentName"
                    icon="caret-bottom"
                    class="inputW"
                    @click.native="isShowSelect = !isShowSelect"
                  >
                  </el-input>
                  <input v-model="formData.departmentId" type="hidden" />
                  <el-tree
                    v-if="isShowSelect"
                    :expand-on-click-node="false"
                    :data="inspectionObjectOptions"
                    :props="{ label: 'name' }"
                    default-expand-all
                    @node-click="handleNodeClick"
                    class="objectTree"
                    ref="tree2"
                  >
                  </el-tree>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="saveData">更新</el-button>
                  <router-link
                    :to="{ path: '/employees/index' }"
                    class="el-button el-button--text el-button--small"
                  >
                    取消
                  </router-link>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import constantApi from "@/api/constant/employees";
import { detail, update } from "@/api/base/users";
import * as departmentApi from "@/api/base/department";
import commonApi from "@/utils/common";
export default {
  name: "accountInfo",
  props: ["objId"],
  data() {
    return {
      baseData: [],
      inspectionObjectOptions: [],
      isShowSelect: false,
      formData: {
        id: this.objId,
      },
    };
  },
  methods: {
    handleNodeClick(data) {
      this.formData.departmentName = data.name;
      this.formData.departmentId = data.id;
      this.isShowSelect = false;
    },
    // 获取详情
    getObjInfo() {
      detail({ id: this.objId }).then((res) => {
        this.formData = res.data.data;
      });
    },
    saveData(obj) {
      update(this.formData).then((res) => {
        this.formData = res.data;
        this.$message.success("保存成功！");
        this.getObjInfo();
      });
    },
  },
  // 创建完毕状态
  created: function () {
    this.getObjInfo();
    departmentApi.getTree().then((ret) => {
      this.inspectionObjectOptions = ret.data.data.depts;
    });
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.el-collapse-item__arrow {
  float: left;
}

.el-collapse-item {
  position: relative;
  // width: 80%;
  // .el-collapse-item__header{width: 80%;}
  .infoR {
    position: absolute;
    background: #fff;
    display: inline-block;
    width: 100px;
    height: 35px;
    line-height: 35px;
    text-align: right;
    right: -100px;
    top: 0px;
  }
}
// .el-input--medium {
//   width: 80%;
// }
.linkage {
  display: inline-block;
}
.textBotm {
  vertical-align: text-bottom;
}
.navInfo {
  height: auto;
  font-size: 30px;
  color: #333;
  background-color: #e4e4e4;
  text-align: center;
  border-bottom: 1px solid #333;
}
.step {
  position: fixed;
  left: 220px;
  top: 50%;
  margin-top: -150px;
  background: #fff;
  z-index: 9;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
