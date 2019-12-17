

<template>
    <div class="page-wrapper">
        <div class="paging-size">
            <v-select v-model='currentPageSize' @onChange="changePageSize">
              <template slot='content'>
                <div>
                  {{currentPageSize}} 条/每页
                  </div>
              </template>
                  <v-options :value='i' v-for="(i,index) in sizes"  :selected="i==pageSize" :key='index'>{{i}}条/每页</v-options>
            </v-select>
            <div class='total-data' >共 {{total}}条</div>
        </div>
        <ul>
              <li class="paging-item" v-if="current-1>0" @click='jump(current-1)'>上一页</li>
              <li class="paging-item" :class="[ current ===1 ? 'current':'']" title='1' @click='jump(1)'>1</li>
              <li class="paging-item" v-if="current>=5" @click='jump(current-5)'>...</li>
              <li class="paging-item" v-if="current-2>1 "  @click='jump(current-2)'>{{current-2}}</li>
              <li class="paging-item" v-if="current-1>1"  @click='jump(current-1)'>{{current-1}}</li>
              <li class="paging-item current" v-if='current!==1 && current!==allPages' @click='jump(current)'>{{current}}</li>
              <li class="paging-item" v-if="current+1<allPages  && current!==allPages" @click='jump(current+1)'>{{current+1}}</li>
              <li class="paging-item" v-if="current+2<allPages && current!==allPages" @click='jump(current+2)'>{{current+2}}</li>
              <li class="paging-item" v-if="allPages-current>=4" @click='jump(current+5)'>...</li>
              <li class="paging-item" :class="[ current === allPages ? 'current':'']" v-if="total>1" @click='jump(allPages)'>{{allPages}}</li>
              <li class="paging-item" v-if="allPages-current>1" @click='jump(current+1)'>下一页</li>
              <li class="paging-jump">
                <span>
                   跳转至
                  </span>
                <input
                autocomplete="off"
                spellcheck="false"
                @blur="blur"
                 type="nubmer" v-model="jumpPage" :max="total" min="0"/>
              </li>
        </ul>
    </div>
</template>
<script>
    import vSelect from '@/components/select/select.vue'
    import vOptions from '@/components/select/Options.vue'

    export default {
      components: {
        vSelect,
        vOptions
      },
        data(){
            return {
                jumpPage:0,
                currentPageSize:this.pageSize,
            }
        },
        computed: {
            allPages () {
                const allPage = Math.ceil(this.total / this.currentPageSize);
                return (allPage === 0) ? 1 : allPage;
            },
            current(){
              let currpage = this.currentPage
              if(currpage <= 0){
                currpage = 1
              }
              if(currpage >= this.allPages){
                currpage = this.allPages
              }
              return currpage

            }
        },
        props:{
            total:Number,
            currentPage:Number,
            pageSize:Number,
            sizes:{
                type:Array,
                default:function(){
                    return [5,15,25,35]
                }
            }
        },
        mounted(){
            // if(this.total-this.current>1){
                // this.jumpPage=this.current+1;
            // }
            // else{
                this.jumpPage=1;
            // }
        },
        watch:{
            current(){
                if(this.total-this.current>1){
                    // this.jumpPage=this.current+1;
                }
                else{
                    // this.jumpPage=1;
                }
            }
        },
        methods:{
            jump(index){
                index=Number(index);
                if(index <=0 ){
                  index = 0
                }
                if(index >= this.allPages){
                  index= this.allPages
                }
                this.$emit('jump', index);
            },
            changePageSize(e){
              this.currentPageSize = Number(e)
              // this.current = 1
              this.$nextTick(()=>{
                this.$emit('changePageSize',this.currentPageSize,1)
              })
            },
            blur(e){
                let index = e.target.value
                index=Number(index);
                if(index <=0 ){
                  index = 1
                }
                if(index >= this.allPages){
                  index= this.allPages
                }
                this.jump(index)
                this.jumpPage = index
            }
        }
    }
</script>

<style lang="stylus">
    $color = #39f;
    .page-wrapper{
      display flex;
      align-items center;
      padding:20px 10px;
      position relative

      .paging-size{
            margin-right:20px;
            display flex;
            height:100%;
            justify-content flex-end
            select{
                width:50px;
                height:30px;
                text-align:center;
                border:1px solid $color;
            }
          .total-data{
            height:100%;
            font-size:12px;
            color:#333;
             height 36px;
             line-height 36px;
             margin-left 5px;
          }
      }
        ul{
            display: table;
            margin: 0 auto;
            height: 50px;
            list-style: none;
            position absolute;
            left 50%;
            transform translateX(-50%);
            min-width 400px;
            li{
                float:left;
            }
        }

        .paging-item{
            height: 30px;
            line-height: 30px;
            margin: 3px;
            padding-left:12px;
            padding-right:12px;
            border-radius: 5px;
            font-size: 12px;
            color: #666;
            cursor: pointer;
            display: inline-block;
            height: 32px;
            color: #666;
            border: 1px solid #d7dde4;
            border-radius: 4px;
            &:hover,&.current{
                color:$color;
                border-color: $color
            }
        }
        .paging-jump{
               display:inline-block;
               margin-left: 24px;
               font-weight: 400;
               color: #606266;
               display inline-flex
               align-items center
               span{
                 font-size:14px;
                  margin-right 5px
               }
              input:focus{
                      border-color: #409eff;
                    outline: none;
              }

            input{
                  width:50px;
                  -webkit-appearance: none;
                  background-color: #fff;
                  background-image: none;
                  border-radius: 4px;
                  border: 1px solid #dcdfe6;
                  box-sizing: border-box;
                  color: #606266;
                  display: inline-block;
                  font-size: inherit;
                  height: 40px;
                  line-height: 1;
                  outline: none;
                  padding: 0 15px;
                  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            }
            input[type="button"]{
                float: left;
                padding:0 12px;
                height:30px;
                border:none;
                color:#fff;
                background-color: $color;
            }
        }
    }
</style>

