<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
        <!-- 数据 -->
        <div class="organization-index">
          <div class="organization-index-top">
            <div class="main-top-title">
              <el-tabs v-model="activeName">
                <el-tab-pane label="组织结构" name="first"></el-tab-pane>
                <div class="el-tabs-report">
                  <a
                    class="el-button el-button--primary el-button--mini"
                    title="导出"
                    >导入</a
                  >
                  <a
                    class="el-button el-button--primary el-button--mini"
                    title="导出"
                    >导出</a
                  >
                </div>
              </el-tabs>
            </div>
          </div>
          <div style="overflow: scroll; white-space: nowrap" class="treBox">
            <div class="treeCon clearfix">
              <span>
                <i class="fa fa-university" aria-hidden="true"></i>
                <span
                  ><strong>{{ companyName }}</strong></span
                >
              </span>
            </div>

            <!-- 
                    构造树形列表
                      叶子 <i class="fa fa-male"></i>
                      非叶子 
                        展开 <i class="fa fa-minus-square-o">
                        闭合 <i class="fa fa-plus-square-o">
                    <div class="generalClass" slot-scope="{node,data}" style="width:99%">
                  -->
            <el-tree
              :data="dataTree"
              :props="defaultProps"
              show-checkbox
              accordion
              :default-expanded-keys="expandNodes"
              node-key="id"
              @node-expand="handleNodeExpand"
              draggable
              :allow-drop="allowDrop"
              :allow-drag="allowDrag"
              @node-drop="nodeDrop"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <div class="fr">
                  <span class="treeRinfo">
                    <div class="treeRinfo">
                      <span>{{ data.manager }}</span>
                      <span
                        >在职
                        <em class="colGreen" title="在职人数">---</em
                        >&nbsp;&nbsp;(<em class="colGreen" title="正式员工"
                          >---</em
                        >&nbsp;/&nbsp;<em class="colRed" title="非正式员工"
                          >---</em
                        >)</span
                      >
                    </div>
                    <div class="treeRinfo">
                      <el-dropdown class="item">
                        <span class="el-dropdown-link">
                          操作<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item>
                            <el-button type="text" @click="handleAdd(data.id)"
                              >添加子部门</el-button
                            >
                          </el-dropdown-item>
                          <el-dropdown-item>
                            <el-button type="text" @click="handleEdit(data.id)"
                              >编辑部门</el-button
                            >
                          </el-dropdown-item>
                          <el-dropdown-item>
                            <el-button type="text" @click="handleList(data)"
                              >查看待分配员工</el-button
                            >
                          </el-dropdown-item>
                          <el-dropdown-item>
                            <el-button
                              type="text"
                              @click="handleDelete(data.id)"
                              >删除</el-button
                            >
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </span>
                </div>

                <el-dialog
                  title="提示"
                  :visible.sync="dialogVisible"
                  width="30%"
                  @close="handleClose"
                >
                  <el-form ref="form" :model="deptForm" label-width="80px">
                    <el-form-item label="部门名称">
                      <el-input v-model="deptForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="部门负责人">
                      <el-input v-model="deptForm.manager"></el-input>
                    </el-form-item>

                    <el-form-item>
                      <el-button @click="dialogVisible = false"
                        >取 消</el-button
                      >
                      <el-button type="primary" @click="submit()"
                        >确 定</el-button
                      >
                    </el-form-item>
                  </el-form>
                </el-dialog>
              </span>
            </el-tree>
          </div>
        </div>

        <!-- end -->
      </el-card>
    </div>
  </div>
</template>

