<template>
  <div>
    <el-card style="height: 580px">
      <quillEditor ref="quillEditor" style="height:500px" v-model="content"  ></quillEditor>
    </el-card>
    <el-button type="primary" style="margin-top: 10px; width: 100px" @click="onAddLog">添加</el-button>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor"; // 引入富文本框组件

// 组件样式
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { RequestAddLog } from "@/api/LogApi.js";

// 引入将当前时间格式化的方法
import DataUtil from "@/utils/util_date.js";

export default {
  components: { quillEditor }, // 注册组件
  data: function() {
    return {
      content: "",
      contents: ""
    }
  },
  methods: {
    onAddLog: function() {
      console.log(this.content);
      // console.log("this.$refs.quillEditor>>>>>>>>>>>>>>", this.$refs.quillEditor._content);
      // console.log("this.contents>>>", this.contents);
      
      const nowDate = new Date();
      // 去调用DataUtil工具类中的formatDate下的format方法，传参将事件格式化
      const date = DataUtil.formatDate.format(nowDate, "yyyy-MM-dd hh:mm:ss");
      // 登录时，以及将用户状态保存到localstorge中
      const mid = this.$store.getters.user.m_id;
      console.log("mid<<<<<<<<<", mid);
      console.log("date<<<<<<<<<", date);
      
      RequestAddLog(this.content, date, mid).then(res => {
        console.log("res>>>>>>>", res);
        if (res.resultCode === 1) {
          this.$router.replace({ path: "/log/list" });
          this.$message({
            type: "success",
            message: "添加日志成功！"
          })
        }
      }).catch(err => {
        console.log("err>>>", err);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
