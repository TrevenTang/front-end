<template>
    <div id="case_list">
        <div id="header">
            <h1>病例总览</h1>
            
        </div>
        <div class="case_list-container" v-if="$store.state.status === 1 && $store.state.type === 'user' ">
            <Disease_list />
            <Disease_selector />
        </div>
        <div v-else>
            <el-empty description="您暂未登录，无法查看病例信息"></el-empty>
        </div>
    </div>
</template>

<script>
import Disease_list from '@/component/Disease_list.vue';
import Disease_selector from '@/component/Disease_selector.vue';
import { NetLoader } from '@/net';
export default {
    name: "Case_list",
    data() {
        return {
            loader: new NetLoader("test")
        };
    },
    methods: {
    },
    created() {
        this.loader.get("/user/verify").then(value => {
            this.$store.commit("changeStatus",1);
            this.$store.commit("changeType", value.data.type);
        }, err => {
            this.$store.commit("changeStatus",0);
        })
    },
    components: { Disease_list,Disease_selector },
}
</script>

<style scoped lang="less">
#case_list {
    width: 100%;
    height: wrap-content;
    margin: 0;
    margin-left:2%;
}

#header {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>