<script>
import {
  getTree,
  deptFindById,
  deptUpdate,
  deptAdd,
  deptDelete,
} from "@/api/base/department";
export default {
  name: "department-tree-index",
  data() {
    return {
      activeName: "first",
      dataTree: [],
      companyId: "",
      companyName: "",
      companyManage: "",
      defaultProps: {
        children: "children",
        label: "name",
      },
      dialogVisible: false,
      deptForm: {
        name: "",
        manager: "",
        id: "",
        flag: true,
      },
      expandNodes: [],
    };
  },
  methods: {
    //节点拖拽成功后触发的事件
    nodeDrop(draggingNode, dropNode, type,event) {
      deptUpdate({
          id: draggingNode.data.id,
          pid: dropNode.parent.data.id,
        }).then((res) => {
          this.getTree();
          console.log(res.data.data);
        });
    },
    allowDrop(draggingNode, dropNode, type) {
      console.log(draggingNode, dropNode, type);
      //拖拽节点的最大层级
      var dragLevel = this.depthSearch(draggingNode);
       console.log("dragLevel:"+dragLevel);
      //当前节点的层数
      var currentLevel=dragLevel-draggingNode.level+1;
       console.log("currentLevel:"+currentLevel);
      //放置节点父节点的层级
      var parentLevel=dropNode.parent.level;
       console.log("parentLevel:"+parentLevel);
      //最大层数不能超过三层，否则就不能放置
     if((parentLevel+currentLevel)>3){
       return false;
     }
      return true;
    },
    //深度搜索，搜索树一个节点的最大的层级
    depthSearch(draggingNode) {
      //当前节点层级
      var level = draggingNode.level;
      //当前节点的子节点
      var dragChildren = draggingNode.childNodes;
      if (dragChildren != null) {
        //子节点不为空就遍历
        for (let i = 0; i < dragChildren.length; i++) {
          //递归获取子节点的层级
          level = this.depthSearch(dragChildren[i]);
        }
      }
      //没有子节点直接返回当前节点
      return level;
    },
    allowDrag(draggingNode) {
      return true;
    },
    // 节点展开触发事件
    handleNodeExpand(data, node) {
      this.expandNodes.push(data.id);
      console.log(this.expandNodes);
    },
    // 表单提交
    submit() {
      if (this.deptForm.flag == true) {
        deptAdd({
          pid: this.deptForm.id,
          name: this.deptForm.name,
          manager: this.deptForm.manager,
        }).then((res) => {
          this.dialogVisible = false;
          this.getTree();
          console.log(res.data.data);
        });
      } else {
        deptUpdate({
          id: this.deptForm.id,
          name: this.deptForm.name,
          manager: this.deptForm.manager,
        }).then((res) => {
          this.dialogVisible = false;
          this.getTree();
          console.log(res.data.data);
        });
      }
    },
    // 编辑部门
    handleEdit(id) {
      deptFindById({ id: id }).then((res) => {
        this.deptForm.name = res.data.data.name;
        this.deptForm.manager = res.data.data.manager;
        this.deptForm.id = res.data.data.id;
        this.dialogVisible = true;
        this.deptForm.flag = false;
        console.log(res.data.data);
      });
    },
    // 删除部门
    handleDelete(id) {
      deptDelete({ id: id }).then((res) => {
        this.getTree();
        console.log("删除部门");
      });
    },
    // 弹框关闭
    handleClose() {
      this.deptForm.name = "";
      this.deptForm.manager = "";
      console.log("弹框关闭");
    },
    // 添加子部门
    handleAdd(id) {
      this.dialogVisible = true;
      this.deptForm.flag = true;
      this.deptForm.id = id;
    },
    // 获取树数据
    getTree() {
      getTree().then((res) => {
        this.dataTree = res.data.data.depts;
        this.companyId = res.data.data.companyId;
        this.companyName = res.data.data.companyName;
        this.companyManage = res.data.data.companyManage;
        console.log(res.data.data);
      });
    },
  },
  // 创建完毕状态
  created() {
    this.getTree();
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.el-dropdown {
  color: #000000;
}
.el-tree-node__content > .el-tree-node__expand-icon {
  padding: 0px;
}
.el-tree-node__expand-icon {
  color: #ffffff;
}
.generalClassNode {
  padding-left: 20px;
}
.el-tree-node__content {
  font-size: 16px;
  line-height: 36px;
  height: 36px;
}
.custom-tree-node {
  padding-left: 20px;
}
.objectTree {
  overflow: auto;
  z-index: 100;
  width: 300px;
  border: 1px solid #dcdfe6;
  margin-top: 5px;
  left: 70px;
}
.el-tabs__content {
  overflow: initial;
}
.boxpad {
  margin-left: -40px;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-tree-node__expand-icon {
}
.el-icon-caret-right {
}
.el-tree-node__content {
  font-size: 14px;
  line-height: 36px;
}
.generalClass {
  font-size: 14px;
  line-height: 36px;
  color: #000000;
}
.all {
  position: relative;
  min-height: 100%;
  padding-bottom: 200px;
}
.organization-main:after,
.organization-index-top:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.organization-main {
  font-size: 14px;
  font-size: 14px;
}

.organization-index {
  padding-bottom: 20px;
  margin-left: 20px;
}
.main-top-title {
  padding-left: 20px;
  padding-top: 20px;
  text-align: left;
}

::-webkit-scrollbar-thumb {
  background-color: #018ee8;
  height: 50px;
  outline-offset: -2px;
  outline: 8px solid #fff;
  -webkit-border-radius: 4px;
}
::-webkit-scrollbar-track-piece {
  background-color: #fff;
  -webkit-border-radius: 0;
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #fb4446;
  height: 50px;
  -webkit-border-radius: 4px;
}
.modal-total {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  z-index: 90;
  opacity: 0.2;
}
.modal {
  width: 400px;
  height: 300px;
  background-color: #ffffff;
  z-index: 999;
  position: absolute;
  left: 45%;
  top: 20%;
  text-align: center;
}
.treBox {
  padding: 30px 120px 0;
}
.organization-index-top {
  position: relative;

  .el-tabs-report {
    position: absolute;
    top: -50px;
    right: 15px;
  }
}
.treeCon {
  border-bottom: 1px solid #cfcfcf;
  padding: 10px 0;
  margin-bottom: 10px;
  .el-dropdown {
    color: #333;
  }
}
.treeRinfo {
  display: inline-block;
}
.treeRinfo span {
  padding-left: 30px;
}
</style>

