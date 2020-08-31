<template>
  <div>
    <el-form :model="user" :label-position="labelPosition">
      <el-form-item label="姓名">
        <el-input v-model="user.name" placeholder="请输入姓名"></el-input>
      </el-form-item>

      <el-form-item label="地址">
        <el-input v-model="user.addr" placeholder="请输入地址"></el-input>
      </el-form-item>

      <el-form-item label="年龄">
        <el-input v-model="user.age" placeholder="请输入年龄"></el-input>
      </el-form-item>

      <el-form-item label="生日">
        <!-- <el-input v-model="product.num" placeholder="请输入生日"></el-input> -->

        <!-- <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker> -->
        <el-date-picker type="date" placeholder="选择日期" v-model="user.birth"></el-date-picker>
      </el-form-item>

      <el-form-item label="性别">
        <!-- <el-radio-group v-model="form.resource"> -->
        <el-radio-group v-model="user.sex">
          <el-radio label="1">男</el-radio>
          <el-radio label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <!-- type="primary"设置按钮类型为主要按钮 -->
        <el-button @click="onAddUser" type="primary" style="width:150px; height: 50px;">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { RequestProductAdd } from "@/api/ProductApi.js";
export default {
  data: function() {
    return {
      user: {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: '1'
      },
      lable: '1',
      labelPosition: "left"
    };
  },
  methods: {
    RequestProductAddData: function(user) {
      RequestProductAdd(user)
        .then(res => {
          console.log("res>>>", res);
          this.$router.replace({ path: '/product/list' })
        })
        .catch(err => {
          console.log("err>>>", err);
        });
    },
    onAddUser: function() {
      console.log("this.user>>>>", this.user);
      this.RequestProductAddData(this.user);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-input {
  width: 90%;
}
</style>
