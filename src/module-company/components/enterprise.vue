<template>
  <div class="boxInfo">
       <!-- 表单内容 -->
    <div class="formInfo">
             
      <div class="boxMain">
        <el-form ref="form" :model="company" label-width="80px">
          <el-form-item label="公司名称">
            <el-input v-model="company.name"></el-input>
          </el-form-item>
          <el-form-item label="当前版本">
            <el-input v-model="company.version"></el-input>
          </el-form-item>
          <el-form-item label="续期时间">
            <el-input v-model="company.renewalDate"></el-input>
          </el-form-item>
          <el-form-item label="到期时间">
            <el-input v-model="company.expirationDate"></el-input>
          </el-form-item>
          <el-form-item label="公司地区">
            <el-input v-model="company.companyArea"></el-input>
          </el-form-item>
          <el-form-item label="公司地址">
            <el-input v-model="company.公司地址"></el-input>
          </el-form-item>
          <el-form-item label="营业执照">
            <el-input v-model="company.businessLicenseId"></el-input>
          </el-form-item>
          <el-form-item label="法人代表">
            <el-input v-model="company.legalRepresentative"></el-input>
          </el-form-item>
          <el-form-item label="公司电话">
            <el-input v-model="company.companyPhone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="company.mailbox"></el-input>
          </el-form-item>
          <el-form-item label="公司规模">
            <el-input v-model="company.companySize"></el-input>
          </el-form-item>
          <el-form-item label="所属行业">
            <el-input v-model="company.industry"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="company.remarks"></el-input>
          </el-form-item>
          <el-form-item label="审核状态">
            <el-switch
              v-model="company.auditState"
              active-value="1"
              inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="updateAuditState"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch
              v-model="company.state"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="当前余额">
            <el-input v-model="company.balance"></el-input>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-input v-model="company.createTime"></el-input>
          </el-form-item>
        </el-form>
               
      </div>
         
    </div>
  </div>
</template>

<script>
import { detail, updateAuditState } from "@/api/base/company";
export default {
  name: "company-detail",
  data() {
    return {
      company: {},
    };
  },
  methods: {
    updateAuditState(auditState) {
      updateAuditState({ auditState: auditState, id: this.company.id }).then(
        (res) => {
          this.company = res.data.data;
          console.log(this.company);
        }
      );
    },
    // 获取详情数据
    getDetail(id) {
      //{ id: id } 这是创建json对象，这个detail方法做了封装，我们后端人员没有必要了解具体如何封装的
      //我们只需要会调用就可以了
      detail({ id: id }).then((res) => {
        this.company = res.data.data;
        console.log(this.company);
      });
    },
  },
  // 创建完毕状态
  created() {
    var id = this.$route.params.id;
    this.getDetail(id);
  },
};
</script>

<style>
</style>