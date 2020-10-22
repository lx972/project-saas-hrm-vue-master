<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
        <!-- 数据 -->
        <el-table :data="dataList" style="width: 100%">
          <el-table-column label="序号" type="index" width="180">
          </el-table-column>
          <el-table-column label="ID" prop="id" width="180"> </el-table-column>
          <el-table-column label="公司名称" prop="name" width="180">
          </el-table-column>
          <el-table-column label="企业登录账号ID" prop="managerId" width="180">
          </el-table-column>
          <el-table-column label="当前版本" prop="version" width="180">
          </el-table-column>
          <el-table-column label="续期时间" prop="renewalDate" width="180">
          </el-table-column>
          <el-table-column label="到期时间" prop="expirationDate" width="180">
          </el-table-column>
          <el-table-column label="公司地区" prop="companyArea" width="180">
          </el-table-column>
          <el-table-column label="公司地址" prop="companyAddress" width="180">
          </el-table-column>
          <el-table-column
            label="营业执照"
            prop="businessLicenseId"
            width="180"
          >
            <template slot-scope="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.businessLicenseId"
                fit="fill"
              >
              </el-image>
            </template>
          </el-table-column>
          <el-table-column
            label="法人代表"
            prop="legalRepresentative"
            width="180"
          >
          </el-table-column>
          <el-table-column label="公司电话" prop="companyPhone" width="180">
          </el-table-column>
          <el-table-column label="邮箱" prop="mailbox" width="180">
          </el-table-column>
          <el-table-column label="公司规模" prop="companySize" width="180">
          </el-table-column>
          <el-table-column label="所属行业" prop="industry" width="180">
          </el-table-column>
          <el-table-column label="备注" prop="remarks" width="180">
          </el-table-column>
          <el-table-column label="审核状态" prop="auditState" width="180">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.auditState"
                active-value="1"
                inactive-value="0"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="state" width="180">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.state"
                :active-value="1"
                :inactive-value="0"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="当前余额" prop="balance" width="180">
          </el-table-column>
          <el-table-column label="创建时间" prop="createTime" width="180">
          </el-table-column>

          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <router-link :to="'/company/detail/'+scope.row.id">查看</router-link>
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- end -->
      </el-card>
    </div>
  </div>
</template>

<script>
import { list } from "@/api/base/company";
export default {
  name: "company-table-index",
  data() {
    return {
      dataList: [],
    };
  },
  methods: {
    // 获取列表数据
    getList() {
      list().then((res) => {
        this.dataList = res.data.data;
        console.log(this.dataList);
      });
    },
  },
  // 创建完毕状态
  created() {
    this.getList();
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.alert {
  margin: 10px 0px 0px 0px;
}
.pagination {
  margin-top: 10px;
  text-align: right;
}
</style>
