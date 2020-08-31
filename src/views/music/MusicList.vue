<template>
  <div>
    <el-table :data="MusicList">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" sortable prop="sid"></el-table-column>
      <!-- <el-table-column label="头像" prop="picture"> -->
      <el-table-column label="头像">
        <template v-slot="scope">
          <el-image :src="scope.row.picture" fit="fill" style="width: 100px; height: 100px"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="音乐名" prop="title"></el-table-column>
      <el-table-column label="歌手" prop="artist"></el-table-column>
      <el-table-column label="操作">
        <el-button type="primary" size="mini" icon="el-icon-headset">试听</el-button>
        <el-button type="success" size="mini" icon="el-icon-edit">编辑</el-button>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-size="pagerMusic.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="pagerMusic.total"
    ></el-pagination>
  </div>
</template>

<script>
import { RequestMusicList } from "@/api/MusicApi.js";
export default {
  data: function() {
    return {
      MusicList: [],
      pagerMusic: {
        total: "",
        pageNo: 1,
        pageSize: 5
      }
    };
  },
  created: function() {
    this.getMusicList(this.pagerMusic.pageNo, this.pagerMusic.pageSize);
  },
  methods: {
    // 获取音乐列表数据
    getMusicList: function(pageNo, pageSize) {
      console.log(pageNo, pageSize);
      RequestMusicList(pageNo, pageSize)
        .then(res => {
          console.log("res>>>>", res);
          if (res.resultCode == 1) {
            this.pagerMusic.total = res.resultInfo.total;
            this.pagerMusic.pageNo = res.resultInfo.currentNo;
            this.pagerMusic.pageSize = res.resultInfo.pageSize;
            this.MusicList = res.resultInfo.list;
            console.log("this.MusicList>>>>", this.MusicList);
          }
        })
        .catch(err => {
          console.log("err>>>", err);
        });
    },
    // 点击不同页码时，请求到的数据
    handleCurrentChange: function(pageon) {
        this.getMusicList(pageon)
    }
  }
};
</script>

<style>
</style>
