<template>
  <table>
    <thead class="t-thead">
      <tr>
        <template v-if="selection">
          <selectionCell v-model="checkedAll" />
        </template>
        <th v-for="(col, i) in columns" :key="i">{{ col.title }}</th>
      </tr>
    </thead>
    <tbody>

      <tr v-for="(row, i) in list" :key="i">
        <template v-if="selection">
          <selectionCell
            :index="i"
            :value="row.checked"
            @on-change="changeItem"
          />
        </template>

        <td v-for="(col, y) in columns" :key="y">
          <template v-if="'slot' in col && col.slot === true">
            <slot :row="row" :name="col.key"></slot>
          </template>
          <template v-else>
            {{ row[col.key] }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import selectionCell from './selectionCell.vue'

export default {
  components: {
    selectionCell
  },
  props: {
    selection: {
      type: Boolean,
      default: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      checkedAll: true,
      list: []
    }
  },
  watch: {
    checkedAll(checked) {
      this.transfromChecked(checked)
    },
    data: {
      immediate: true,
      deep: true,
      handler(val = []) {
        this.list = val.map((e) => {
          e.checked = this.checkedAll
          return e
        })
        // console.log('list', this.list)
      }
    },
    list: {
      deep: true,
      handler(val) {
         this.checkAllStatus()
      }
    }
  },
  methods: {
    transfromChecked(flag) {
      this.$nextTick(() => {
        this.list.forEach((e, index) => {
          e.checked = flag
          const item = e
          this.list.splice(index, 1, item)
        })
      })
      // console.log(this.list)
    },
    changeItem(checked = false, index) {
      const item = this.list[index]
      item.checked = checked
      if (index !== undefined) {
        this.list.splice(0, 1, item)
      }


    },
    checkAllStatus() {
      this.checkedAll = this.list.every((e) => { return e.checked})

    }
  }
}
</script>

<style lang='stylus'>
table {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  flex: 1;
  width: 100%;
  max-width: 100%;
  background-color: #fff;
  font-size: 14px;
  color: #606266;
}

.t-thead {
  color: #909399;
  font-weight: 500;
  background-color: #fff;
  border-color: grey;

  th {
    white-space: nowrap;
    overflow: hidden;
    user-select: none;
    text-align: left;
    background-color: #fff;
  }
}

table tbody td {
  border-bottom: 1px solid #ebeef5;
}

td, th {
  padding: 12px 0;
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
}
</style>
