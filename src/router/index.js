import VueRouter from "vue-router"
import { store } from "@/store"
import { NetLoader } from "@/net"
// 路由的配置信息
const router = new VueRouter({
    routes:[
        { path: "/", redirect: "/home" },
        { path:"/vr",component:()=>import("@/page/webvr/HospitalVR.vue") },
        { path: "/login", component: () => import("@/page/login/Login.vue")},
        {   
            path: "/home", 
            component: () => import("@/page/home/Home.vue"),
            children:[
                {
                    path: "",
                    redirect: "main"
                },
                {
                    path: "main",
                    component: () => import("@/page/home/Main.vue")
                },
                {
                    path: "case_list",
                    component: () => import("@/page/disease_viewer/Case_list.vue")
                },
                {
                    path: "disease_view",
                    component: () => import("@/page/disease_viewer/Disease_view.vue")
                },
                {
                    path: "role",
                    component: () => import("@/page/role/Role.vue"),
                    children:[
                        {
                            path: "detail",
                            component: () => import("@/page/role/RoleDetail.vue")
                        }
                    ]
                },
                {
                    path: "roleDetail",
                    component: () => import("@/page/role/RoleDetail.vue")
                },
                {
                    path: "test",
                    component: () => import("@/page/test/Test.vue"),
                },
                {
                    path: "exams",
                    component: () => import("@/page/test/Exams.vue")
                },
                {
                    path: "testPaper",
                    component: () => import("@/page/test/TestPaper.vue")
                },
                {
                    path: "testResult",
                    component: () => import("@/page/test/TestResult.vue")
                },
                {
                    path: "testManage",
                    component: () => import("@/page/test/TestManage.vue")
                }
            ] 
        },
        {
            path: "/admin",
            component: () => import("@/page/admin/Admin.vue"),
            children:[
                {
                    path: "user",
                    component: () => import("@/page/admin/User.vue")
                },
                {
                    path: "case_list",
                    component: () => import("@/page/disease_viewer/Case_list.vue")
                },
                {
                    path: "add_disease",
                    component: () => import("@/page/disease_viewer/Add_disease.vue")
                },
                {
                    path: "disease_view",
                    component: () => import("@/page/disease_viewer/Disease_view.vue")
                },
                {
                    path: "edit_disease",
                    component: () => import("@/page/disease_viewer/Edit_disease.vue")
                },
                {
                    path: "basic_structure",
                    component: () => import("@/page/basic_structure/Basic_structure.vue")
                },
                {
                    path: "medicine",
                    component: () => import("@/page/basic_structure/Medicine_management.vue")
                },
                {
                    path: "vaccinum",
                    component: () => import("@/page/basic_structure/Vaccinum_management.vue")
                }
            ]
        }
    ]
})


const net = new NetLoader("test");

router.beforeEach((to,from,next) => {
    switch(to.path) {
        case "/home/main":
            store.commit("changePath",{
                index: 0,
                router: to,
                name: "首页"
            })
            break;
        case "/home/case_list":
            store.commit("changePath",{
                index: 1,
                router: to,
                name: "病例管理"
            })
            break;
        case "/home/test":
            store.commit("changePath",{
                index: 1,
                router: to,
                name: "测试"
            })
            break;
        case "/home/role":
            store.commit("changePath",{
                index: 1,
                router: to,
                name: "角色扮演"
            })
            break;
        case "/home/roleDetail":
            let name = "";
            switch(to.query.role) {
                case "yizhu":
                    name = "医助"
                    break;
                case "shouyi":
                    name = "兽医";
                    break;
                case "qiantai":
                    name = "前台";
                    break;
                default:
                    name = "游客"
            }
            store.commit("changePath",{
                index: 2,
                router: to,
                name
            })
            break;
    }
    next();
})


router.beforeEach((to,from,next) => {
    let path = to.path;
    if(/\/admin(\/)?.*/g.test(path)) {
        //TODO 如果是想访问后台页面的话则需要发送请求进行验证，这部分需要和后端对接
        if(!window.localStorage.getItem("token")) {
            next("/login");
        } else {
            //TODO 如果本次存储有token数据的话需要对该token进行验证才能继续进行下一步操作
            store.commit("changeType","admin");// 将用户的类型修改为admin
            next();
        }
    } else {
        next();
        store.commit("changeType","user");
    }
})
export default router;