<template>
  <div>
    1
    <div class="box">
      <div ref="cont" class="container">
        <div class="inner-wrap">
          <div class="red">1</div>
          <div class="yellow">2</div>
          <div class="green">3</div>
          <div class="pink">4</div>
        </div>
      </div>
    </div>

    <div>
      <button @click.stop="goto(1)">1</button>
      <button @click.stop="goto(2)">2</button>
      <button @click.stop="goto(3)">3</button>
      <button @click.stop="goto(4)">4</button>
    </div>
  </div>
</template>

<script>
import Swiper from '@/assets/common.js'

export default {
  mounted() {
    this.cont = this.$refs.cont
    this.swiper = new Swiper({
      el: this.cont
    })
  },
  methods:{
    goto(i){
      this.swiper.setIndex(i)
    }
  }
}
</script>

<style scope lang="stylus">
.box {
  width: 300px;
  margin: 0 auto;
  border: 1px solid red;
  height: 200px;

  .container {
    width: 100%;
    height: 200px;
    display: flex;
    overflow: hidden;

    .inner-wrap {
      display: flex;

      div {
        flex: 0 0 auto;
        width: 300px;
        height: 100%;
      }
    }
  }
}

.yellow {
  background: yellow;
}

.red {
  background: red;
}

.green {
  background: green;
}

.pink {
  background: pink;
}
</style>
