<template>
  <div class="adduser-wrap">
    <el-form @submit.prevent :label-position="right" label-width="80px" :rules="rules">
      <el-form-item label="用户名">
        <el-input v-model="user.username" name="username" placeholder="请输入用户名"></el-input>
      </el-form-item>

      <el-form-item label="性别">
        <el-radio-group v-model="user.sex">
          <el-radio label="1">男</el-radio>
          <el-radio label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="年龄">
        <el-input v-model="user.age" name="age" type="number" placeholder="请输入年龄"></el-input>
      </el-form-item>

      <el-form-item label="到访时间">
        <el-date-picker
          v-model="user.visittime"
          type="datetime"
          placeholder="选择日期时间"
          format="yyyy 年 MM 月 dd 日 hh时:mm分:ss秒"
          value-format="yyyy-MM-dd hh:mm:ss"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="学历">
        <el-select v-model="user.education" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="单位">
        <el-input v-model="user.company" name="company" placeholder="请输入单位"></el-input>
      </el-form-item>

      <el-form-item label="到访原因">
        <el-input type="textarea" v-model="user.visitgoal" name="visitgoal" placeholder="请输入原因"></el-input>
      </el-form-item>

      <el-form-item label="头像图片">
        <!-- 
          el-upload 上传文件组件
            :action 将添加进来的图片上传到一个空的地址
            list-type: "picture-card" 设置图片的预览效果为图片的预览效果
            :show-file-list="false|true"   设置是否显示选中图片地址列表
            :auto-upload="false|true"   设置自动提交图片到action空的一个url地址去
            :on-change="onChangeFile"
                文件改变事件，当文件上传时，执行该事件 
                文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
            :before-upload 文件上传前的钩子函数
        -->
        <el-upload
          action="/"
          list-type="picture-card"
          :show-file-list="false"
          :auto-upload="true"
          :on-change="onChangeFile"
          :before-upload="onBeforeUploadb"
          :headers="headers"
          class="avatar-uploader"
        >
          <!-- 
            v-if="imageUrl" 判断imageUrl是否存在
            :src="imageUrl" 图片地址存在则将图片地址赋值src显示出来
          -->
          <el-image v-if="imageUrl" :src="imageUrl" class="avatar"></el-image>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <!-- type="primary"设置按钮类型为主要按钮 -->
        <el-button @click="onAddUser" type="primary" style="width:150px; height: 50px;">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { baseURL } from "@/api/request.js";
import { RequestUserAdd } from "@/api/UserApi.js";
import { GetToken } from "@/common/tokenCookie.js";
// import DateUtils from "@/utils/util_date.js"

export default {
  data: function() {
    return {
      user: {
        username: "",
        sex: "1",
        age: "",
        visittime: "", // 到访时间
        education: "", // 学历
        visitgoal: "", // 访问目的
        company: "", // 单位
        fileHeader: ""
      },
      baseURL,
      imageUrl: "",
      label: "1",
      headers: {
        Authorization: "Bear" + GetToken()
      },
      options: [
        {
          value: "高中",
          label: "高中"
        },
        {
          value: "大专",
          label: "大专"
        },
        {
          value: "本科",
          label: "本科"
        },
        {
          value: "硕士",
          label: "硕士"
        },
        {
          value: "博士",
          label: "博士"
        },
        {
          value: "其他",
          label: "其他"
        }
      ]
    };
  },
  methods: {
    onChangeFile(file) {
      // 获取将要上传的图片的地址，赋值给imageUrl
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log("图片地址》》》》》》", this.imageUrl);
    },
    onBeforeUploadb(file) {
      console.log("onbeforeUpload file >>>>  ", file);
      // 上传的文件对象赋值给user.fileHeader
      this.user.fileHeader = file;
    },
    onAddUser() {
      console.log("this.user>>>>>>>>>>>>", this.user);
      let username = this.user.username;
      let sex = this.user.sex;
      let age = this.user.age;
      let visittime = this.user.visittime;
      // let visittime = DateUtils.formatDate.format(this.user.visittime, 'yyyy-MM-dd hh:mm:ss');
      console.log("visittime<<<<<<<<<<<<", visittime);
      let education = this.user.education;
      let visitgoal = this.user.visitgoal;
      let company = this.user.company;
      let fileHeader = this.user.fileHeader; // 上传的文件对象
      console.log("fileHeader>>>>>>>>>>>", fileHeader);

      let fromData = new FormData(); // 创建FromDate对象
      // 将表单信息username,sex，age等信息和上传的文件全追加到fromDate对象中
      fromData.append("username", username);
      fromData.append("sex", sex);
      fromData.append("age", age);
      fromData.append("visittime", visittime);
      fromData.append("education", education);
      fromData.append("visitgoal", visitgoal);
      fromData.append("company", company);
      fromData.append("fileHeader", fileHeader);

      // 调用请求接口数据的方法
      RequestUserAdd(fromData)
        .then(res => {
          this.$router.replace({ path: "/user/list" });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
