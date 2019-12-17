<template>
  <td class="selectionCell-wrap">
    <div>
      <checkbox
       :value="$attrs.value"
        @on-change="change"
      />
    </div>
  </td>
</template>

<script>

import checkbox from '@/components/checkbox/checkbox.vue'

export default {
  components: {
    checkbox
  },
  props: {
    index: Number
  },
  methods: {
    change(checked = false) {
      this.$emit('input', checked)
      this.$emit('on-change', checked, this.index)
    }
  }
}
</script>

<style scope>
.selectionCell-wrap {
  width: 50px;
  height: 100%;
}
</style>
