<template>
  <div class="home">
    <v-table :data="list" :columns="column">
      <template slot-scope="{ row }" slot="name">
        我是自定义内容
        <span>{{ row.name }}</span>
      </template>
    </v-table>

    <page
      :total="total"
      :currentPage="current"
      :pageSize="pageSize"
      @changePageSize="changePageSize"
      @jump="jump"
      :sizes="[5,10,20,50]"
    ></page>
  </div>
</template>

<script >

import vTable from '@/components/table/index.vue'
import page from '@/components/page/index.vue'
const genData = () =>{
  let arr = []
  for(let i=1;i<=100;i++){
    arr.push({
      name:'张'+i+'山',
      age:i
    })
  }
  return arr
}
let arr = genData()
export default {
  data() {
    return {
      checkedAll: true,
      total: arr.length,
      pageSize:10,
      current: 3,
      data: arr,
      column: [
        { key: 'name', title: '姓名', slot: true },
        { key: 'age', title: '年龄' }
      ]
    }
  },
  components: {
    vTable,
    page
  },
  computed:{
    list(){
      let start = (this.current-1) * this.pageSize
      let end = (start+this.pageSize) >=this.total ? this.total : (start+this.pageSize)
      let arr = this.data.slice(start,end)
      return arr
    }
  },
  created() {},
  methods: {
    changePageSize(pageSize) {
      this.current = 1
      this.pageSize = pageSize
    },
    jump(page) {
      this.current = page
    }
  }
}
</script>

<style scope>
.home {
  padding: 40px;
}
</style>
