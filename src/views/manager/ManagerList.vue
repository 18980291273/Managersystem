<template>
  <div class="managerwrap">
    <el-row>
      <el-col :span="3" class="item" v-for="manager in managerList" :key="manager.m_id" :offset="1">
        <el-image fit="fill" :src="baseURL + manager.headerimg"></el-image>
        <h5>{{ manager.nick }}</h5>
        <p class="text-group">
          <span>{{ manager.username }}</span>
          <span>{{ manager.createtime }}</span>
        </p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { RequestManagerList } from "@/api/Manager.js";
import { baseURL } from "@/api/request.js";
import UtilDate from "@/utils/util_date.js"

export default {
  data: function() {
    return {
      managerList: [],
      baseURL
    };
  },
  created: function() {
    this.getManagerList();
  },
  methods: {
    // 获取管理员列表数据
    getManagerList: function() {
      RequestManagerList()
        .then(res => {
          let managerLists = [];
          // console.log("res<<<<<<<<<", res);
          if (res.resultCode == 1) {
            // managerLists = res.resultInfo;
            for (let i = 0; i < res.resultInfo.length; i++) {
              // let newCreatetime = this.onChangeDate(
              //   res.resultInfo[i].createtime
              // );
              let newCreatetime = UtilDate.onChangeDate(res.resultInfo[i].createtime)

              res.resultInfo[i].createtime = newCreatetime;
              managerLists.push(res.resultInfo[i]);
              console.log(res.resultInfo[i]);
            }
            console.log("managerLists>>>", managerLists);
          }
          this.managerList = managerLists;
        })
        .catch(err => {
          console.log("err<<<<<<<<<", err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  background-color: rgb(207, 204, 204);
  margin: 10px 20px;
  padding: 10px 20px;
  border-radius: 5px;
  height: 350px;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.el-image {
  width: 100%;
  height: 220px;
}
.text-group {
  display: flex;
  justify-content: space-between;
}
</style>
